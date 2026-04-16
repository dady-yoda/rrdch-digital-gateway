export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  qualification: string;
  experience: number;
  avatarUrl: string;
  available: boolean;
  rating: number;
  patientsToday: number;
}
const avatar = (name: string, bg: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=128&rounded=true&bold=true`;

export const DOCTORS: Doctor[] = [
  { id: "dr-001", name: "Dr. Priya Sharma", specialty: "Oral Medicine & Radiology", department: "Oral Medicine & Radiology", qualification: "BDS, MDS", experience: 12, avatarUrl: avatar("Priya Sharma", "546B41"), available: true, rating: 4.8, patientsToday: 6 },
  { id: "dr-002", name: "Dr. Suresh Kumar", specialty: "Oral & Maxillofacial Surgery", department: "Oral & Maxillofacial Surgery", qualification: "BDS, MDS", experience: 18, avatarUrl: avatar("Suresh Kumar", "99AD7A"), available: true, rating: 4.9, patientsToday: 4 },
  { id: "dr-003", name: "Dr. Anitha Rao", specialty: "Orthodontics", department: "Orthodontics", qualification: "BDS, MDS", experience: 9, avatarUrl: avatar("Anitha Rao", "546B41"), available: true, rating: 4.7, patientsToday: 8 },
  { id: "dr-004", name: "Dr. Vikram Menon", specialty: "Prosthodontics", department: "Prosthodontics", qualification: "BDS, MDS", experience: 15, avatarUrl: avatar("Vikram Menon", "546B41"), available: false, rating: 4.6, patientsToday: 5 },
  { id: "dr-005", name: "Dr. Kavitha Nair", specialty: "Periodontics", department: "Periodontics", qualification: "BDS, MDS", experience: 11, avatarUrl: avatar("Kavitha Nair", "99AD7A"), available: true, rating: 4.8, patientsToday: 7 },
  { id: "dr-006", name: "Dr. Ramesh Patel", specialty: "Conservative Dentistry", department: "Conservative Dentistry", qualification: "BDS, MDS", experience: 14, avatarUrl: avatar("Ramesh Patel", "546B41"), available: true, rating: 4.5, patientsToday: 9 },
  { id: "dr-007", name: "Dr. Meena Iyer", specialty: "Pedodontics", department: "Pedodontics", qualification: "BDS, MDS", experience: 8, avatarUrl: avatar("Meena Iyer", "546B41"), available: true, rating: 4.9, patientsToday: 10 },
  { id: "dr-008", name: "Dr. Arun Krishnan", specialty: "Oral Pathology", department: "Oral Pathology", qualification: "BDS, MDS", experience: 10, avatarUrl: avatar("Arun Krishnan", "99AD7A"), available: true, rating: 4.6, patientsToday: 3 },
  { id: "dr-009", name: "Dr. Sindhu Reddy", specialty: "Public Health Dentistry", department: "Public Health Dentistry", qualification: "BDS, MDS", experience: 7, avatarUrl: avatar("Sindhu Reddy", "546B41"), available: true, rating: 4.7, patientsToday: 5 },
];
