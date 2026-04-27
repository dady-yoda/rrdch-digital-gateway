import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderOpen, FileText, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { fetchMedicalRecords, insertMedicalRecord, useRealtimeUpdate, MedicalRecord } from "@/lib/supabase-queries";

export function MedicalRecordsModal({ patientId, patientName }: { patientId: string; patientName: string }) {
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Shared state
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");

  // Form state: Scan
  const [scanName, setScanName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Form state: Prescription
  const [prescriptionTitle, setPrescriptionTitle] = useState("");
  const [prescriptionText, setPrescriptionText] = useState("");

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMedicalRecords(patientId);
      setRecords(data || []);
    } catch (error) {
      toast.error("Failed to fetch records");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    if (open) fetchRecords();
  }, [open, fetchRecords]);

  useRealtimeUpdate(() => {
    if (open) fetchRecords();
  });

  const handleSaveScan = async () => {
    if (!scanName || !file) {
      toast.error("Please provide a name and select a file.");
      return;
    }
    setUploading(true);
    try {
      await insertMedicalRecord({
        patient_id: patientId,
        record_name: scanName,
        type: "scan",
        ipfs_hash: "ipfs://mock_" + file.name,
        is_verified: false,
      });
      toast.success("Scan uploaded successfully.");
      setScanName("");
      setFile(null);
      fetchRecords();
    } catch (error) {
      toast.error("Failed to add scan.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSavePrescription = async () => {
    if (!prescriptionTitle || !prescriptionText) {
      toast.error("Please provide a title and prescription details.");
      return;
    }
    setUploading(true);
    try {
      await insertMedicalRecord({
        patient_id: patientId,
        record_name: prescriptionTitle,
        type: "prescription",
        prescription_text: prescriptionText,
        is_verified: true, // Issued directly by doctor
      });
      toast.success("Prescription issued successfully.");
      setPrescriptionTitle("");
      setPrescriptionText("");
      fetchRecords();
    } catch (error) {
      toast.error("Failed to issue prescription.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          Portal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Portal - {patientName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Tabs for Add New Record */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scan" className="flex gap-2 items-center">
                <ImageIcon className="w-4 h-4" /> Upload Scan
              </TabsTrigger>
              <TabsTrigger value="prescription" className="flex gap-2 items-center">
                <FileText className="w-4 h-4" /> Issue Virtual Prescription
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="scan" className="p-4 border rounded-lg bg-gray-50 mt-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="scanName">Scan Title</Label>
                  <Input 
                    id="scanName" 
                    value={scanName} 
                    onChange={(e) => setScanName(e.target.value)} 
                    placeholder="e.g. X-Ray Scan"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="recordFile">File</Label>
                  <Input 
                    id="recordFile" 
                    type="file" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveScan} disabled={uploading} className="bg-[#546B41] hover:bg-[#435733] text-white">
                  {uploading ? "Uploading..." : "Upload Scan"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="prescription" className="p-4 border rounded-lg bg-emerald-50/50 border-emerald-100 mt-2 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="prescriptionTitle">Prescription Title</Label>
                <Input 
                  id="prescriptionTitle" 
                  value={prescriptionTitle} 
                  onChange={(e) => setPrescriptionTitle(e.target.value)} 
                  placeholder="e.g. Antibiotics & Painkillers"
                  className="bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="prescriptionText">Medications & Instructions</Label>
                <Textarea 
                  id="prescriptionText" 
                  value={prescriptionText} 
                  onChange={(e) => setPrescriptionText(e.target.value)} 
                  placeholder="Rx..."
                  rows={4}
                  className="bg-white resize-none"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSavePrescription} disabled={uploading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  {uploading ? "Issuing..." : "Issue Prescription"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Records List Table */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Patient History</h3>
            {loading ? (
              <p className="text-sm text-gray-500">Loading records...</p>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Record Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-400 py-4">
                          No records found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.record_name}</TableCell>
                          <TableCell>
                            {record.type === "prescription" ? (
                              <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                                <FileText className="w-3.5 h-3.5" /> Prescription
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold">
                                <ImageIcon className="w-3.5 h-3.5" /> Scan
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(record.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {record.is_verified ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
