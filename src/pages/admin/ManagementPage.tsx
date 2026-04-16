import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { DOCTORS, type Doctor } from "@/data/doctors";
import { MOCK_APPOINTMENTS, type Appointment } from "@/data/appointments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  Users,
  CalendarDays,
  Stethoscope,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

const DEPARTMENTS = [
  "Oral Medicine & Radiology",
  "Oral & Maxillofacial Surgery",
  "Orthodontics",
  "Prosthodontics",
  "Periodontics",
  "Conservative Dentistry",
  "Pedodontics",
  "Oral Pathology",
  "Public Health Dentistry",
];

type DoctorFormData = {
  name: string;
  specialty: string;
  department: string;
  qualification: string;
  experience: string;
};

const emptyForm: DoctorFormData = {
  name: "",
  specialty: "",
  department: "",
  qualification: "",
  experience: "",
};

function DoctorFormModal({
  open,
  onOpenChange,
  initial,
  onSave,
  mode,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: DoctorFormData;
  onSave: (data: DoctorFormData) => void;
  mode: "add" | "edit";
}) {
  const [form, setForm] = useState<DoctorFormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.department) e.department = "Select a department.";
    if (!form.qualification.trim()) e.qualification = "Qualification is required.";
    if (!form.experience || isNaN(Number(form.experience)))
      e.experience = "Enter valid years of experience.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    onOpenChange(false);
  };

  // Sync initial when modal opens
  useState(() => {
    setForm(initial);
    setErrors({});
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (v) { setForm(initial); setErrors({}); }
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {mode === "add" ? "Add New Doctor" : "Edit Doctor"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="doc-name" className="text-sm font-medium">Full Name</Label>
            <Input
              id="doc-name"
              placeholder='e.g. "Dr. Firstname Lastname"'
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={errors.name ? "border-red-400" : ""}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="doc-dept" className="text-sm font-medium">Department</Label>
            <Select
              value={form.department}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, department: v, specialty: v }))
              }
            >
              <SelectTrigger
                id="doc-dept"
                className={errors.department ? "border-red-400" : ""}
              >
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="doc-qual" className="text-sm font-medium">Qualification</Label>
            <Input
              id="doc-qual"
              placeholder="e.g. BDS, MDS (Orthodontics)"
              value={form.qualification}
              onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
              className={errors.qualification ? "border-red-400" : ""}
            />
            {errors.qualification && <p className="text-xs text-red-500">{errors.qualification}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="doc-exp" className="text-sm font-medium">
              Years of Experience
            </Label>
            <Input
              id="doc-exp"
              type="number"
              min={0}
              max={60}
              placeholder="e.g. 10"
              value={form.experience}
              onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
              className={errors.experience ? "border-red-400" : ""}
            />
            {errors.experience && <p className="text-xs text-red-500">{errors.experience}</p>}
          </div>

          <div className="flex gap-3 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1 text-white"
              style={{ backgroundColor: "#546B41" }}
              onClick={handleSave}
            >
              {mode === "add" ? "Add Doctor" : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminManagementPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([...DOCTORS]);
  const [appointments] = useState<Appointment[]>([...MOCK_APPOINTMENTS]);

  const [drSearch, setDrSearch] = useState("");
  const [ptSearch, setPtSearch] = useState("");

  // Modal state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Doctor | null>(null);

  // ── Filtered lists ──────────────────────────────────────
  const filteredDoctors = useMemo(() => {
    const q = drSearch.toLowerCase();
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.department.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q)
    );
  }, [doctors, drSearch]);

  const filteredAppts = useMemo(() => {
    const q = ptSearch.toLowerCase();
    return appointments.filter(
      (a) =>
        a.patientName.toLowerCase().includes(q) ||
        a.doctorName.toLowerCase().includes(q) ||
        a.tokenId.toLowerCase().includes(q) ||
        a.department.toLowerCase().includes(q)
    );
  }, [appointments, ptSearch]);

  // ── CRUD handlers ───────────────────────────────────────
  const handleAdd = (data: DoctorFormData) => {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=546B41&color=fff&size=128&rounded=true&bold=true`;
    const newDoc: Doctor = {
      id: `dr-new-${Date.now()}`,
      name: data.name,
      specialty: data.specialty || data.department,
      department: data.department,
      qualification: data.qualification,
      experience: Number(data.experience),
      avatarUrl: avatar,
      available: true,
      rating: 4.5,
      patientsToday: 0,
    };
    setDoctors((prev) => [...prev, newDoc]);
    toast.success(`${newDoc.name} added to the system.`);
  };

  const handleEdit = (data: DoctorFormData) => {
    if (!editTarget) return;
    setDoctors((prev) =>
      prev.map((d) =>
        d.id === editTarget.id
          ? {
              ...d,
              name: data.name,
              specialty: data.specialty || data.department,
              department: data.department,
              qualification: data.qualification,
              experience: Number(data.experience),
            }
          : d
      )
    );
    toast.success(`${data.name}'s record updated.`);
    setEditTarget(null);
  };

  const handleDelete = (doc: Doctor) => {
    setDoctors((prev) => prev.filter((d) => d.id !== doc.id));
    toast.success(`${doc.name} removed from the system.`);
  };

  const openEdit = (doc: Doctor) => {
    setEditTarget(doc);
    setEditOpen(true);
  };

  // ── Status badge ────────────────────────────────────────
  const statusBadge = (status: Appointment["status"]) => {
    const cfg: Record<string, { bg: string; text: string }> = {
      Confirmed: { bg: "#dbeafe", text: "#1e40af" },
      Completed: { bg: "#dcfce7", text: "#166534" },
      Cancelled: { bg: "#fee2e2", text: "#991b1b" },
      "No-Show": { bg: "#fef3c7", text: "#92400e" },
    };
    const { bg, text } = cfg[status] ?? { bg: "#f3f4f6", text: "#374151" };
    return (
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full"
        style={{ backgroundColor: bg, color: text }}
      >
        {status}
      </span>
    );
  };

  // ── Stats ───────────────────────────────────────────────
  const totalDoctors = doctors.length;
  const availDoctors = doctors.filter((d) => d.available).length;
  const totalAppts = appointments.length;
  const confirmedAppts = appointments.filter((a) => a.status === "Confirmed").length;

  return (
    <DashboardLayout title="Management Console">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Doctors", value: totalDoctors, icon: Stethoscope, color: "#546B41" },
          { label: "Available Today", value: availDoctors, icon: CheckCircle2, color: "#7A8C63" },
          { label: "Total Appointments", value: totalAppts, icon: CalendarDays, color: "#99AD7A" },
          { label: "Confirmed", value: confirmedAppts, icon: ShieldCheck, color: "#b45309" },
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

      <Tabs defaultValue="doctors">
        <TabsList className="mb-4">
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <Stethoscope className="w-3.5 h-3.5" />
            Doctor Management
          </TabsTrigger>
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5" />
            Patient Oversight
          </TabsTrigger>
        </TabsList>

        {/* ── Doctor Management ── */}
        <TabsContent value="doctors">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="font-heading text-base text-gray-800">
                  All Doctors ({filteredDoctors.length})
                </CardTitle>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <Input
                      placeholder="Search doctors…"
                      value={drSearch}
                      onChange={(e) => setDrSearch(e.target.value)}
                      className="pl-8 h-8 text-sm w-48"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setAddOpen(true)}
                    className="text-white flex items-center gap-1.5 h-8"
                    style={{ backgroundColor: "#546B41" }}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Add Doctor
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead className="hidden lg:table-cell">Qualification</TableHead>
                      <TableHead className="hidden sm:table-cell">Exp.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDoctors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                          No doctors found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDoctors.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={doc.avatarUrl}
                                alt={doc.name}
                                className="w-8 h-8 rounded-full flex-shrink-0"
                              />
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                                <p className="text-xs text-gray-400 hidden sm:block">
                                  {doc.specialty}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm text-gray-600">
                            {doc.department}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-xs text-gray-500">
                            {doc.qualification}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-gray-700">
                            {doc.experience} yrs
                          </TableCell>
                          <TableCell>
                            {doc.available ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                Available
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-500 border-gray-200 text-xs">
                                Unavailable
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-gray-500 hover:text-blue-800"
                                onClick={() => openEdit(doc)}
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-gray-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Doctor?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently remove{" "}
                                      <strong>{doc.name}</strong> from the system. This action
                                      cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(doc)}
                                      className="text-white"
                                      style={{ backgroundColor: "#546B41" }}
                                    >
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
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

        {/* ── Patient Oversight ── */}
        <TabsContent value="patients">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle className="font-heading text-base text-gray-800">
                  All Appointments ({filteredAppts.length})
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input
                    placeholder="Search by name, doctor, token…"
                    value={ptSearch}
                    onChange={(e) => setPtSearch(e.target.value)}
                    className="pl-8 h-8 text-sm w-56"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Token</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden md:table-cell">Doctor</TableHead>
                      <TableHead className="hidden lg:table-cell">Date / Time</TableHead>
                      <TableHead className="hidden xl:table-cell">Complaint</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                          No appointments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppts.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell className="hidden sm:table-cell">
                            <span className="font-mono text-xs text-gray-500">
                              {apt.tokenId}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{apt.patientName}</p>
                              <p className="text-xs text-gray-400">{apt.patientPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div>
                              <p className="text-sm text-gray-800 font-medium">{apt.doctorName}</p>
                              <p className="text-xs text-gray-400">{apt.department}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                            <div>
                              <p>{apt.date}</p>
                              <p className="text-xs text-gray-400">{apt.displayTime}</p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell text-xs text-gray-500 max-w-xs truncate">
                            {apt.complaint}
                          </TableCell>
                          <TableCell>{statusBadge(apt.status)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Doctor Modal */}
      <DoctorFormModal
        open={addOpen}
        onOpenChange={setAddOpen}
        initial={emptyForm}
        onSave={handleAdd}
        mode="add"
      />

      {/* Edit Doctor Modal */}
      {editTarget && (
        <DoctorFormModal
          open={editOpen}
          onOpenChange={(v) => {
            setEditOpen(v);
            if (!v) setEditTarget(null);
          }}
          initial={{
            name: editTarget.name,
            specialty: editTarget.specialty,
            department: editTarget.department,
            qualification: editTarget.qualification,
            experience: String(editTarget.experience),
          }}
          onSave={handleEdit}
          mode="edit"
        />
      )}
    </DashboardLayout>
  );
}
