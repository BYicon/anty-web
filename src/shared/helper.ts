// TODO: some helper functions

import { whiteRouteList } from "./config";
export const isWhiteRoute = (pathname: string) => {
    return whiteRouteList.includes(pathname);
  };