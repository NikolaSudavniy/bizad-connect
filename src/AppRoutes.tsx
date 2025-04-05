
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Vacancies from "./pages/Vacancies";
import VacancyDetail from "./pages/VacancyDetail";
import CompanyDetail from "./pages/CompanyDetail";
import { LocationProvider } from "./contexts/LocationContext";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <LocationProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/account" element={<Account />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/vacancy/:id" element={<VacancyDetail />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocationProvider>
    </>
  );
};

export default AppRoutes;
