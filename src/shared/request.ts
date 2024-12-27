import { FetchClientOptions, FetchResponse } from "@/types/request";

export async function request({
  url,
  method = "GET",
  headers = {},
  params,
  data,
  type,
}: FetchClientOptions): Promise<FetchResponse> {
  // 请求拦截器
  const requestHeaders = {
    ...headers,
    "Content-Type": "application/json",
    // ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  let requestBody = data;

  if (method === "GET") {
    url = `${url}?${new URLSearchParams(params).toString()}`;
    requestBody = undefined;
  }


  if (method === "POST") {
    requestBody = requestBody ? JSON.stringify(requestBody) : undefined;
  }

  if (type && type === "upload" && method === "POST") {
    requestBody = data;
    requestHeaders["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`/api${url}`, {
    method,
    headers: requestHeaders,
    body: requestBody,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "请求失败");
  }

  const responseData = await response.json();
  return {
    data: responseData,
    status: response.status,
    headers: response.headers,
  };
}

export async function get(
  url: string,
  config: Omit<FetchClientOptions, "url">
) {
  return request({ url, method: "GET", ...config });
}

export async function post(
  url: string,
  config: Omit<FetchClientOptions, "url">
) {
  return request({ url, method: "POST", ...config });
}
