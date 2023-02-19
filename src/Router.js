import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./components/views/Auth";
import { AuthCallback } from "./components/views/AuthCallback";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Unauthorized } from "./components/layout/Unauthorized";
import { Authorized } from "./components/layout/Authorized";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { User } from "./pages/user/User";

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Unauthorized />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/google/callback" element={<AuthCallback />} />
        </Route>
        <Route element={<Authorized />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
