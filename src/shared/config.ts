export const whiteRouteList = ["/recharge", "/"];

export const isWhiteRoute = (pathname: string) => {
  return whiteRouteList.includes(pathname);
};
