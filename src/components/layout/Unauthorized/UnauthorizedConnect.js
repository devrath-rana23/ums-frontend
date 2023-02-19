import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../../utils/Utils";
import { Unauthorized } from "./Unauthorized";

export const UnauthorizedConnect = () => {
  if (isAuthenticated()) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <Unauthorized />;
};
