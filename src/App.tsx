import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Internal pages */}
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
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
