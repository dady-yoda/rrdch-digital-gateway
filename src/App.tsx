import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingCTA from "@/components/FloatingCTA";

// Public pages
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import EsiPage from "./pages/EsiPage.tsx";
import AccreditationPage from "./pages/AccreditationPage.tsx";
import NaacPage from "./pages/NaacPage.tsx";
import NirfPage from "./pages/NirfPage.tsx";
import DciPage from "./pages/DciPage.tsx";
import RecognitionsPage from "./pages/RecognitionsPage.tsx";
import CommitteePage from "./pages/CommitteePage.tsx";
import AntiRaggingPage from "./pages/AntiRaggingPage.tsx";
import SchedulePage from "./pages/SchedulePage.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import TimetablePage from "./pages/TimetablePage.tsx";
import NewsletterPage from "./pages/NewsletterPage.tsx";
import FeedbackPage from "./pages/FeedbackPage.tsx";
import CareerPage from "./pages/CareerPage.tsx";
import CircularsPage from "./pages/CircularsPage.tsx";
import FeeTermsPage from "./pages/FeeTermsPage.tsx";
import BrochurePage from "./pages/BrochurePage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import NewsDetailPage from "./pages/NewsDetailPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import ImplantologyCoursePage from "./pages/ImplantologyCoursePage.tsx";
import MfdsCoursePage from "./pages/MfdsCoursePage.tsx";
import BdsPage from "./pages/BdsPage.tsx";
import MdsPage from "./pages/MdsPage.tsx";
import PhdPage from "./pages/PhdPage.tsx";
import DepartmentPage from "./pages/DepartmentPage.tsx";

// DMS pages
import LoginPage from "./pages/LoginPage.tsx";
import BookingPage from "./pages/patient/BookingPage.tsx";
import DoctorSchedulePage from "./pages/doctor/SchedulePage.tsx";
import AdminManagementPage from "./pages/admin/ManagementPage.tsx";

const queryClient = new QueryClient();

const App = () => {
  // Only show the loading screen once per browser session
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem("rrdch_loaded") === "1");

  const handleLoadComplete = () => {
    sessionStorage.setItem("rrdch_loaded", "1");
    setLoaded(true);
  };

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" attribute="class">
            <TooltipProvider>
              <Toaster />
              <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <ScrollToTop />
                <FloatingCTA />
                <Routes>
                  {/* ── Public ── */}
                  <Route path="/" element={<Index />} />
                  <Route path="/esi" element={<EsiPage />} />
                  <Route path="/accreditation" element={<AccreditationPage />} />
                  <Route path="/accreditation/naac" element={<NaacPage />} />
                  <Route path="/accreditation/nirf" element={<NirfPage />} />
                  <Route path="/dci" element={<DciPage />} />
                  <Route path="/recognitions" element={<RecognitionsPage />} />
                  <Route path="/committee" element={<CommitteePage />} />
                  <Route path="/committee/anti-ragging" element={<AntiRaggingPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/schedule/calendar" element={<CalendarPage />} />
                  <Route path="/schedule/timetable" element={<TimetablePage />} />
                  <Route path="/newsletter" element={<NewsletterPage />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
                  <Route path="/career" element={<CareerPage />} />
                  <Route path="/circulars" element={<CircularsPage />} />
                  <Route path="/fee-terms" element={<FeeTermsPage />} />
                  <Route path="/brochure" element={<BrochurePage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/news/:slug" element={<NewsDetailPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/implantology-course" element={<ImplantologyCoursePage />} />
                  <Route path="/mfds-course" element={<MfdsCoursePage />} />
                  <Route path="/course/bds" element={<BdsPage />} />
                  <Route path="/course/mds" element={<MdsPage />} />
                  <Route path="/course/phd" element={<PhdPage />} />
                  <Route path="/department/:id" element={<DepartmentPage />} />

                    {/* ── DMS Auth ── */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* ── Patient portal ── */}
                    <Route
                      path="/patient/booking"
                      element={
                        <ProtectedRoute allowedRoles={["patient"]}>
                          <BookingPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* ── Doctor portal ── */}
                    <Route
                      path="/doctor/schedule"
                      element={
                        <ProtectedRoute allowedRoles={["doctor"]}>
                          <DoctorSchedulePage />
                        </ProtectedRoute>
                      }
                    />

                    {/* ── Admin portal ── */}
                    <Route
                      path="/admin/management"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <AdminManagementPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* ── Catch-all ── */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AuthProvider>
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
