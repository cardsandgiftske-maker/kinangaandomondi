/**
 * Cloudinary Image Upload Service
 *
 * Uploads guest photos to Cloudinary using an unsigned upload preset.
 * Stores the secure HTTPS URL on Cloudinary CDN for ultra-fast, high-resolution delivery.
 */

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

// Get configured Cloudinary Cloud Name & Upload Preset
export function getCloudinaryConfig(): { cloudName: string; uploadPreset: string } {
  return {
    cloudName: (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim(),
    uploadPreset: (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim(),
  };
}

export const isCloudinaryConfigured = (): boolean => {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  return Boolean(cloudName && uploadPreset);
};

/**
 * Compresses an image file client-side to ensure fast uploads even on mobile connections
 */
async function compressImageIfNeeded(fileOrBlob: File | Blob, maxDimension = 1920, quality = 0.85): Promise<Blob | File> {
  // If not an image or SVG/GIF, return as is
  if (typeof window === 'undefined') return fileOrBlob;
  if (fileOrBlob.type && (!fileOrBlob.type.startsWith('image/') || fileOrBlob.type.includes('svg') || fileOrBlob.type.includes('gif'))) {
    return fileOrBlob;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(fileOrBlob);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      // Only downscale if larger than maxDimension
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(fileOrBlob);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob && blob.size < fileOrBlob.size) {
            resolve(blob);
          } else {
            resolve(fileOrBlob);
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(fileOrBlob);
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads a photo to Cloudinary
 * Fails closed when Cloudinary is unavailable; data URLs are never persisted as gallery URLs
 */
export async function uploadToCloudinary(
  fileOrDataUrl: File | Blob | string,
  customCloudName?: string,
  customPreset?: string
): Promise<string> {
  const { cloudName: defaultCloudName, uploadPreset: defaultPreset } = getCloudinaryConfig();
  const cloudName = customCloudName || defaultCloudName;
  const uploadPreset = customPreset || defaultPreset;
  if (!cloudName || !uploadPreset) throw new Error('Photo uploads are not configured yet.');

  try {
    const formData = new FormData();

    if (typeof fileOrDataUrl === 'string') {
      // Base64 string or remote URL
      formData.append('file', fileOrDataUrl);
    } else {
      // File or Blob
      const processedBlob = await compressImageIfNeeded(fileOrDataUrl);
      const filename = (fileOrDataUrl as File).name || 'wedding_photo.jpg';
      formData.append('file', processedBlob, filename);
    }

    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'kinanga_omondi_wedding');

    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data: CloudinaryUploadResponse = await response.json();
      if (data.secure_url) {
        return data.secure_url;
      }
    }

    // If Cloudinary returned an error, log it
    const errorJson = await response.json().catch(() => null);
    console.warn('Cloudinary upload endpoint response:', errorJson);
    
    throw new Error('Photo upload failed. Please check your connection and try again.');
  } catch (error) {
    console.warn('Cloudinary upload failed:', error);
    throw new Error('Photo upload failed. Please check your connection and try again.');
  }
}

