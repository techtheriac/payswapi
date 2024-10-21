import axios from "axios";
const SWAPI_BASE = process.env.SWAPI_BASE || "https://swapi.dev/api";

export async function getPeople(): Promise<any> {
  const request = await axios.get(`${SWAPI_BASE}/people`);

  console.log("PEOPLE", request.data);

  request.data;
}

export async function getPeopleById(id: number): Promise<any> {
  const request = await axios.get(`${SWAPI_BASE}/people/${id}`);
  return request;
}
