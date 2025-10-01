import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { routes } from "./Network/routes";
import VisitsTable from "./Visits/VisitsTable";
import NotFoundPage from "./Components/NotFoundPage";
import GeneralLayout from "./Components/GeneralLayout/GeneralLayout";



function AppEntry() {
  return (
    <BrowserRouter>
      <Routes>

        {/* General layout */}
        <Route path="/" element={<GeneralLayout />}>
          <Route index element={<Navigate to={routes.home.path} />} />
          <Route path={routes.home.path} element={<Home />} />
          <Route path={routes.visitsstatistics.path} element={<VisitsTable />} />
          <Route path={routes.catchAll} element={<NotFoundPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}



export default AppEntry;