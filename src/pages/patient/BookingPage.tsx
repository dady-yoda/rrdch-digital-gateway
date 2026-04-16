import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { DOCTORS, type Doctor } from "@/data/doctors";
import { INITIAL_SLOTS, type TimeSlot } from "@/data/slots";
import { N8N_WEBHOOK_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Star,
  Clock,
  CheckCircle2,
  Loader2,
  CalendarCheck,
  MessageSquare,
  Smartphone,
  Copy,
  Home,
} from "lucide-react";
import { toast } from "sonner";

// ── Step indicator ────────────────────────────────────────
const STEPS = ["Select Doctor", "Choose Slot", "Your Details", "Confirm"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                i < current
                  ? "text-white border-transparent"
                  : i === current
                  ? "text-white border-transparent"
                  : "bg-white text-gray-400 border-gray-200"
              }`}
              style={
                i <= current
                  ? { backgroundColor: i < current ? "#546B41" : "#8F9D81" }
                  : {}
              }
            >
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`mt-1 text-xs font-medium hidden sm:block ${
                i === current ? "text-gray-800" : i < current ? "text-green-700" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-1 transition-all ${
                i < current ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Doctor card ───────────────────────────────────────────
function DoctorCard({
  doctor,
  selected,
  onSelect,
}: {
  doctor: Doctor;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={() => doctor.available && onSelect()}
      disabled={!doctor.available}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        !doctor.available
          ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50"
          : selected
          ? "shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
      }`}
      style={selected ? { borderColor: "#546B41", backgroundColor: "#f0f4ec" } : {}}
    >
      <div className="flex items-start gap-3">
        <img
          src={doctor.avatarUrl}
          alt={doctor.name}
          className="w-12 h-12 rounded-full border-2 flex-shrink-0"
          style={{ borderColor: selected ? "#546B41" : "#e5e7eb" }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-heading font-bold text-gray-900 text-sm leading-tight">
              {doctor.name}
            </p>
            {!doctor.available && (
              <Badge variant="secondary" className="text-xs flex-shrink-0">
                Unavailable
              </Badge>
            )}
            {selected && (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#546B41" }} />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-tight">{doctor.specialty}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
              <Star className="w-3 h-3 fill-current" />
              {doctor.rating}
            </span>
            <span className="text-xs text-gray-400">{doctor.experience} yrs exp.</span>
            <span className="text-xs text-gray-400">{doctor.patientsToday} pts today</span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Slot button ───────────────────────────────────────────
function SlotButton({
  slot,
  selected,
  onSelect,
}: {
  slot: TimeSlot;
  selected: boolean;
  onSelect: () => void;
}) {
  const isOpen = slot.status === "Open";
  return (
    <button
      onClick={() => isOpen && onSelect()}
      disabled={!isOpen}
      className={`px-3 py-2.5 rounded-lg text-xs font-semibold border-2 transition-all ${
        !isOpen
          ? slot.status === "Booked"
            ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed"
            : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          : selected
          ? "text-white border-transparent shadow-sm"
          : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:shadow-sm"
      }`}
      style={selected && isOpen ? { backgroundColor: "#546B41", borderColor: "#546B41" } : {}}
    >
      {slot.displayTime}
      {!isOpen && (
        <span className="block text-xs opacity-70 font-normal">{slot.status}</span>
      )}
    </button>
  );
}

// ── Token generator ───────────────────────────────────────
function generateToken(): string {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const seq = Math.floor(1000 + Math.random() * 9000);
  return `RRDCH-${date}-${seq}`;
}

// ── Main page ─────────────────────────────────────────────
export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");

  // Selections
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Patient form
  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    complaint: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Confirmation state
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenId, setTokenId] = useState("");

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    const q = search.toLowerCase();
    return DOCTORS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q)
    );
  }, [search]);

  // Slots for selected doctor
  const doctorSlots = useMemo(
    () => INITIAL_SLOTS.filter((s) => s.doctorId === selectedDoctor?.id),
    [selectedDoctor]
  );

  // ── Validation ──────────────────────────────────────────
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.dob) errs.dob = "Date of birth is required.";
    if (!form.phone.trim() || !/^[+\d\s\-]{8,15}$/.test(form.phone))
      errs.phone = "Enter a valid phone number.";
    if (!form.complaint.trim()) errs.complaint = "Please describe your chief complaint.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Step navigation ──────────────────────────────────────
  const next = () => {
    if (step === 0 && !selectedDoctor) return;
    if (step === 1 && !selectedSlot) return;
    if (step === 2 && !validateForm()) return;
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  // ── Confirm & POST ───────────────────────────────────────
  const confirm = async () => {
    setSubmitting(true);
    const token = generateToken();
    const payload = {
      tokenId: token,
      doctor: selectedDoctor?.name,
      specialty: selectedDoctor?.specialty,
      slot: selectedSlot?.displayTime,
      date: selectedSlot?.date,
      patient: form,
    };

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Webhook not configured yet — still show success in demo mode
    }

    setTokenId(token);
    setSuccess(true);
    setSubmitting(false);
    toast.success("Appointment confirmed!", {
      description: `Token: ${token}`,
    });
  };

  // ── Success screen ────────────────────────────────────────
  if (success) {
    return (
      <DashboardLayout title="Appointment Confirmed">
        <div className="max-w-lg mx-auto mt-8">
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="h-2" style={{ backgroundColor: "#546B41" }} />
            <CardContent className="p-8 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "#f0fdf4" }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: "#546B41" }} />
              </div>
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-1">
                You're all set!
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Your appointment has been booked successfully.
              </p>

              {/* Token */}
              <div
                className="rounded-xl px-6 py-4 mb-6 border"
                style={{ backgroundColor: "#f8f9fa", borderColor: "#546B4133" }}
              >
                <p className="text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider">
                  Your Booking Token
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className="font-mono font-bold text-2xl tracking-widest"
                    style={{ color: "#546B41" }}
                  >
                    {tokenId}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(tokenId);
                      toast.success("Token copied!");
                    }}
                    className="p-1.5 rounded-md hover:bg-blue-100 text-gray-400 hover:text-blue-800 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-left mb-6">
                {[
                  { label: "Doctor", value: selectedDoctor?.name },
                  { label: "Specialty", value: selectedDoctor?.specialty },
                  { label: "Date", value: selectedSlot?.date },
                  { label: "Time", value: selectedSlot?.displayTime },
                  { label: "Patient", value: form.name },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>

              {/* SMS simulation */}
              <div
                className="rounded-xl p-4 flex items-start gap-3 mb-6 text-left"
                style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}
              >
                <Smartphone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-orange-800">SMS Confirmation Sent</p>
                  <p className="text-xs text-orange-600 mt-0.5">
                    A confirmation message has been simulated to {form.phone || "your number"}.
                    Token: {tokenId}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setStep(0);
                    setSelectedDoctor(null);
                    setSelectedSlot(null);
                    setForm({ name: "", dob: "", phone: "", email: "", complaint: "" });
                    setSuccess(false);
                    setTokenId("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Book Another
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  className="flex-1 text-white border-transparent"
                  style={{ backgroundColor: "#546B41" }}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Book an Appointment">
      <div className="max-w-4xl mx-auto">
        <StepBar current={step} />

        {/* ── Step 0: Doctor Selection ─────────────────── */}
        {step === 0 && (
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="doctor-search"
                  placeholder="Search by name or specialty…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
              {selectedDoctor && (
                <Badge style={{ backgroundColor: "#546B41", color: "white" }} className="text-xs">
                  Selected: {selectedDoctor.name.split(" ").slice(-1)[0]}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  selected={selectedDoctor?.id === doctor.id}
                  onSelect={() => {
                    setSelectedDoctor(doctor);
                    setSelectedSlot(null);
                  }}
                />
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <p className="text-center text-gray-400 py-12 text-sm">
                No doctors match your search.
              </p>
            )}
          </div>
        )}

        {/* ── Step 1: Slot Selection ───────────────────── */}
        {step === 1 && selectedDoctor && (
          <div>
            <div
              className="flex items-center gap-4 p-4 rounded-xl mb-6"
              style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}
            >
              <img
                src={selectedDoctor.avatarUrl}
                alt={selectedDoctor.name}
                className="w-12 h-12 rounded-full border-2"
                style={{ borderColor: "#546B41" }}
              />
              <div>
                <p className="font-bold text-gray-900">{selectedDoctor.name}</p>
                <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
              </div>
            </div>

            <h3 className="font-heading font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "#546B41" }} />
              Available Slots for Today
            </h3>

            {/* Legend */}
            <div className="flex gap-4 mb-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-green-700 bg-white inline-block" />
                Open
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-100 border border-red-200 inline-block" />
                Booked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200 inline-block" />
                Busy
              </span>
            </div>

            {/* AM slots */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Morning
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {doctorSlots
                  .filter((s) => parseInt(s.time) < 12)
                  .map((slot) => (
                    <SlotButton
                      key={slot.id}
                      slot={slot}
                      selected={selectedSlot?.id === slot.id}
                      onSelect={() => setSelectedSlot(slot)}
                    />
                  ))}
              </div>
            </div>

            {/* PM slots */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Afternoon
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {doctorSlots
                  .filter((s) => parseInt(s.time) >= 12)
                  .map((slot) => (
                    <SlotButton
                      key={slot.id}
                      slot={slot}
                      selected={selectedSlot?.id === slot.id}
                      onSelect={() => setSelectedSlot(slot)}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Patient Details ──────────────────── */}
        {step === 2 && (
          <div className="max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="pt-name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="pt-name"
                  placeholder="As per Aadhaar / ID"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={formErrors.name ? "border-red-400" : ""}
                />
                {formErrors.name && (
                  <p className="text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pt-dob" className="text-sm font-medium text-gray-700">
                  Date of Birth *
                </Label>
                <Input
                  id="pt-dob"
                  type="date"
                  value={form.dob}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
                  className={formErrors.dob ? "border-red-400" : ""}
                />
                {formErrors.dob && <p className="text-xs text-red-500">{formErrors.dob}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pt-phone" className="text-sm font-medium text-gray-700">
                  Phone Number *
                </Label>
                <Input
                  id="pt-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={formErrors.phone ? "border-red-400" : ""}
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-500">{formErrors.phone}</p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="pt-email" className="text-sm font-medium text-gray-700">
                  Email Address (optional)
                </Label>
                <Input
                  id="pt-email"
                  type="email"
                  placeholder="for digital receipt"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="pt-complaint" className="text-sm font-medium text-gray-700">
                  Chief Complaint *
                </Label>
                <Textarea
                  id="pt-complaint"
                  placeholder="Briefly describe your dental concern…"
                  rows={3}
                  value={form.complaint}
                  onChange={(e) => setForm((f) => ({ ...f, complaint: e.target.value }))}
                  className={formErrors.complaint ? "border-red-400" : ""}
                />
                {formErrors.complaint && (
                  <p className="text-xs text-red-500">{formErrors.complaint}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Review & Confirm ─────────────────── */}
        {step === 3 && (
          <div className="max-w-md">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden mb-6">
              <div className="h-1" style={{ backgroundColor: "#546B41" }} />
              <CardContent className="p-6 space-y-4">
                <h3 className="font-heading font-bold text-gray-900">Appointment Summary</h3>
                <Separator />
                {[
                  { label: "Doctor", value: selectedDoctor?.name },
                  { label: "Specialty", value: selectedDoctor?.specialty },
                  { label: "Date", value: selectedSlot?.date },
                  { label: "Time", value: selectedSlot?.displayTime },
                  { label: "Patient", value: form.name },
                  { label: "Phone", value: form.phone },
                  { label: "Complaint", value: form.complaint },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-4">
                    <span className="text-gray-500 text-sm flex-shrink-0">{label}</span>
                    <span className="font-medium text-gray-900 text-sm text-right">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div
              className="p-4 rounded-xl flex items-start gap-3 mb-6"
              style={{ backgroundColor: "#f0f4ec", border: "1px solid #c9d8bd" }}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#546B41" }} />
              <p className="text-xs text-green-800">
                By confirming, an SMS notification will be simulated to your phone number. A unique
                token ID will be generated for your visit.
              </p>
            </div>

            <Button
              onClick={confirm}
              disabled={submitting}
              className="w-full h-12 font-bold text-white text-base"
              style={{ backgroundColor: "#546B41" }}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5" /> Confirm Appointment
                </span>
              )}
            </Button>
          </div>
        )}

        {/* ── Navigation buttons ───────────────────────── */}
        {step < 3 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button
              onClick={next}
              disabled={
                (step === 0 && !selectedDoctor) || (step === 1 && !selectedSlot)
              }
              className="flex items-center gap-2 text-white"
              style={{ backgroundColor: "#546B41" }}
            >
              {step === 2 ? "Review" : "Continue"} <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
