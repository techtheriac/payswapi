import axios from "axios";
import { ApiResponse } from "../types";
import { MetaData, getMetaData } from "./shared";
const SWAPI_BASE = process.env.SWAPI_BASE || "https://swapi.dev/api";

interface Planet {
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

type Planets = Omit<Planet, "residents" | "films">;

interface PlanetsResponse {
  results: Planets[];
}

interface ResidentsResponse extends MetaData {}
interface FilmsResponse {
  title: string;
}

export async function getPlanets(): Promise<ApiResponse<Planets[]>> {
  const res = await axios.get<PlanetsResponse>(`${SWAPI_BASE}/planets`);

  var response: Planets[] = res.data?.results.map((planet) => {
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

  return {
    response,
    success: true,
    status: 200,
  };
}

export async function getPlanetById(id: string): Promise<ApiResponse<Planet>> {
  const res = await axios.get<Planet>(`${SWAPI_BASE}/planets/${id}`);

  if (!res.data) {
    return {
      success: false,
      status: res.status,
    };
  }

  const residentsResonse = getMetaData<ResidentsResponse>(res.data.residents);
  const filmsResponse = getMetaData<FilmsResponse>(res.data.films);

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
}
