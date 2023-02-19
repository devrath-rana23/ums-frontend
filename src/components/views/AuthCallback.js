import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../utils/config/Config";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import { appStorageService } from "../../utils/services/storage/Storage";
import { Loader } from "../common/Loader/Loader";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    const authCallbackDataRes = await apiCall(apiConstants.authCallback, {
      loader: true,
      queryParams: params,
    });
    if (authCallbackDataRes?.status === 200) {
      appStorageService.local.set(config.appName, authCallbackDataRes || "");
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };
  return <Loader />;
};
