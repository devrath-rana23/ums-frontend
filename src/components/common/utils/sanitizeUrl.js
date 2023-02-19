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
