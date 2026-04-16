export interface Appointment {
  id: string;
  tokenId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  displayTime: string;
  status: "Confirmed" | "Completed" | "Cancelled" | "No-Show";
  complaint: string;
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "apt-1", tokenId: "RRDCH-20260416-1234", patientName: "Rahul Sharma", patientPhone: "+91 9876543210", doctorId: "dr-003", doctorName: "Dr. Anitha Rao", department: "Orthodontics", date: new Date().toISOString().split("T")[0], time: "09:00", displayTime: "9:00 AM", status: "Confirmed", complaint: "Braces wire broken" },
  { id: "apt-2", tokenId: "RRDCH-20260416-5678", patientName: "Sneha Reddy", patientPhone: "+91 8765432109", doctorId: "dr-003", doctorName: "Dr. Anitha Rao", department: "Orthodontics", date: new Date().toISOString().split("T")[0], time: "10:30", displayTime: "10:30 AM", status: "Completed", complaint: "Routine Checkup" },
  { id: "apt-3", tokenId: "RRDCH-20260416-9012", patientName: "Arvind Kumar", patientPhone: "+91 7654321098", doctorId: "dr-001", doctorName: "Dr. Priya Sharma", department: "Oral Medicine & Radiology", date: new Date().toISOString().split("T")[0], time: "14:00", displayTime: "2:00 PM", status: "Confirmed", complaint: "Tooth ache from 2 days" }
];
