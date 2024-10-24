import axios from "axios";
import { ApiResponse, QueryParams } from "../types";
import {
  MetaData,
  PaginatedApiResponse,
  PaginatedResponseViewModel,
  constructQuery,
  getAdditionalProperties,
  handleError,
} from "./shared";
const SWAPI_BASE = process.env.SWAPI_BASE || "https://swapi.dev/api";

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents?: string[];
  films?: string[];
}

export type Planets = Omit<Planet, "residents" | "films">;

interface PlanetsResponse extends PaginatedApiResponse {
  results: Planets[];
}

interface ResidentsProps extends MetaData {}
interface FilmsProps {
  title: string;
}

export async function getPlanets(
  params: QueryParams
): Promise<ApiResponse<PaginatedResponseViewModel<Planets>> | ApiResponse> {
  try {
    const requestUrl = constructQuery("planets", params);
    const res = await axios.get<PlanetsResponse>(requestUrl);

    var results: Planets[] = res.data?.results.map((planet) => {
      return {
        climate: planet.climate,
        diameter: planet.diameter,
        gravity: planet.gravity,
        name: planet.name,
        orbital_period: planet.orbital_period,
        population: planet.population,
        rotation_period: planet.rotation_period,
        surface_water: planet.surface_water,
        terrain: planet.terrain,
      };
    });

    let hasNextPage: boolean = false;
    let hasPreviousPage: boolean = false;

    if (res.data.next) hasNextPage = true;
    if (res.data.previous) hasPreviousPage = true;

    const response: PaginatedResponseViewModel<Planets> = {
      hasNextPage,
      hasPreviousPage,
      total: res.data.count,
      results,
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

export async function getPlanetById(
  id: string
): Promise<ApiResponse<Planet> | ApiResponse> {
  try {
    const res = await axios.get<Planet>(`${SWAPI_BASE}/planets/${id}`);

    if (!res.data) {
      return {
        success: false,
        status: res.status,
      };
    }

    const residentsResonse = getAdditionalProperties<ResidentsProps>(
      res.data.residents
    );
    const filmsResponse = getAdditionalProperties<FilmsProps>(res.data.films);

    const metaDataResponses = await Promise.all([
      residentsResonse,
      filmsResponse,
    ]);

    if (
      metaDataResponses.some((x) => !x.success) ||
      metaDataResponses.some((x) => !x.response)
    ) {
      return {
        success: false,
        error: { message: "unable to spool planets metadata" },
        status: 404,
      };
    }

    const [residents, films] = metaDataResponses;

    const response: Planet = {
      climate: res.data.climate,
      diameter: res.data.diameter,
      gravity: res.data.gravity,
      name: res.data.name,
      orbital_period: res.data.orbital_period,
      population: res.data.population,
      rotation_period: res.data.rotation_period,
      surface_water: res.data.surface_water,
      terrain: res.data.terrain,
      films: films.response?.map((x) => x.title),
      residents: residents.response?.map((x) => x.name),
    };

    return {
      success: true,
      response,
      status: 200,
    };
  } catch (error) {
    return handleError(error);
  }
}
