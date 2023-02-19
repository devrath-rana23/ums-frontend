export const apiEndpoints = {
  //auth
  auth: {
    url: "/v1/auth",
    method: "get",
  },
  authCallback: {
    url: "/v1/auth/callback",
    method: "post",
  },
  authLogout: {
    url: "/v1/auth/logout",
    method: "post",
  },
};

export const apiConstants = Object.keys(apiEndpoints).reduce((cb, iv) => {
  return { ...cb, [iv]: iv };
}, {});
