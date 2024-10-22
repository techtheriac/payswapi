import { Request, Response } from "express";
import { getPlanetById, getPlanets } from "../services/planetsApiService";
import axios from "axios";

export const getAllPlanets = async (req: Request, res: Response) => {
  const response = await getPlanets();

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  res.json(response);
};

export const getOnePlanet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await getPlanetById(id);

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  res.json(response);
};
