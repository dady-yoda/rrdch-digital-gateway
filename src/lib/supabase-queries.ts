import { useEffect } from 'react';

// ─────────────────────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────────────────────

export interface MedicalRecord {
  id: string;
  patient_id: string;
  record_name: string;
  type: "prescription" | "scan" | "other";
  prescription_text?: string;
  ipfs_hash?: string;
  is_verified: boolean;
  blockchain_tx?: string;
  created_at: string;
}

export interface DbDoctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  department: string;
  qualification: string;
  experience: number;
  avatarUrl: string;
  available: boolean;
  rating: number;
  patientsToday: number;
}

export interface DbAppointment {
  id: string;
  token_id: string;
  patient_id: string | null;
  doctor_id: string;
  slot_id: string | null;
  date: string;          // "YYYY-MM-DD"
  time: string;          // "09:00"
  display_time: string;  // "9:00 AM"
  complaint: string | null;
  patient_name: string | null;
  patient_phone: string | null;
  patient_dob: string | null;
  patient_email: string | null;
  department: string | null;
  status: "Confirmed" | "Completed" | "Cancelled" | "No-Show";
  created_at: string;
  doctor_name: string;
  doctor_department: string;
}

export interface DbSlot {
  id: string;
  doctor_id: string;
  date: string;
  time: string;
  display_time: string;
  status: "Open" | "Booked" | "Busy";
  created_at: string;
}

// Default mock data
const INITIAL_DOCTORS: DbDoctor[] = [
  {
    id: "doc-123",
    name: "Dr. Smith",
    email: "doctor@rrdch.org",
    specialty: "Orthodontics",
    department: "Orthodontics",
    qualification: "BDS, MDS",
    experience: 12,
    avatarUrl: "https://ui-avatars.com/api/?name=Dr+Smith&background=546B41&color=fff",
    available: true,
    rating: 4.8,
    patientsToday: 3,
  },
  {
    id: "doc-456",
    name: "Dr. Jane Doe",
    email: "jane@rrdch.org",
    specialty: "Pediatric Dentistry",
    department: "Pedodontics",
    qualification: "BDS, MDS",
    experience: 8,
    avatarUrl: "https://ui-avatars.com/api/?name=Jane+Doe&background=546B41&color=fff",
    available: true,
    rating: 4.9,
    patientsToday: 5,
  }
];

const INITIAL_DATA = {
  doctors: INITIAL_DOCTORS,
  appointments: [
    {
      id: "appt-demo",
      token_id: "RRDCH-DEMO-123",
      patient_id: "patient-demo-123",
      doctor_id: "doc-123",
      slot_id: "slot-demo",
      date: new Date().toLocaleDateString("en-CA"),
      time: "10:00",
      display_time: "10:00 AM",
      complaint: "Demo Checkup",
      patient_name: "Demo Patient",
      patient_phone: "1234567890",
      patient_dob: "1990-01-01",
      patient_email: "patient@rrdch.org",
      department: "Orthodontics",
      status: "Confirmed",
      created_at: new Date().toISOString(),
      doctor_name: "Dr. Smith",
      doctor_department: "Orthodontics"
    }
  ] as DbAppointment[],
  slots: [] as DbSlot[],
  medical_records: [] as MedicalRecord[] // for patient dashboard
};

function getMockData() {
  const data = localStorage.getItem("rrdch_mock_db");
  if (data) return JSON.parse(data);
  localStorage.setItem("rrdch_mock_db", JSON.stringify(INITIAL_DATA));
  return INITIAL_DATA;
}

function saveMockData(data: any) {
  localStorage.setItem("rrdch_mock_db", JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("rrdch-data-changed"));
}

export function useRealtimeUpdate(callback: () => void) {
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "rrdch_mock_db") callback();
    };
    window.addEventListener("rrdch-data-changed", callback);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("rrdch-data-changed", callback);
      window.removeEventListener("storage", handleStorage);
    };
  }, [callback]);
}

// ─────────────────────────────────────────────────────────
// Doctor Queries
// ─────────────────────────────────────────────────────────

export async function fetchDoctors(): Promise<DbDoctor[]> {
  const db = getMockData();
  return db.doctors;
}

export async function upsertDoctorRecord(
  profileId: string,
  data: { specialty: string; qualification: string; experience: number; available?: boolean }
): Promise<void> {
  const db = getMockData();
  const existing = db.doctors.find((d: DbDoctor) => d.id === profileId);
  if (existing) {
    existing.specialty = data.specialty;
    existing.qualification = data.qualification;
    existing.experience = data.experience;
    if (data.available !== undefined) existing.available = data.available;
  } else {
    db.doctors.push({
      id: profileId,
      name: "New Doctor",
      email: "new@rrdch.org",
      department: data.specialty,
      avatarUrl: "https://ui-avatars.com/api/?name=New+Doctor",
      rating: 5.0,
      patientsToday: 0,
      ...data,
      available: data.available ?? true,
    });
  }
  saveMockData(db);
}

export async function updateProfileRecord(
  id: string,
  data: { full_name?: string; department?: string }
): Promise<void> {
  const db = getMockData();
  const doc = db.doctors.find((d: DbDoctor) => d.id === id);
  if (doc) {
    if (data.full_name) doc.name = data.full_name;
    if (data.department) doc.department = data.department;
    saveMockData(db);
  }
}

