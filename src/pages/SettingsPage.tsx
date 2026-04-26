import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Save, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const { user } = useAuth();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [role, setRole] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setName(data.full_name || "");
        setPhone(data.phone || "");
        setAvatarUrl(data.avatar_url || "");
        setRole(data.role || "");
      }
    } catch (err: any) {
      console.error("Error loading profile:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setSaving(true);

    try {
      if (!user?.id) throw new Error("Not logged in");

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          phone: phone,
          avatar_url: avatarUrl,
        })
        .eq('id', user.id);

      if (error) throw error;

      setSuccessMsg("Profile updated successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Account Settings">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-heading text-gray-900">Personal Information</h2>
          <p className="text-gray-500 text-sm mt-1">
            Update your profile details and preferences.
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
            <CardTitle className="text-lg font-heading">Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-2 border-gray-100">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback className="bg-gray-100 text-gray-500">
                      <UserIcon className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input
                      id="avatar"
                      type="url"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://example.com/my-photo.jpg"
                    />
                    <p className="text-xs text-gray-400">Provide a direct link to an image.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="role" className="text-gray-500">Account Role</Label>
                    <Input
                      id="role"
                      value={role}
                      disabled
                      className="bg-gray-50 text-gray-500 cursor-not-allowed uppercase text-xs font-semibold"
                    />
                    <p className="text-xs text-red-400/80 mt-1">Role cannot be changed.</p>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                    {successMsg}
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="text-white"
                    style={{ backgroundColor: "#546B41" }}
                  >
                    {saving ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Changes
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
