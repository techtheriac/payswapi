import axios from "axios";
import { ApiResponse } from "../types";
import { filterObject } from "../utils/filter";
const SWAPI_BASE = process.env.SWAPI_BASE || "https://swapi.dev/api";

export interface StarwarsPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
}

type StarwarsPeople = Omit<StarwarsPerson, "homeworld" | "films" | "vehicles">;

interface StarwarsPeopleResponse {
  results: StarwarsPeople[];
}

interface HomeWorldResponse {
  name: string;
}

export async function getPeople(): Promise<ApiResponse<StarwarsPeople[]>> {
  try {
    const res = await axios.get<StarwarsPeopleResponse>(`${SWAPI_BASE}/people`);

    var response: StarwarsPeople[] = res.data.results?.map((person) => {
      return {
        name: person.name,
        birth_year: person.birth_year,
        height: person.height,
        eye_color: person.eye_color,
        gender: person.gender,
        hair_color: person.hair_color,
        mass: person.mass,
        skin_color: person.skin_color,
      };
    });

    return {
      success: true,
      response,
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

export async function getPeopleById(
  id: number
): Promise<ApiResponse<StarwarsPerson>> {
  try {
    const res = await axios.get<StarwarsPerson>(`${SWAPI_BASE}/people/${id}`);
    const homeworldResponse = await axios.get<HomeWorldResponse>(
      res.data.homeworld!
    );

    const response: StarwarsPerson = ({
      homeworld: homeworldResponse.data.name,
    } = res.data);

    return {
      response,
      success: true,
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
