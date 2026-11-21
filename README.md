# Kinanga & Omondi Wedding Invitation

Vite + React wedding invitation prepared for Vercel deployment. RSVP data is collected only through the website form and written through protected Vercel API routes using Firebase Admin SDK. No phone number or phone enquiry contact is requested or displayed. Guest photos are stored in Cloudinary and their metadata is stored in Firestore.

## Client photo assets

The original seven client-provided JPEGs are included unchanged in `src/assets/images/` and used in the invitation carousel, envelope opening experience, and venue section. No retouching, cropping, compression, or colour changes have been applied to the source files.

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and fill the Firebase web and Cloudinary values.
3. Add the server-only Firebase Admin values to `.env.local` for local API testing.
4. Run `npm install`, then `npm run dev`.

## Vercel deployment

1. Push this project to a private GitHub repository and import it into Vercel.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add every variable in `.env.example` to Vercel Project Settings → Environment Variables. `FIREBASE_PRIVATE_KEY` must be the service-account private key; preserve newlines or use `\n` escapes. Never expose server-only variables with a `VITE_` prefix.
4. In Firebase Console, enable **Authentication → Email/Password** and create the administrator account. Create a dedicated service account for the Vercel API with permissions to access Firestore and verify Firebase Authentication ID tokens; put its project ID, client email and private key in the server-only variables. Copy that account's UID into `ADMIN_UIDS` in Vercel (comma-separated for multiple administrators).
5. Set `VITE_FIREBASE_DATABASE_ID` and `FIREBASE_DATABASE_ID` to the same Firestore database ID (the supplied project previously used `ai-studio-kinangaandomondi-06526191-1516-4011-b546-d537fff3995c`). Deploy `firestore.rules` to that exact database. RSVP access is intentionally denied directly from the browser; trusted Vercel API routes use Firebase Admin. Public RSVP submissions use server-generated record IDs, so guests do not provide phone numbers and guests sharing the same name can still submit independently.
6. Create a Cloudinary unsigned upload preset. Restrict it to image formats, set a sensible maximum file size, and use the folder `kinanga_omondi_wedding`. Set the cloud name and preset in Vercel.
7. Redeploy after changing environment variables. Test a real RSVP, multiple RSVP submission testing, admin sign-in, export, gallery upload and gallery like from a phone.

## Required server-side secrets

- `FIREBASE_PROJECT_ID`
- `FIREBASE_DATABASE_ID` (use the existing named Firestore database ID when retaining the AI Studio database)
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `ADMIN_UIDS`

The Firebase Web API key is browser configuration, not an admin credential. The service-account private key must remain server-only. Do not commit `.env.local` or service-account JSON.

## Important launch checks

- Confirm the couple's date, venue, programme and gift instructions before publishing. RSVPs are collected exclusively through the website; do not publish a phone enquiry number.
- Confirm the final public domain and configure it in Vercel. The QR code is generated from the current deployed domain.
- Add an appropriate privacy notice and obtain consent for guest photo uploads.
- Consider adding an anti-abuse challenge/rate limit to public RSVP and photo upload endpoints before a large public launch.
