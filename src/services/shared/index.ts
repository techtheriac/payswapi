import axios from "axios";
import { ApiResponse } from "../../types";

export interface MetaData {
  name: string;
}

export interface FilmsResponse {
  title: string;
}
export async function getMetaData<T>(
  paths?: string[]
): Promise<ApiResponse<T[]>> {
  try {
    if (!paths) {
      return {
        success: false,
        error: { message: "you have supplied invalid path(s)" },
        status: 401,
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
    console.error(error);

    if (error instanceof Error) {
      return {
        success: false,
        error: { message: error.message },
        status: 500,
      };
    }

    return {
      success: false,
      error: {
        message: "an unexpected error occured whilst retrieving people",
      },
      status: 500,
    };
  }
}
