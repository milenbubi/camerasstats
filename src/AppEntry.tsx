import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { routes } from "./Network/routes";
import NotFoundPage from "./Components/NotFoundPage";
import VisitsStatsPage from "./pages/Visits/VisitStatsPage";
import GeneralLayout from "./Components/GeneralLayout/GeneralLayout";



function AppEntry() {
  return (
    <Routes>

      {/* General layout */}
      <Route path="/" element={<GeneralLayout />}>
        <Route index element={<Navigate to={routes.dashboard.path} />} />
        <Route path={routes.dashboard.path} element={<Dashboard />} />
        <Route path={routes.visits.path} element={<VisitsStatsPage />} />
        <Route path={routes.catchAll} element={<NotFoundPage />} />
      </Route>

    </Routes>
  );
}



export default AppEntry;