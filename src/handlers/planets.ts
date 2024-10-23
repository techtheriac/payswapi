import { Request, Response } from "express";
import { getPlanetById, getPlanets } from "../services/planetsApiService";
import { QueryParams } from "../types";

export const getAllPlanets = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  const response = await getPlanets(req.query);

  if (!response.success) {
    res.status(response.status);
    res.json(response.error);
    return;
  }

  res.json(response.response);
};

export const getOnePlanet = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await getPlanetById(id);

  if (!response.success) {
    res.status(response.status);
    res.json(response.error);
    return;
  }

  res.json(response.response);
};
