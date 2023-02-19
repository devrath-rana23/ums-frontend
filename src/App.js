import { useState } from "react";
import { Router } from "./Router";
import { appStorageService } from "./utils/services/storage/Storage";
import { config } from "./utils/config/Config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommonLoader } from "./components/common/Loader/Loader";
import { AuthContext } from "./context";

export const App = () => {
  const userDetails = appStorageService.local.get(config.appName);
  const [user, setUser] = useState(
    userDetails.access_token ? userDetails : null
  );
  const authContextValue = { user, setUser };

  return (
    <AuthContext.Provider value={authContextValue}>
      <CommonLoader.Component />
      <Router />
      <ToastContainer />
    </AuthContext.Provider>
  );
};
