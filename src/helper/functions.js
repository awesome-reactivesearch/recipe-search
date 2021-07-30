//getting hostname from the given url of any form
export const getHostname = (url) => {
  let urlLocal = url,
    tempProtocol = "";
  // use URL constructor and return hostname
  if (urlLocal.indexOf("://") == -1) {
    tempProtocol = "https://";
    urlLocal = tempProtocol + urlLocal;
  }
  return new URL(urlLocal).hostname.split(".")[1];
};
