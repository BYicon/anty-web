import { FetchClientOptions, FetchResponse } from "@/types/request";

export async function request({
  url,
  method = "GET",
  headers = {},
  params,
  data,
}: FetchClientOptions): Promise<FetchResponse> {
  const requestMethod = method.toUpperCase();
  const requestUrl = new URL(
    "/api" + url,
    typeof window !== "undefined" ? window.location.origin : "http://localhost",
  );
  if (params)
    for (const [key, value] of Object.entries(params))
      requestUrl.searchParams.set(key, String(value));
  const requestHeaders = new Headers(headers);
  let body: BodyInit | undefined;
  if (
    data !== undefined &&
    requestMethod !== "GET" &&
    requestMethod !== "HEAD"
  ) {
    if (data instanceof FormData) {
      requestHeaders.delete("Content-Type");
      body = data;
    } else {
      requestHeaders.set("Content-Type", "application/json");
      body = JSON.stringify(data);
    }
  }
  const response = await fetch(requestUrl.pathname + requestUrl.search, {
    method: requestMethod,
    headers: requestHeaders,
    body,
    signal: AbortSignal.timeout(30_000),
  });
  const responseData =
    response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(
      responseData?.message || "Request failed (" + response.status + ").",
    );
  return {
    data: responseData,
    status: response.status,
    headers: response.headers,
  };
}

export function get(url: string, config: Omit<FetchClientOptions, "url"> = {}) {
  return request({ ...config, url, method: "GET" });
}

export function post(
  url: string,
  config: Omit<FetchClientOptions, "url"> = {},
) {
  return request({ ...config, url, method: "POST" });
}
