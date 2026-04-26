import DashboardLayout from "@/components/DashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout title="My Profile">
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-500 max-w-md">
          This page is a placeholder. In the future, you will be able to update your personal details, change your password, and manage your communication preferences here.
        </p>
      </div>
    </DashboardLayout>
  );
}
