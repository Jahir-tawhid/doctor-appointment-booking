"use server";

import { resend, getFromAddress } from "@/lib/resend";
import { BookingConfirmationEmail } from "@/components/emails/BookingConfirmationEmail";
import { db } from "@/lib/db";
import { getDoctorById } from "@/lib/doctors";

type BookingPayload = {
  doctorId: string;
  userId: string;
  userEmail: string;
  selectedDate: string;
  selectedSlot: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createBookingAndSendEmail(formData: BookingPayload) {
  const { doctorId, userId, userEmail, selectedDate, selectedSlot } = formData;

  const trimmedEmail = userEmail.trim().toLowerCase();

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  const doctor = getDoctorById(doctorId);

  if (!doctor) {
    return {
      success: false,
      message: "Please select a valid doctor.",
    };
  }

  // Step 1: Date validation — block past dates
  const today = new Date().toISOString().split("T")[0];

  if (selectedDate < today) {
    return {
      success: false,
      message: "You cannot book an appointment for a past date!",
    };
  }

  try {
    // Step 2: Check database for an existing booking on this slot
    const existingBooking = await db.booking.findFirst({
      where: {
        doctorId,
        selectedDate,
        selectedSlot,
      },
    });

    if (existingBooking) {
      return {
        success: false,
        message:
          "This slot is already booked for this date. Please choose another slot!",
      };
    }

    // Step 3: Save booking to database
    await db.booking.create({
      data: {
        doctorId,
        userId,
        userEmail: trimmedEmail,
        doctorName: doctor.displayName, 
        doctorSpecialty: doctor.specialty,
        selectedDate,
        selectedSlot,
      },
    });

    if (!process.env.RESEND_API_KEY) {
      return {
        success: true,
        message:
          "Booking saved! Add RESEND_API_KEY to .env.local to enable email confirmation.",
      };
    }

    // Step 4: Send confirmation email via Resend
    const emailResult = await resend.emails.send({
      from: getFromAddress(),
      to: trimmedEmail,
      subject: "Doctor Appointment — Confirmation",
      react: BookingConfirmationEmail({
        doctorName: doctor.displayName,
        doctorSpecialty: doctor.specialty,
        selectedDate,
        selectedSlot,
      }),
    });

    if (emailResult.error) {
      console.error("Resend API error:", emailResult.error);
      return {
        success: true,
        message: "Booking saved, but failed to send confirmation email.",
      };
    }

    return {
      success: true,
      message: "Booking successful! A confirmation email has been sent.",
    };
  } catch (error) {
    console.error("Server action error:", error);

    return {
      success: false,
      message: "Internal server error. Please try again later.",
    };
  }
}
