export const appStorageService = {
  local: {
    get: (key) => {
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : "";
      } catch (error) {
        return "";
      }
    },
    set: (key, value) => {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
      return localStorage.removeItem(key);
    },
  },
  session: {
    get: (key) => {
      try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : "";
      } catch (error) {
        return "";
      }
    },
    set: (key, value) => {
      return sessionStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
      return sessionStorage.removeItem(key);
    },
  },
};
