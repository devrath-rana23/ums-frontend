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
  employeeList: {
    url: "/v1/employee",
    method: "get",
  },
  employeeCreate: {
    url: "/v1/employee",
    method: "post",
  },
  skillCreate: {
    url: "/v1/skills",
    method: "post",
  },
  skillList: {
    url: "/v1/skills",
    method: "get",
  },
  roleCreate: {
    url: "/v1/roles",
    method: "post",
  },
  roleList: {
    url: "/v1/roles",
    method: "get",
  },
  employeeDelete: {
    url: "/v1/employee/:id",
    method: "delete",
  },
  roleDelete: {
    url: "/v1/roles/:id",
    method: "delete",
  },
  roleUpdate: {
    url: "/v1/roles/:id",
    method: "put",
  },
  skillDelete: {
    url: "/v1/skills/:id",
    method: "delete",
  },
  skillUpdate: {
    url: "/v1/skills/:id",
    method: "put",
  },
  employeeEdit: {
    url: "/v1/employee/edit/:id",
    method: "get",
  },
  employeeUpdate: {
    url: "/v1/employee/:id",
    method: "put",
  },
};

export const apiConstants = Object.keys(apiEndpoints).reduce((cb, iv) => {
  return { ...cb, [iv]: iv };
}, {});
