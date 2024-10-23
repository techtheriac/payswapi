import axios from "axios";
import { ApiResponse, QueryParams } from "../types";
import {
  FilmsResponse,
  MetaData,
  constructQuery,
  getAdditionalProperties,
  handleError,
} from "./shared";
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
  starships?: string[];
}

type StarwarsPersons = Omit<StarwarsPerson, "homeworld" | "films" | "vehicles">;

interface StarwarsPersonsResponse {
  results: StarwarsPersons[];
}

interface HomeWorldResponse extends MetaData {}

interface VehilclesResponse extends MetaData {}

interface StarshipsResponse extends MetaData {}

export async function getPeople(
  params: QueryParams
): Promise<ApiResponse<StarwarsPersons[]> | ApiResponse> {
  try {
    const requestUrl = constructQuery("people", params);
    const res = await axios.get<StarwarsPersonsResponse>(requestUrl);

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
      status: res.status,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getPeopleById(
  id: string
): Promise<ApiResponse<StarwarsPerson> | ApiResponse> {
  try {
    const res = await axios.get<StarwarsPerson>(`${SWAPI_BASE}/people/${id}`);

    if (!res.data) {
      return {
        success: false,
        status: res.status,
      };
    }

    const homeworldResponse = getAdditionalProperties<HomeWorldResponse>([
      res.data.homeworld!,
    ]);
    const vehiclesResponse = getAdditionalProperties<VehilclesResponse>(
      res.data.vehicles
    );
    const filmsResponse = getAdditionalProperties<FilmsResponse>(
      res.data.films
    );
    const starshipsResponse = getAdditionalProperties<StarshipsResponse>(
      res.data.starships
    );

    const metaDataResponses = await Promise.all([
      homeworldResponse,
      vehiclesResponse,
      filmsResponse,
      starshipsResponse,
    ]);

    if (
      metaDataResponses.some((x) => !x.success) ||
      metaDataResponses.some((x) => !x.response)
    ) {
      return {
        success: false,
        error: { message: "unable to spool person metadata" },
        status: 404,
      };
    }

    const [homeworld, vehicles, films, starships] = metaDataResponses;

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
      starships: starships.response?.map((x) => x.name),
    };

    return {
      response,
      success: true,
      status: 200,
    };
  } catch (error) {
    return handleError(error);
  }
}
