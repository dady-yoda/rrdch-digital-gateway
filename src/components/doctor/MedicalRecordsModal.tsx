import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { FolderOpen } from "lucide-react";
import { toast } from "sonner";

interface MedicalRecord {
  id: string;
  patient_id: string;
  record_name: string;
  ipfs_hash: string;
  is_verified: boolean;
  created_at: string;
}

export function MedicalRecordsModal({ patientId, patientName }: { patientId: string; patientName: string }) {
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [newRecordName, setNewRecordName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("medical_records")
      .select("*")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch records");
      console.error(error);
    } else {
      setRecords(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      fetchRecords();
    }
  }, [open, patientId]);

  const handleSave = async () => {
    if (!newRecordName || !file) {
      toast.error("Please provide a name and select a file.");
      return;
    }

    setUploading(true);
    // Placeholder ipfs_hash as requested
    const newRecord = {
      patient_id: patientId,
      record_name: newRecordName,
      ipfs_hash: "ipfs://pending_upload",
      is_verified: false,
    };

    const { error } = await supabase.from("medical_records").insert([newRecord]);

    if (error) {
      toast.error("Failed to add new record.");
      console.error(error);
    } else {
      toast.success("Record added successfully.");
      setNewRecordName("");
      setFile(null);
      fetchRecords();
    }
    setUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          Records
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Medical Records - {patientName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Add New Record Section */}
          <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
            <h3 className="font-semibold text-sm">Add New Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="recordName">Record Name</Label>
                <Input 
                  id="recordName" 
                  value={newRecordName} 
                  onChange={(e) => setNewRecordName(e.target.value)} 
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
              <Button onClick={handleSave} disabled={uploading} className="bg-[#546B41] hover:bg-[#435733] text-white">
                {uploading ? "Saving..." : "Save Record"}
              </Button>
            </div>
          </div>

          {/* Records List Table */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Existing Records</h3>
            {loading ? (
              <p className="text-sm text-gray-500">Loading records...</p>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Record Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-gray-400 py-4">
                          No records found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.record_name}</TableCell>
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
