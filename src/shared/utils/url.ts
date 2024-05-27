type pathUrlType = {
  pathname: string;
  search?: {
    [key: string]: string;
    //[key: string]: string | string[];
  };
};
export const to = (url: string | pathUrlType): string => {
  if (typeof url === 'string') {
    return url;
  }

  let stringUrl = url.pathname;
  if (url.search) {
    const search = new URLSearchParams(url.search).toString();
    stringUrl = stringUrl + `?` + search;
  }

  return stringUrl;
};
