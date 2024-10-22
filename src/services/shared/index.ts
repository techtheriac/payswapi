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
      };
    }

    const responses = await Promise.all(
      paths.map((path) => axios.get<T>(path))
    );

    return {
      success: true,
      response: responses?.map((res) => res?.data),
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }

    return {
      success: false,
      error: {
        message: "an unexpected error occured whilst retrieving people",
      },
    };
  }
}
