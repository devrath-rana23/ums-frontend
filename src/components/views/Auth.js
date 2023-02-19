import { useEffect, useState } from "react";
import ImageUrls from "../../utils/constants/ImageUrls";
import { apiCall } from "../../utils/services/api/api";
import { apiConstants } from "../../utils/services/api/apiEndpoints";
import { sanitizeUrl } from "../common/utils/sanitizeUrl";

export const Auth = () => {
  const [authUrl, setAuthUrl] = useState("");
  useEffect(() => {
    getAuthUrl();
  }, []);

  const getAuthUrl = async () => {
    const authDataRes = await apiCall(apiConstants.auth, { loader: true });
    if (authDataRes?.url) {
      setAuthUrl(authDataRes?.url);
    }
  };

  return (
    <>
      <div className="self-center">
        <h1 className="text-2xl font-bold mb-8 leading-[120%] text-center text-gray-900">
          Sign in to your account
        </h1>
      </div>
      {authUrl && (
        <div className="self-center">
          <a
            href={sanitizeUrl(authUrl)}
            className="box-border border border-blue-600 flex items-center justify-center gap-2 no-underline border-solid cursor-pointer"
            style={{ background: "#ffffff" }}
          >
            <img
              className="w-6 h-6 ml-20 rounded-lg"
              style={{ background: "#ffffff" }}
              src={ImageUrls.googleLogo}
              alt="google-logo"
            />
            <span className="font-semibold text-base leading-[175%] text-gray-900 mr-20 my-3">
              Google Sign In
            </span>
          </a>
        </div>
      )}
    </>
  );
};
