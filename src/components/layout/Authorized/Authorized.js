import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../../common/header";
import { isAuthenticated } from "../../../utils/Utils";

export const Authorized = (props) => {
  if (!isAuthenticated()) {
    return <Navigate to={"/auth"} replace />;
  }

  return (
    props.children ?? (
      <React.Fragment>
        <div className="min-h-screen" style={{ background: "#f9fafb" }}>
          <Header />
          <Outlet />
        </div>
      </React.Fragment>
    )
  );
};