export async function deleteDoctorRecord(id: string): Promise<void> {
  const db = getMockData();
  db.doctors = db.doctors.filter((d: DbDoctor) => d.id !== id);
  saveMockData(db);
}

// ─────────────────────────────────────────────────────────
// Appointment Queries
// ─────────────────────────────────────────────────────────

export async function fetchAppointments(filters?: {
  doctorId?: string;
  date?: string;
  status?: string;
}): Promise<DbAppointment[]> {
  const db = getMockData();
  let appts = db.appointments;
  if (filters?.doctorId) appts = appts.filter((a: DbAppointment) => a.doctor_id === filters.doctorId);
  if (filters?.date) appts = appts.filter((a: DbAppointment) => a.date === filters.date);
  if (filters?.status) appts = appts.filter((a: DbAppointment) => a.status === filters.status);
  
  appts.sort((a: DbAppointment, b: DbAppointment) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return a.time.localeCompare(b.time);
  });
  return appts;
}

export async function insertAppointment(appt: {
  token_id: string;
  patient_id?: string | null;
  doctor_id: string;
  slot_id?: string | null;
  date: string;
  time: string;
  display_time: string;
  complaint: string;
  patient_name: string;
  patient_phone: string;
  patient_dob?: string;
  patient_email?: string;
  department?: string;
}): Promise<string> {
  const db = getMockData();
  const doctor = db.doctors.find((d: DbDoctor) => d.id === appt.doctor_id);
  const newAppt: DbAppointment = {
    ...appt,
    id: "appt-" + Date.now(),
    status: "Confirmed",
    created_at: new Date().toISOString(),
    doctor_name: doctor?.name || "Unknown",
    doctor_department: doctor?.department || "",
    patient_id: appt.patient_id ?? null,
    slot_id: appt.slot_id ?? null,
    patient_dob: appt.patient_dob ?? null,
    patient_email: appt.patient_email ?? null,
    department: appt.department ?? null,
  };
  db.appointments.push(newAppt);
  saveMockData(db);
  return newAppt.id;
}

export async function updateAppointmentStatus(
  id: string,
  status: DbAppointment["status"]
): Promise<void> {
  const db = getMockData();
  const appt = db.appointments.find((a: DbAppointment) => a.id === id);
  if (appt) {
    appt.status = status;
    saveMockData(db);
  }
}

// ─────────────────────────────────────────────────────────
// Slot Queries
// ─────────────────────────────────────────────────────────

export async function fetchSlots(
  doctorId: string,
  date: string
): Promise<DbSlot[]> {
  const db = getMockData();
  return db.slots.filter((s: DbSlot) => s.doctor_id === doctorId && s.date === date)
    .sort((a: DbSlot, b: DbSlot) => a.time.localeCompare(b.time));
}

export async function upsertSlot(slot: {
  id?: string;
  doctor_id: string;
  date: string;
  time: string;
  display_time: string;
  status: DbSlot["status"];
}): Promise<DbSlot> {
  const db = getMockData();
  const existingIndex = db.slots.findIndex(
    (s: DbSlot) => s.doctor_id === slot.doctor_id && s.date === slot.date && s.time === slot.time
  );

  let updatedSlot: DbSlot;
  if (existingIndex >= 0) {
    updatedSlot = { ...db.slots[existingIndex], ...slot };
    db.slots[existingIndex] = updatedSlot;
  } else {
    updatedSlot = { ...slot, id: "slot-" + Date.now(), created_at: new Date().toISOString() } as DbSlot;
    db.slots.push(updatedSlot);
  }
  
  saveMockData(db);
  return updatedSlot;
}

export async function updateSlotStatus(
  slotId: string,
  status: DbSlot["status"]
): Promise<void> {
  const db = getMockData();
  const slot = db.slots.find((s: DbSlot) => s.id === slotId);
  if (slot) {
    slot.status = status;
    saveMockData(db);
  }
}

// ─────────────────────────────────────────────────────────
// Audit Log & Medical Records (Mocked)
// ─────────────────────────────────────────────────────────

export async function logAudit(entry: {
  admin_id: string;
  action: string;
  target_user_id?: string | null;
  details?: Record<string, unknown>;
}): Promise<void> {
  console.log(`[AUDIT] ${new Date().toISOString()} — ${entry.action}`, entry.details);
}

export async function fetchMedicalRecords(patientId: string): Promise<MedicalRecord[]> {
  const db = getMockData();
  return db.medical_records.filter((r: MedicalRecord) => r.patient_id === patientId).sort((a: MedicalRecord, b: MedicalRecord) => b.created_at.localeCompare(a.created_at));
}

export async function insertMedicalRecord(record: Omit<MedicalRecord, "id" | "created_at">): Promise<MedicalRecord> {
  const db = getMockData();
  const newRecord: MedicalRecord = {
    ...record,
    id: "rec-" + Date.now(),
    created_at: new Date().toISOString()
  };
  db.medical_records.push(newRecord);
  saveMockData(db);
  return newRecord;
}
