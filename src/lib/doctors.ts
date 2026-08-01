export type Doctor = {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  displayName: string;
};

export const doctors: Doctor[] = [
  {
    id: "doc_101",
    name: "Dr. Johir",
    degree: "MBBS",
    specialty: "Cardiologist",
    displayName: "Dr. Johir, MBBS — Cardiologist",
  },
  {
    id: "doc_102",
    name: "Dr. Fatima",
    degree: "MBBS",
    specialty: "Pediatrician",
    displayName: "Dr. Fatima, MBBS — Pediatrician",
  },
  {
    id: "doc_103",
    name: "Dr. Karim",
    degree: "MBBS",
    specialty: "Orthopedic Surgeon",
    displayName: "Dr. Karim, MBBS — Orthopedic Surgeon",
  },
  {
    id: "doc_104",
    name: "Dr. Nadia",
    degree: "MBBS",
    specialty: "Dermatologist",
    displayName: "Dr. Nadia, MBBS — Dermatologist",
  },
  {
    id: "doc_105",
    name: "Dr. Rahman",
    degree: "MBBS",
    specialty: "Neurologist",
    displayName: "Dr. Rahman, MBBS — Neurologist",
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id);
}
