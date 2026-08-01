import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Section,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  doctorName: string;
  doctorSpecialty: string;
  selectedDate: string;
  selectedSlot: string;
}

export const BookingConfirmationEmail = ({
  doctorName = "Dr. Johir, MBBS — Cardiologist",
  doctorSpecialty = "Cardiologist",
  selectedDate = "2026-08-10",
  selectedSlot = "11:00 AM",
}: EmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={badge}>Doctor Appointment</Section>

          <Heading style={heading}>Appointment Confirmed</Heading>
          <Text style={paragraph}>
            Your appointment has been successfully booked. Please find the
            details below.
          </Text>

          <Section style={box}>
            <Text style={detailText}>
              <strong>Doctor:</strong> {doctorName}
            </Text>
            <Text style={detailText}>
              <strong>Specialty:</strong> {doctorSpecialty}
            </Text>
            <Text style={detailText}>
              <strong>Date:</strong> {selectedDate}
            </Text>
            <Text style={detailText}>
              <strong>Time Slot:</strong> {selectedSlot}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Please arrive at the chamber 10 minutes before your scheduled time.
            Thank you for choosing Doctor Appointment.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingConfirmationEmail;

const main = {
  backgroundColor: "#f0f4f8",
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "32px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  borderRadius: "12px",
  maxWidth: "520px",
  border: "1px solid #e2e8f0",
};

const badge = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: "700" as const,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  padding: "6px 12px",
  borderRadius: "20px",
  display: "inline-block",
  marginBottom: "16px",
};

const heading = {
  color: "#0f172a",
  fontSize: "22px",
  fontWeight: "700" as const,
  margin: "0 0 12px",
};

const paragraph = {
  color: "#475569",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "0 0 8px",
};

const box = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "8px",
  margin: "20px 0",
  border: "1px solid #e2e8f0",
};

const detailText = {
  margin: "8px 0",
  fontSize: "14px",
  color: "#1e293b",
  lineHeight: "22px",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "24px 0",
};

const footer = {
  color: "#94a3b8",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "0",
};
