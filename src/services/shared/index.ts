import axios, { AxiosError } from "axios";
import { ApiResponse, QueryParams } from "../../types";
const SWAPI_BASE = process.env.SWAPI_BASE || "https://swapi.dev/api";
export interface MetaData {
  name: string;
}

export interface FilmsResponse {
  title: string;
}
export async function getAdditionalProperties<T>(
  paths?: string[]
): Promise<ApiResponse<T[]> | ApiResponse> {
  try {
    if (!paths) {
      return {
        success: false,
        error: { message: "you have supplied invalid path(s)" },
        status: 400,
      };
    }

    if (paths.length < 1) {
      return {
        success: true,
        status: 200,
        response: [],
      };
    }

    const responses = await Promise.all(
      paths.map((path) => axios.get<T>(path))
    );

    return {
      success: true,
      response: responses?.map((res) => res?.data),
      status: 200,
    };
  } catch (error) {
    return handleError(error);
  }
}

export function handleError(error: any): ApiResponse {
  if (error instanceof AxiosError) {
    if (error?.response) {
      return {
        success: false,
        status: error.response.status,
        error: { message: error.response.data?.detail },
      };
    }

    if (error?.request) {
      return {
        success: false,
        status: 400,
        error: { message: `Error processing request: ${error?.request}` },
      };
    }
  }

  return {
    success: false,
    error: { message: "an unexpected error occured whist processing request" },
    status: 500,
  };
}

export function constructQuery(
  path: "planets" | "people",
  params: QueryParams
): string {
  const reqBase = `${SWAPI_BASE}/${path}`;

  const url = new URL(reqBase);

  const peek = (prop: keyof typeof params) => {
    return params[prop];
  };

  Object.keys(params).forEach((key) => {
    const value = peek(key as keyof typeof params);
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}
