"use client";

import { useState } from "react";
import { createBookingAndSendEmail } from "@/app/actions/booking";
import { doctors, getDoctorById } from "@/lib/doctors";
import { toast } from "sonner";

const availableSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "04:00 PM",
];

export default function BookingPage() {
  const [userEmail, setUserEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const selectedDoctor =
    doctors.find((doctor) => doctor.id === selectedDoctorId) ?? doctors[0];
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createBookingAndSendEmail({
        doctorId: selectedDoctorId,
        userId: `user_${Date.now()}`,
        userEmail,
        selectedDate,
        selectedSlot,
      });

      if (result.success) {
        toast.success(result.message);
        setUserEmail("");
        setSelectedDate("");
        setSelectedSlot("11:00 AM");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Online Booking
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Doctor Appointment
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Select a specialist, pick a time, and book instantly
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/40 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doctor Selection */}
            <div>
              <label
                htmlFor="doctor"
                className="block text-sm font-semibold mb-2 text-slate-200"
              >
                Select Doctor
              </label>
              <select
                id="doctor"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer [color-scheme:dark]"
              >
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.displayName}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-400">
                Specialty: {selectedDoctor.specialty}
              </p>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-slate-200"
              >
                Your Email Address
              </label>
              <input
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-semibold mb-2 text-slate-200"
              >
                Appointment Date
              </label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-800/80 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition [color-scheme:dark]"
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-slate-200">
                Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 px-2 text-xs sm:text-sm rounded-xl border font-medium transition-all duration-200 ${
                      selectedSlot === slot
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40"
                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm Appointment"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          A confirmation email will be sent to your inbox after booking.
        </p>
      </div>
    </main>
  );
}
