import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { appStorageService } from "../../../utils/services/storage/Storage";
import { config } from "../../../utils/config/Config";
import { Loader } from "../../common/Loader/Loader";

export const Authorized = (props) => {
  const userDetails = appStorageService.local.get(config.appName);
  if (!userDetails) {
    return <Navigate to={"/auth"} replace />;
  }

  return (
    props.children ?? (
      <React.Fragment>
        <div className="min-h-screen" style={{ background: "#f9fafb" }}>
          <Outlet />
        </div>
      </React.Fragment>
    )
  );
};
