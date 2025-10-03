import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Tables from "./Visits/Tables";
import { routes } from "./Network/routes";
import NotFoundPage from "./Components/NotFoundPage";
import GeneralLayout from "./Components/GeneralLayout/GeneralLayout";



function AppEntry() {
  return (
    <BrowserRouter>
      <Routes>

        {/* General layout */}
        <Route path="/" element={<GeneralLayout />}>
          <Route index element={<Navigate to={routes.dashboard.path} />} />
          <Route path={routes.dashboard.path} element={<Dashboard />} />
          <Route path={routes.tables.path} element={<Tables />} />
          <Route path={routes.catchAll} element={<NotFoundPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}



export default AppEntry;