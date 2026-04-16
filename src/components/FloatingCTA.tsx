import { Link, useLocation } from "react-router-dom";
import { CalendarCheck } from "lucide-react";

export default function FloatingCTA() {
  const location = useLocation();
  
  // Hide the floating button on DMS specific routes
  const hiddenRoutes = ["/login", "/patient", "/doctor", "/admin"];
  if (hiddenRoutes.some((route) => location.pathname.startsWith(route))) {
    return null;
  }

  return (
    <Link
      to="/login"
      className="fixed bottom-6 right-6 z-[999] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-bold text-sm text-white shadow-2xl hover:opacity-90 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
      style={{
        backgroundColor: "#546B41",
        boxShadow: "0 8px 32px rgba(84,107,65,0.45)",
      }}
    >
      <CalendarCheck className="w-5 h-5" />
      Book Appointment
    </Link>
  );
}
