import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Key, Search, Trash2, RefreshCw, X, Eye, EyeOff, Users, CheckCircle, XCircle, FileSpreadsheet, Utensils } from 'lucide-react';
import { RsvpGuest } from '../types';
import { deleteRsvp, updateRsvpStatus, isFirebaseConfigured, getRsvps, loginAdmin, logoutAdmin, checkAdminSession } from '../lib/firebase';

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [guests, setGuests] = useState<RsvpGuest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [passcodeError, setPasscodeError] = useState('');

  useEffect(() => {
    const handleOpenAdmin = () => setIsOpen(true);
    window.addEventListener('open_admin_panel', handleOpenAdmin);
    let active = true;
    checkAdminSession().then(authenticated => {
      if (!active) return;
      setIsAuthenticated(authenticated);
      if (authenticated) getRsvps().then(rows => { if (active) setGuests(rows); }).catch(console.error);
      else setGuests([]);
    }).catch(() => { if (active) setIsAuthenticated(false); });
    return () => { active = false; window.removeEventListener('open_admin_panel', handleOpenAdmin); };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    const refresh = async () => { try { const rows = await getRsvps(); if (active) setGuests(rows); } catch (error) { console.error(error); } };
    refresh();
    const timer = window.setInterval(refresh, 15000);
    return () => { active = false; window.clearInterval(timer); };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setPasscodeError('');
    try { await loginAdmin(passcode); setIsAuthenticated(true); setPasscode(''); }
    catch { setPasscodeError('Sign-in failed. Check the shared administrator password.'); }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this RSVP entry?')) {
      try {
        await deleteRsvp(id);
      } catch (err) {
        console.error('Failed to delete RSVP:', err);
      }
    }
  };

  const handleToggleAttendance = async (id: string) => {
    const guest = guests.find((g) => g.id === id);
    if (!guest) return;

    const nextAttend = guest.willAttend === 'yes' ? 'no' : 'yes';
    const nextSeats = nextAttend === 'yes' ? 1 : 0;

    try {
      await updateRsvpStatus(id, nextAttend, nextSeats);
    } catch (err) {
      console.error('Failed to update attendance:', err);
    }
  };

  const handleExportCSV = () => {
    if (guests.length === 0) return;

    // Construct CSV Header and Content
    const headers = [
      'ID',
      'Full Name(s)',
      'Will Attend',
      'Dietary Requirements & Allergies',
      'Personal Wishes & Notes',
      'Submitted At'
    ];
    const rows = guests.map((g) => [
      g.id,
      `"${g.fullName.replace(/"/g, '""')}"`,
      g.willAttend === 'yes' ? 'YES' : 'NO',
      `"${(g.dietaryRequirements || '').replace(/"/g, '""')}"`,
      `"${(g.notes || '').replace(/"/g, '""')}"`,
      g.submittedAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    
    // Create hidden trigger to download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `kinanga_and_omondi_wedding_rsvps_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.dietaryRequirements && g.dietaryRequirements.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAttendance =
      attendanceFilter === 'all' ||
      (attendanceFilter === 'yes' && g.willAttend === 'yes') ||
      (attendanceFilter === 'no' && g.willAttend === 'no');

    return matchesSearch && matchesAttendance;
  });

  // Aggregate stats
  const totalRsvps = guests.length;
  const totalAttending = guests.filter((g) => g.willAttend === 'yes').length;
  const totalDeclined = guests.filter((g) => g.willAttend === 'no').length;
  const totalSeats = guests.reduce((sum, g) => {
    if (g.willAttend !== 'yes') return sum;
    return sum + (g.adultsCount ?? (1 + (g.peopleComingWith || 0)));
  }, 0);

  return (
    <>
      {/* Footer & Admin Trigger */}
      <footer className="py-12 bg-[#231D16] flex justify-center border-t border-[#D4AF37]/30 text-stone-100 font-sans text-xs select-none">
        <div className="flex flex-col items-center gap-3 text-center px-4">
          <p className="text-[#F3E7CE] font-serif text-sm tracking-wide">Kinanga &amp; Omondi · December 4, 2026</p>
          <p className="text-stone-400 text-[11px]">© 2026 Sharon Kinanga Ogari &amp; Collins Omondi Obat. All rights reserved.</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-2 text-stone-100 hover:text-white font-medium transition-all flex items-center gap-2 cursor-pointer text-xs bg-[#2E261D] hover:bg-[#3A3024] px-4 py-2.5 rounded-full border border-[#D4AF37]/40 shadow-lg active:scale-95"
            title="Password-Protected Couple Admin Panel"
          >
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Couple Admin Portal</span>
          </button>
        </div>
      </footer>

      {/* Full screen modal wrapper */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white border border-[#D8C39A] rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden relative flex flex-col my-8 max-h-[90vh]">
              {/* Header */}
              <div className="border-b border-[#E5D7BC] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#D8C39A] flex items-center justify-center text-[#8A6621]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-xl text-[#2A2218] font-medium">Admin Guest Manager</h3>
                      {isFirebaseConfigured ? (
                        <span className="text-[10px] text-emerald-700 font-sans font-bold uppercase tracking-wider">
                          · Cloud Live
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#8A6621] font-sans font-bold uppercase tracking-wider">
                          · Sandbox
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B5E4E] font-sans">Kinanga &amp; Omondi Wedding RSVP Dashboard</p>
                  </div>
                </div>
                {isAuthenticated && <button onClick={async () => { await logoutAdmin(); setIsAuthenticated(false); setGuests([]); }} className="text-xs text-[#8A6621] mr-3">Sign out</button>}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-[#FAF5EB] rounded-full text-stone-400 hover:text-[#2A2218] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Login authentication overlay if not authenticated */}
              {!isAuthenticated ? (
                <div className="p-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#FAF5EB] border border-[#D4AF37]/50 flex items-center justify-center text-[#8A6621]">
                    <Key className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-lg text-[#2A2218] font-medium">Administrator Sign In</h4>
                    <p className="text-xs text-[#6B5E4E]">Exclusively for Kinanga &amp; Omondi to access the guest RSVP database.</p>
                  </div>

                  <form onSubmit={handleLogin} className="w-full space-y-4">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Password"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#D8C39A] focus:border-[#8A6621] rounded-xl pl-4 pr-11 py-3 text-sm text-[#2A2218] outline-none transition-colors text-center"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-stone-400 hover:text-[#2A2218] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {passcodeError && (
                      <p className="text-xs text-rose-600 font-medium">{passcodeError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#8A6621] hover:bg-[#6B4E18] text-white font-sans font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Sign In Securely
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated Dashboard Panel */
                <div className="p-6 overflow-y-auto space-y-6 flex-1 flex flex-col">
                  {/* Dashboard stats cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Stat 1 */}
                    <div className="bg-[#FDFBF7] border border-[#E5D7BC] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] text-[#8A6621] flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#6B5E4E] uppercase font-sans font-bold">Total RSVP Responses</p>
                        <p className="text-xl font-semibold font-serif text-[#2A2218] tabular-nums">{totalRsvps}</p>
                      </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-[#FDFBF7] border border-[#E5D7BC] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#6B5E4E] uppercase font-sans font-bold">Confirmed Attending</p>
                        <p className="text-xl font-semibold font-serif text-emerald-800 tabular-nums">{totalAttending}</p>
                      </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-[#FDFBF7] border border-[#E5D7BC] p-4 rounded-2xl flex items-center gap-3.5 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                        <XCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#6B5E4E] uppercase font-sans font-bold">Declined Count</p>
                        <p className="text-xl font-semibold font-serif text-[#2A2218] tabular-nums">{totalDeclined}</p>
                      </div>
                    </div>
                  </div>

                  {/* Filter and Action Header */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                    {/* Search and Filters */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-1">
                      {/* Search Bar */}
                      <div className="relative flex-1 max-w-sm min-w-[200px]">
                        <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          placeholder="Search name, phone, or dietary..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#FDFBF7] border border-[#D8C39A] focus:border-[#8A6621] rounded-xl pl-10 pr-4 py-2 text-xs text-[#2A2218] outline-none transition-colors"
                        />
                      </div>

                      {/* Filter Tabs */}
                      <div className="inline-flex bg-[#FAF5EB] border border-[#D8C39A] rounded-lg p-1 text-xs">
                        <button
                          onClick={() => setAttendanceFilter('all')}
                          className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                            attendanceFilter === 'all' ? 'bg-[#8A6621] text-white font-bold' : 'text-[#574C3F] hover:text-[#2A2218]'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setAttendanceFilter('yes')}
                          className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                            attendanceFilter === 'yes' ? 'bg-[#8A6621] text-white font-bold' : 'text-[#574C3F] hover:text-[#2A2218]'
                          }`}
                        >
                          Attending
                        </button>
                        <button
                          onClick={() => setAttendanceFilter('no')}
                          className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                            attendanceFilter === 'no' ? 'bg-[#8A6621] text-white font-bold' : 'text-[#574C3F] hover:text-[#2A2218]'
                          }`}
                        >
                          Declined
                        </button>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <button
                        onClick={() => { getRsvps().then(setGuests); }}
                        className="px-3.5 py-2 bg-white border border-[#D8C39A] hover:bg-[#FAF5EB] text-[#4A3F32] hover:text-[#2A2218] rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                        title="Reload Database"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refresh</span>
                      </button>
                      
                      <button
                        onClick={handleExportCSV}
                        disabled={guests.length === 0}
                        className="px-4 py-2 bg-[#8A6621] hover:bg-[#6B4E18] text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow disabled:opacity-50"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Guest Table/List */}
                  <div className="border border-[#D8C39A] bg-white rounded-2xl overflow-hidden flex-1 overflow-x-auto shadow-inner max-h-[400px]">
                    <table className="w-full text-left text-xs border-collapse min-w-[620px]">
                      <thead>
                        <tr className="bg-[#FAF5EB] border-b border-[#E5D7BC] text-[#574C3F] font-sans font-bold uppercase tracking-wider">
                          <th className="p-4">Full Name(s)</th>
                          <th className="p-4 text-center">Attendance</th>
                          <th className="p-4">Dietary &amp; Allergies</th>
                          <th className="p-4">Wishes / Notes</th>
                          <th className="p-4 text-right">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGuests.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-10 text-center text-stone-500 font-serif italic text-sm">
                              No guest records found matching the search criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredGuests.map((guest) => (
                            <tr key={guest.id} className="border-b border-[#E5D7BC]/50 hover:bg-[#FDFBF7] transition-colors">
                              <td className="p-4">
                                <div className="font-serif font-semibold text-[#2A2218] text-sm">{guest.fullName}</div>
                                <div className="text-[10px] text-stone-400 font-mono mt-0.5 tabular-nums">
                                  {new Date(guest.submittedAt).toLocaleDateString('en-KE', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => handleToggleAttendance(guest.id)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans font-bold text-[9px] uppercase tracking-wider border cursor-pointer ${
                                    guest.willAttend === 'yes'
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                      : 'bg-stone-50 border-stone-200 text-stone-600'
                                  }`}
                                  title="Click to toggle status"
                                >
                                  {guest.willAttend === 'yes' ? 'Attending' : 'Declined'}
                                </button>
                              </td>
                              <td className="p-4 text-[#4A3F32] font-sans">
                                {guest.dietaryRequirements ? (
                                  <span className="text-[#2A2218] font-medium bg-[#FAF5EB] border border-[#D8C39A] px-2 py-1 rounded-md inline-block">
                                    {guest.dietaryRequirements}
                                  </span>
                                ) : (
                                  <span className="text-stone-400 italic">None</span>
                                )}
                              </td>
                              <td className="p-4 text-stone-500 italic max-w-xs truncate" title={guest.notes}>
                                {guest.notes || <span className="text-stone-300">None</span>}
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDelete(guest.id)}
                                  className="p-2 bg-white hover:bg-rose-50 text-stone-400 hover:text-rose-700 border border-stone-200 hover:border-rose-300 rounded-lg transition-all cursor-pointer"
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

                  {/* Footer Stats summary */}
                  <div className="text-[10px] text-stone-500 text-center font-sans">
                    Showing {filteredGuests.length} of {guests.length} total registrations. Unlocked with administrative access privilege.
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
