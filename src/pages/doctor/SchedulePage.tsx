import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
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
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { MedicalRecordsModal } from "@/components/doctor/MedicalRecordsModal";
import {
  fetchAppointments,
  fetchSlots,
  upsertSlot,
  updateSlotStatus,
  logAudit,
  DbAppointment,
  DbSlot,
  useRealtimeUpdate
} from "@/lib/supabase-queries";

export default function DoctorSchedulePage() {
  const { user } = useAuth();
  
  const [appointments, setAppointments] = useState<DbAppointment[]>([]);
  const [slots, setSlots] = useState<DbSlot[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Add slot modal state
  const [addOpen, setAddOpen] = useState(false);
  const [newTime, setNewTime] = useState("09:00");
  const [isAdding, setIsAdding] = useState(false);

  const todayDateStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD local format
  
  const todayDisplay = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const loadData = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      // Fetch only for the logged-in doctor, for today
      const [apptsData, slotsData] = await Promise.all([
        fetchAppointments({ doctorId: user.id, date: todayDateStr }),
        fetchSlots(user.id, todayDateStr)
      ]);
      setAppointments(apptsData);
      setSlots(slotsData);
    } catch (err) {
      console.error("Error fetching doctor schedule data:", err);
      toast.error("Failed to load schedule data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.id, todayDateStr]);

  useRealtimeUpdate(loadData);

  // Toggle a slot between Open ↔ Busy
  const toggleSlot = async (slot: DbSlot) => {
    try {
      const newStatus = slot.status === "Open" ? "Busy" : "Open";
      // Optimistic update
      setSlots((prev) =>
        prev.map((s) => (s.id === slot.id ? { ...s, status: newStatus } : s))
      );
      
      await updateSlotStatus(slot.id, newStatus);
      
      await logAudit({
        admin_id: user?.id || "system",
        action: `Doctor updated slot status to ${newStatus}`,
        details: { slot_id: slot.id, time: slot.time }
      });
      toast.success(`Slot marked as ${newStatus}`);
    } catch (err) {
      console.error("Failed to toggle slot:", err);
      toast.error("Failed to update slot status");
      // Revert optimistic update
      setSlots((prev) =>
        prev.map((s) => (s.id === slot.id ? { ...s, status: slot.status } : s))
      );
    }
  };

  // Add a new slot
  const addSlot = async () => {
    if (!user?.id) return;
    
    const existing = slots.find((s) => s.time === newTime);
    if (existing) {
      toast.error("A slot at that time already exists.");
      return;
    }
    
    setIsAdding(true);
    try {
      const [h, m] = newTime.split(":").map(Number);
      const displayTime = `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
      
      const savedSlot = await upsertSlot({
        doctor_id: user.id,
        date: todayDateStr,
        time: newTime,
        display_time: displayTime,
        status: "Open",
      });
      
      setSlots((prev) => [...prev, savedSlot].sort((a, b) => a.time.localeCompare(b.time)));
      
      await logAudit({
        admin_id: user.id,
        action: `Doctor added new slot at ${displayTime}`,
        details: { slot_id: savedSlot.id }
      });
      
      toast.success(`Slot ${displayTime} added successfully.`);
      setAddOpen(false);
    } catch (err) {
      console.error("Failed to add slot:", err);
      toast.error("Failed to add slot. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  if (!user?.id) {
    return (
      <DashboardLayout title="My Dashboard">
        <div className="flex flex-col items-center justify-center h-64 border rounded-xl border-dashed bg-gray-50/50">
          <AlertCircle className="w-10 h-10 text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Profile Not Linked</h2>
          <p className="text-gray-500 mt-2">You must be logged in as a doctor to view this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Stats
  const totalPts = appointments.length;
  const completedPts = appointments.filter((a) => a.status === "Completed").length;
  const pendingPts = appointments.filter((a) => a.status === "Confirmed").length;
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
        <p className="text-gray-500 text-sm mt-0.5">{todayDisplay}</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-gray-500">Loading your schedule...</p>
        </div>
      ) : (
        <>
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
                        {appointments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                              No appointments today.
                            </TableCell>
                          </TableRow>
                        ) : (
                          appointments.map((apt) => (
                            <TableRow key={apt.id}>
                              <TableCell className="font-mono text-sm font-medium text-gray-700">
                                {apt.display_time}
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{apt.patient_name}</p>
                                  <p className="text-xs text-gray-400">{apt.patient_phone}</p>
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell text-sm text-gray-600 max-w-xs">
                                {apt.complaint}
                              </TableCell>
                              <TableCell>{statusBadge(apt.status)}</TableCell>
                              <TableCell className="text-right flex justify-end gap-2">
                                <MedicalRecordsModal patientId={apt.patient_id || apt.id} patientName={apt.patient_name || ""} />
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
                          <Button variant="outline" className="flex-1" onClick={() => setAddOpen(false)} disabled={isAdding}>
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 text-white"
                            style={{ backgroundColor: "#546B41" }}
                            onClick={addSlot}
                            disabled={isAdding}
                          >
                            {isAdding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
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
                    {slots.length === 0 ? (
                       <p className="text-center text-gray-400 py-8">No slots configured for today.</p>
                    ) : (
                      [...slots].sort((a, b) => a.time.localeCompare(b.time)).map((slot) => (
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
                              {slot.display_time}
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
                                  onCheckedChange={() => toggleSlot(slot)}
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
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </DashboardLayout>
  );
}
