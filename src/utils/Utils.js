import { config } from "./config/Config";
import { constantText } from "./constants/ConstantText";
import { appStorageService } from "./services/storage/Storage";
import ImageUrls from "./constants/ImageUrls";

export const Logout = (callBack = () => {}) => {
  appStorageService.local.remove(config.appName);
  callBack(null);
  window.location.href = "/";
};

export const calcRemainingWeeks = (date) => {
  const d1 = new Date();
  const d2 = new Date(date);
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
};

export const formatBooleanYesNo = (value) => {
  return Boolean(value) ? constantText.yes : constantText.no;
};

export const formatBoolActiveInactive = (value) => {
  return Boolean(value) ? constantText.active : constantText.inActive;
};

export const createQueryParams = (Obj) => {
  const queryParams = {};
  Object.keys(Obj).forEach((key) => {
    const str = key;
    if (
      Obj[str] ||
      typeof Obj[str] == "boolean" ||
      typeof Obj[str] == "number"
    ) {
      queryParams[key] = Obj[str];
    }
  });
  return queryParams;
};

export const parseSchema = (schema) => {
  return JSON.parse(JSON.stringify(schema));
};

export const upperCaseStringFirstLetter = (str = "") => {
  const arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
};

export const sortArray = (keyText, array = []) => {
  try {
    return array.sort((a, b) =>
      keyText ? a[keyText].localeCompare(b[keyText]) : a.localeCompare(b)
    );
  } catch (error) {
    return [];
  }
};

export const imageOnError = (
  { currentTarget },
  defaultSrc = ImageUrls.profile
) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = defaultSrc;
};

export const formatArrayToCommaSeprated = (array, key) => {
  array = array.map((element) => {
    return element[key];
  });
  return array.join(", ");
};

const safeUrlPattern =
  /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/gi;

// NOTE: A pattern that matches safe data URLs. It only matches image, video, and audio types.
const dataUrlPattern =
  /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

const aboutBlank = "about:blank";

const coreSanitizeUrl = (url) => {
  if (url === "null" || url.length === 0 || url === aboutBlank) {
    return aboutBlank;
  }

  if (url.match(safeUrlPattern) || url.match(dataUrlPattern)) {
    return url;
  }

  return `unsafe:${url}`;
};

export const sanitizeUrl = (url = aboutBlank) => {
  return coreSanitizeUrl(String(url).trim());
};

export const isJson = (str) => {
  if (typeof str !== "string") {
    return false;
  } else {
    try {
      return JSON.parse(str);
    } catch (err) {
      return false;
    }
  }
};
