import axios from "axios";
import { ApiResponse } from "../types";
import { FilmsResponse, MetaData, getMetaData } from "./shared";
const SWAPI_BASE = process.env.SWAPI_BASE || "https://swapi.dev/api";

interface StarwarsPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld?: string;
  films?: string[];
  vehicles?: string[];
}

type StarwarsPersons = Omit<StarwarsPerson, "homeworld" | "films" | "vehicles">;

interface StarwarsPersonsResponse {
  results: StarwarsPersons[];
}

interface HomeWorldResponse extends MetaData {}

interface VehilclesResponse extends MetaData {}

export async function getPeople(): Promise<ApiResponse<StarwarsPersons[]>> {
  try {
    const res = await axios.get<StarwarsPersonsResponse>(
      `${SWAPI_BASE}/people`
    );

    var response: StarwarsPersons[] = res.data.results?.map((person) => {
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
  id: string
): Promise<ApiResponse<StarwarsPerson>> {
  try {
    const res = await axios.get<StarwarsPerson>(`${SWAPI_BASE}/people/${id}`);

    if (!res.data) {
      return {
        success: false,
      };
    }

    const homeworldResponse = getMetaData<HomeWorldResponse>([
      res.data.homeworld!,
    ]);
    const vehiclesResponse = getMetaData<VehilclesResponse>(res.data.vehicles);
    const filmsResponse = getMetaData<FilmsResponse>(res.data.films);

    const metaDataResponses = await Promise.all([
      homeworldResponse,
      vehiclesResponse,
      filmsResponse,
    ]);

    if (
      metaDataResponses.some((x) => !x.success) ||
      metaDataResponses.some((x) => !x.response)
    ) {
      return {
        success: false,
        error: { message: "unable to spool person metadata" },
      };
    }

    const [homeworld, vehicles, films] = metaDataResponses;

    const response: StarwarsPerson = {
      birth_year: res.data.birth_year,
      eye_color: res.data.eye_color,
      films: films.response?.map((x) => x.title),
      gender: res.data.gender,
      hair_color: res.data.hair_color,
      height: res.data.height,
      homeworld: homeworld.response?.flatMap((x) => x.name).join(),
      vehicles: vehicles.response?.map((x) => x.name),
      mass: res.data.mass,
      name: res.data.name,
      skin_color: res.data.skin_color,
    };

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
