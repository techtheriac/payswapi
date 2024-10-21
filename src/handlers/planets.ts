import axios from "axios";
const SWAPI_BASE = process.env.SWAPI_BASE || "https://swapi.dev/api";

export async function getPlanets(): Promise<any> {
  const request = await axios.get(`${SWAPI_BASE}/planets`);
  return request.data;
}

export async function getPlanetById(id: number): Promise<any> {
  const request = await axios.get(`${SWAPI_BASE}/planets/${id}`);
  return request.data;
}
