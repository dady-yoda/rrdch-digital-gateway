import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { MOCK_APPOINTMENTS } from "@/data/appointments";
import { INITIAL_SLOTS, type TimeSlot } from "@/data/slots";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Clock,
  CalendarDays,
  Users,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { MedicalRecordsModal } from "@/components/doctor/MedicalRecordsModal";

// Doctor's ID in mock data = dr-003 (Dr. Anitha Rao, Orthodontics)
const DOCTOR_ID = "dr-003";

export default function DoctorSchedulePage() {
  const { user } = useAuth();

  // Use slots from mock data for this doctor
  const [slots, setSlots] = useState<TimeSlot[]>(() =>
    INITIAL_SLOTS.filter((s) => s.doctorId === DOCTOR_ID)
  );

  // Today's appointments for this doctor
  const todayAppts = useMemo(
    () => MOCK_APPOINTMENTS.filter((a) => a.doctorId === DOCTOR_ID),
    []
  );

  // Add slot modal state
  const [addOpen, setAddOpen] = useState(false);
  const [newTime, setNewTime] = useState("09:00");

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Toggle a slot between Open ↔ Busy
  const toggleSlot = (slotId: string) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId
          ? { ...s, status: s.status === "Open" ? "Busy" : s.status === "Busy" ? "Open" : s.status }
          : s
      )
    );
  };

  // Add a new slot
  const addSlot = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    const existing = slots.find((s) => s.time === newTime);
    if (existing) {
      toast.error("A slot at that time already exists.");
      return;
    }
    const [h, m] = newTime.split(":").map(Number);
    const displayTime = `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
    const newSlot: TimeSlot = {
      id: `slot-${DOCTOR_ID}-add-${Date.now()}`,
      doctorId: DOCTOR_ID,
      date: todayStr,
      time: newTime,
      displayTime,
      status: "Open",
    };
    setSlots((prev) => [...prev, newSlot].sort((a, b) => a.time.localeCompare(b.time)));
    toast.success(`Slot ${displayTime} added successfully.`);
    setAddOpen(false);
  };

  // Stats
  const totalPts = todayAppts.length;
  const completedPts = todayAppts.filter((a) => a.status === "Completed").length;
  const pendingPts = todayAppts.filter((a) => a.status === "Confirmed").length;
  const openSlots = slots.filter((s) => s.status === "Open").length;

  const statusBadge = (status: string) => {
    if (status === "Completed") return <Badge className="bg-green-100 text-green-700 border-green-200">{status}</Badge>;
    if (status === "Confirmed") return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>;
    if (status === "Cancelled") return <Badge className="bg-red-100 text-red-700 border-red-200">{status}</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <DashboardLayout title="My Dashboard">
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="font-heading font-bold text-gray-900 text-xl">
          Good {new Date().getHours() < 12 ? "Morning" : "Afternoon"},{" "}
          {user?.name ?? "Doctor"} 👋
        </h2>
        <p className="text-gray-500 text-sm mt-0.5">{today}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Appointments", value: totalPts, icon: Users, color: "#546B41" },
          { label: "Completed", value: completedPts, icon: CheckCircle2, color: "#7A8C63" },
          { label: "Pending", value: pendingPts, icon: AlertCircle, color: "#99AD7A" },
          { label: "Open Slots", value: openSlots, icon: Clock, color: "#b45309" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <CalendarDays className="w-3.5 h-3.5" />
            Today's Appointments
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Manage Availability
          </TabsTrigger>
        </TabsList>

        {/* ── Appointments tab ── */}
        <TabsContent value="appointments">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-base text-gray-800">
                Today's Patient List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden sm:table-cell">Chief Complaint</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAppts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                          No appointments today.
                        </TableCell>
                      </TableRow>
                    ) : (
                      todayAppts.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell className="font-mono text-sm font-medium text-gray-700">
                            {apt.displayTime}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{apt.patientName}</p>
                              <p className="text-xs text-gray-400">{apt.patientPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-gray-600 max-w-xs">
                            {apt.complaint}
                          </TableCell>
                          <TableCell>{statusBadge(apt.status)}</TableCell>
                          <TableCell className="text-right flex justify-end gap-2">
                            <MedicalRecordsModal patientId={apt.id} patientName={apt.patientName} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Availability tab ── */}
        <TabsContent value="availability">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-base text-gray-800">
                Today's Slot Schedule
              </CardTitle>
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="text-white flex items-center gap-2"
                    style={{ backgroundColor: "#546B41" }}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Slot
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Add New Time Slot</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="new-time">Time</Label>
                      <Input
                        id="new-time"
                        type="time"
                        value={newTime}
                        min="08:00"
                        max="18:00"
                        onChange={(e) => setNewTime(e.target.value)}
                      />
                    </div>
                    <div
                      className="p-3 rounded-lg text-xs"
                      style={{ backgroundColor: "#f0f4ec", color: "#546B41" }}
                    >
                      Slot will be added for today and marked as{" "}
                      <span className="font-bold">Open</span>.
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => setAddOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 text-white"
                        style={{ backgroundColor: "#546B41" }}
                        onClick={addSlot}
                      >
                        Add Slot
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {/* Legend */}
              <div className="flex gap-4 mb-4 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                  Open
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  Booked (cannot change)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />
                  Busy
                </span>
              </div>

              <div className="space-y-2">
                {[...slots].sort((a, b) => a.time.localeCompare(b.time)).map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                    style={{
                      backgroundColor:
                        slot.status === "Open"
                          ? "#f0fdf4"
                          : slot.status === "Booked"
                          ? "#fef2f2"
                          : "#f9fafb",
                      borderColor:
                        slot.status === "Open"
                          ? "#bbf7d0"
                          : slot.status === "Booked"
                          ? "#fecaca"
                          : "#e5e7eb",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Clock
                        className="w-4 h-4 flex-shrink-0"
                        style={{
                          color:
                            slot.status === "Open"
                              ? "#16a34a"
                              : slot.status === "Booked"
                              ? "#dc2626"
                              : "#9ca3af",
                        }}
                      />
                      <span className="font-mono font-semibold text-sm text-gray-800">
                        {slot.displayTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color:
                            slot.status === "Open"
                              ? "#16a34a"
                              : slot.status === "Booked"
                              ? "#dc2626"
                              : "#9ca3af",
                        }}
                      >
                        {slot.status}
                      </span>
                      {slot.status !== "Booked" && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Busy</span>
                          <Switch
                            checked={slot.status === "Busy"}
                            onCheckedChange={() => toggleSlot(slot.id)}
                          />
                        </div>
                      )}
                      {slot.status === "Booked" && (
                        <Badge className="text-xs bg-red-100 text-red-600 border-red-200">
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
