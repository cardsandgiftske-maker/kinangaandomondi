import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Key,
  Search,
  Trash2,
  RefreshCw,
  X,
  Eye,
  EyeOff,
  Users,
  CheckCircle,
  FileSpreadsheet,
  LogOut,
} from 'lucide-react';
import { RsvpGuest } from '../types';
import {
  adminLogin,
  getAdminRsvps,
  updateAdminRsvpStatus,
  deleteAdminRsvp,
} from '../lib/firebase';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string>(
    () => sessionStorage.getItem('wedding_admin_token') || ''
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!sessionStorage.getItem('wedding_admin_token')
  );
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [guests, setGuests] = useState<RsvpGuest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [passcodeError, setPasscodeError] = useState('');

  const loadRsvps = useCallback(
    async (tokenToUse?: string) => {
      const token = tokenToUse || adminToken;
      if (!token) return;

      setIsLoadingData(true);
      try {
        const data = await getAdminRsvps(token);
        setGuests(data);
      } catch (err: any) {
        console.error('Failed to load RSVPs:', err);
        if (err.message && (err.message.includes('Unauthorized') || err.message.includes('Forbidden'))) {
          setIsAuthenticated(false);
          setAdminToken('');
          sessionStorage.removeItem('wedding_admin_token');
          setPasscodeError('Session expired. Please log in again.');
        }
      } finally {
        setIsLoadingData(false);
      }
    },
    [adminToken]
  );

  useEffect(() => {
    if (isOpen && isAuthenticated && adminToken) {
      loadRsvps(adminToken);
    }
  }, [isOpen, isAuthenticated, adminToken, loadRsvps]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');
    setIsLoggingIn(true);

    try {
      const result = await adminLogin(passcode);
      if (result.success && result.token) {
        setAdminToken(result.token);
        sessionStorage.setItem('wedding_admin_token', result.token);
        setIsAuthenticated(true);
        setPasscode('');
        await loadRsvps(result.token);
      }
    } catch (err: any) {
      setPasscodeError(err.message || 'Incorrect passcode. Access Denied.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminToken('');
    sessionStorage.removeItem('wedding_admin_token');
    setGuests([]);
  };

  const handleDelete = async (id: string) => {
    if (!adminToken) return;
    try {
      await deleteAdminRsvp(adminToken, id);
      setGuests((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error('Failed to delete RSVP:', err);
    }
  };

  const handleToggleAttendance = async (id: string) => {
    if (!adminToken) return;
    const guest = guests.find((g) => g.id === id);
    if (!guest) return;

    const nextAttend = guest.willAttend === 'yes' ? 'no' : 'yes';
    const nextAdults = nextAttend === 'yes' ? guest.adultsCount || 1 : 0;

    try {
      await updateAdminRsvpStatus(adminToken, id, nextAttend, nextAdults, 0);
      setGuests((prev) =>
        prev.map((g) =>
          g.id === id ? { ...g, willAttend: nextAttend, adultsCount: nextAdults } : g
        )
      );
    } catch (err) {
      console.error('Failed to update attendance:', err);
    }
  };

  const handleExportCSV = () => {
    if (guests.length === 0) return;

    const headers = [
      'ID',
      'Full Name',
      'Phone Number',
      'Will Attend',
      'Song Request',
      'Digital Code',
      'Notes',
      'Submitted At',
    ];
    const rows = guests.map((g) => [
      g.id,
      `"${g.fullName.replace(/"/g, '""')}"`,
      `"${g.phoneNumber}"`,
      g.willAttend === 'yes' ? 'YES' : 'NO',
      `"${(g.songRequest || '').replace(/"/g, '""')}"`,
      g.eCardCode,
      `"${(g.notes || '').replace(/"/g, '""')}"`,
      g.submittedAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `sharon_and_collins_wedding_rsvps_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phoneNumber.includes(searchQuery);

    const matchesAttendance =
      attendanceFilter === 'all' ||
      (attendanceFilter === 'yes' && g.willAttend === 'yes') ||
      (attendanceFilter === 'no' && g.willAttend === 'no');

    return matchesSearch && matchesAttendance;
  });

  const totalRsvps = guests.length;
  const totalAttending = guests.filter((g) => g.willAttend === 'yes').length;
  const totalDeclined = guests.filter((g) => g.willAttend === 'no').length;

  return (
    <>
      {/* Footer */}
      <footer className="py-12 bg-[#FAF5EB] flex justify-center border-t border-[#E6D2A2] text-[#2C251D] font-sans text-xs select-none">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <p className="font-serif text-base text-[#2C251D] font-semibold">
            Sharon Kinanga Ogari &amp; Collins Omondi Obat
          </p>
          <p className="text-[#574D41]">
            04.12.2026 · Monarch Gardens, Mosocho, Kisii County
          </p>
          <p className="text-[#85796B]">© 2026 Chartis and Donis Weddings. All rights reserved.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-1 text-[#7A5A1F] hover:text-[#2C251D] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-xs bg-white hover:bg-[#FDFBF7] px-4 py-2 rounded-full border border-[#D4B475] shadow-xs"
            title="Couple Admin Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#B58E43]" />
            <span>Couple Admin Portal</span>
          </button>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C251D]/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white border border-[#D4B475] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative flex flex-col my-8 max-h-[90vh]">
              {/* Header */}
              <div className="border-b border-[#E6D2A2] p-6 flex items-center justify-between bg-[#FDFBF7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#D4B475] flex items-center justify-center text-[#9A742E]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#2C251D] font-semibold">
                      Guest RSVP Dashboard
                    </h3>
                    <p className="text-xs text-[#574D41] font-sans">
                      Sharon &amp; Collins Wedding RSVP Database
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isAuthenticated && (
                    <button
                      onClick={handleLogout}
                      className="p-2 hover:bg-rose-50 rounded-full text-[#574D41] hover:text-rose-700 transition-colors cursor-pointer"
                      title="Log Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-[#FAF5EB] rounded-full text-[#574D41] hover:text-[#2C251D] transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {!isAuthenticated ? (
                <div className="p-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#FAF5EB] border border-[#D4B475] text-[#9A742E] flex items-center justify-center">
                    <Key className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-xl text-[#2C251D] font-semibold">
                      Passcode Required
                    </h4>
                    <p className="text-xs text-[#574D41]">
                      Exclusively for Sharon &amp; Collins to access the guest RSVP database.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="w-full space-y-4">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter Admin Passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#D4B475] focus:border-[#9A742E] rounded-xl pl-4 pr-11 py-3 text-sm text-[#2C251D] outline-none transition-colors text-center font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-[#85796B] hover:text-[#2C251D] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {passcodeError && (
                      <p className="text-xs text-rose-600 font-medium">{passcodeError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full py-3 bg-[#B58E43] hover:bg-[#9A742E] text-white font-sans font-bold uppercase tracking-wider text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoggingIn ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Authenticate Access</span>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-6 overflow-y-auto space-y-6 flex-1 flex flex-col">
                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#FDFBF7] border border-[#E6D2A2] p-4 rounded-2xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] text-[#9A742E] flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#574D41] uppercase font-sans font-bold">
                          Total RSVPs
                        </p>
                        <p className="text-xl font-semibold font-serif text-[#2C251D] tabular-nums">
                          {totalRsvps}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#FDFBF7] border border-[#E6D2A2] p-4 rounded-2xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#574D41] uppercase font-sans font-bold">
                          Attending
                        </p>
                        <p className="text-xl font-semibold font-serif text-[#2C251D] tabular-nums">
                          {totalAttending}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#FDFBF7] border border-[#E6D2A2] p-4 rounded-2xl flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                        <X className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#574D41] uppercase font-sans font-bold">
                          Declined
                        </p>
                        <p className="text-xl font-semibold font-serif text-[#2C251D] tabular-nums">
                          {totalDeclined}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Filter & Actions */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
                      <div className="relative flex-1 max-w-sm min-w-[200px]">
                        <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#85796B]" />
                        <input
                          type="text"
                          placeholder="Search guest by name or phone..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#FDFBF7] border border-[#D4B475] focus:border-[#9A742E] rounded-xl pl-10 pr-4 py-2 text-xs text-[#2C251D] outline-none transition-colors"
                        />
                      </div>

                      <div className="inline-flex bg-[#FAF5EB] border border-[#E6D2A2] rounded-lg p-1 text-xs">
                        {(['all', 'yes', 'no'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => setAttendanceFilter(status)}
                            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                              attendanceFilter === status
                                ? 'bg-[#B58E43] text-white font-bold'
                                : 'text-[#574D41] hover:text-[#2C251D]'
                            }`}
                          >
                            {status === 'all' ? 'All' : status === 'yes' ? 'Attending' : 'Declined'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <button
                        onClick={() => loadRsvps()}
                        disabled={isLoadingData}
                        className="px-3.5 py-2 bg-white border border-[#D4B475] hover:bg-[#FAF5EB] text-[#2C251D] rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                      </button>

                      <button
                        onClick={handleExportCSV}
                        disabled={guests.length === 0}
                        className="px-4 py-2 bg-[#B58E43] hover:bg-[#9A742E] text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Guest Table */}
                  <div className="border border-[#E6D2A2] bg-white rounded-2xl overflow-hidden flex-1 overflow-x-auto max-h-[400px]">
                    <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                      <thead>
                        <tr className="bg-[#FAF5EB] border-b border-[#E6D2A2] text-[#574D41] font-sans font-bold uppercase tracking-wider">
                          <th className="p-4">Guest Name</th>
                          <th className="p-4">Phone Number</th>
                          <th className="p-4 text-center">Attendance</th>
                          <th className="p-4 text-center">E-Card Code</th>
                          <th className="p-4">Notes / Wishes</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGuests.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-10 text-center text-[#574D41] font-serif italic text-sm">
                              {isLoadingData
                                ? 'Loading RSVPs from database...'
                                : 'No guest records found matching the search criteria.'}
                            </td>
                          </tr>
                        ) : (
                          filteredGuests.map((guest) => (
                            <tr
                              key={guest.id}
                              className="border-b border-[#FAF5EB] hover:bg-[#FDFBF7] transition-colors"
                            >
                              <td className="p-4">
                                <div className="font-serif font-semibold text-[#2C251D] text-sm">
                                  {guest.fullName}
                                </div>
                                <div className="text-[10px] text-[#85796B] font-mono tabular-nums mt-0.5">
                                  {new Date(guest.submittedAt).toLocaleDateString('en-KE', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </div>
                              </td>
                              <td className="p-4 font-mono tabular-nums text-[#574D41]">
                                {guest.phoneNumber}
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => handleToggleAttendance(guest.id)}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sans font-bold text-[10px] uppercase tracking-wider border cursor-pointer ${
                                    guest.willAttend === 'yes'
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                      : 'bg-stone-100 border-stone-200 text-stone-700'
                                  }`}
                                  title="Click to toggle status"
                                >
                                  {guest.willAttend === 'yes' ? 'Attending' : 'Declined'}
                                </button>
                              </td>
                              <td className="p-4 text-center font-mono tabular-nums font-bold text-[#7A5A1F] tracking-wider">
                                {guest.eCardCode}
                              </td>
                              <td className="p-4 text-[#574D41] italic max-w-xs truncate" title={guest.notes}>
                                {guest.notes || <span className="text-[#85796B]">None</span>}
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDelete(guest.id)}
                                  className="p-2 bg-white hover:bg-rose-50 text-[#85796B] hover:text-rose-700 border border-[#E6D2A2] hover:border-rose-300 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Entry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-[11px] text-[#574D41] text-center font-sans">
                    Showing {filteredGuests.length} of {guests.length} total registrations.
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
