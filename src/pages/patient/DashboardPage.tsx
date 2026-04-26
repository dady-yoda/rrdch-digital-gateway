import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ShieldCheck, Clock, FileText, Lock, Database } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface MedicalRecord {
  id: string;
  patient_id: string;
  record_name: string;
  ipfs_hash: string;
  is_verified: boolean;
  blockchain_tx?: string;
  created_at: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("medical_records")
      .select("*")
      .eq("patient_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch medical records");
      console.error(error);
    } else {
      setRecords(data || []);
    }
    setLoading(false);
  };

  return (
    <DashboardLayout title="Secure Health Vault">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 shadow-2xl border border-slate-700/50">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none">
            <ShieldCheck className="w-96 h-96 text-emerald-400" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" />
                End-to-End Encrypted
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Hello, {user?.name?.split(" ")[0]}!
              </h2>
              <p className="text-slate-300 max-w-xl text-lg leading-relaxed">
                Welcome to your <strong className="text-emerald-400 font-semibold">Secure Health Vault</strong>. 
                All your medical records are cryptographically anchored and stored with uncompromising security.
              </p>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-emerald-700" />
            <h3 className="text-2xl font-semibold text-slate-800 tracking-tight">Your Medical Records</h3>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-64 border-slate-200 shadow-sm">
                  <CardHeader className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-1/3 rounded-full" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300 shadow-sm">
              <FileText className="w-16 h-16 text-slate-300 mb-4" />
              <h3 className="text-xl font-medium text-slate-700">No Records Found</h3>
              <p className="text-slate-500 mt-2 text-center max-w-md">
                Your vault is currently empty. Medical records uploaded by your doctor will securely appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {records.map((record) => (
                <Card 
                  key={record.id} 
                  className="group relative overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 bg-white"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1.5">
                        <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {record.record_name}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-slate-500">
                          {new Date(record.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </CardDescription>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    {record.blockchain_tx ? (
                      <Badge className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 px-3 py-1 text-xs font-semibold flex w-max items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Blockchain Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 px-3 py-1 text-xs font-semibold flex w-max items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Anchor
                      </Badge>
                    )}
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full justify-between group-hover:border-emerald-200 group-hover:bg-emerald-50/50 transition-colors">
                          <span className="font-medium text-slate-700 group-hover:text-emerald-800">View Receipt</span>
                          <Lock className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-800 text-slate-100">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-xl text-white">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" />
                            Cryptographic Receipt
                          </DialogTitle>
                          <DialogDescription className="text-slate-400">
                            Security details and hashes for {record.record_name}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                              IPFS Hash (Decentralized Storage)
                            </label>
                            <div className="bg-slate-950 p-3 rounded-md border border-slate-800 font-mono text-sm break-all text-slate-300">
                              {record.ipfs_hash || "Not assigned"}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                              Blockchain Transaction ID
                            </label>
                            {record.blockchain_tx ? (
                              <div className="bg-slate-950 p-3 rounded-md border border-slate-800 font-mono text-sm break-all text-emerald-300">
                                {record.blockchain_tx}
                              </div>
                            ) : (
                              <div className="bg-slate-800/50 p-3 rounded-md border border-slate-700/50 text-sm text-slate-400 flex items-center gap-2 italic">
                                <Clock className="w-4 h-4" />
                                Waiting for periodic network anchor
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
