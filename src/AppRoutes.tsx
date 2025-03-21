import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import Vacancies from "./pages/Vacancies";
import VacancyDetail from "./pages/VacancyDetail";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/account" element={<Account />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/vacancy/:id" element={<VacancyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
