import { Request, Response } from "express";
import { getPeople, getPeopleById } from "../services/starwarsApiService";

export const getAll = async (req: Request, res: Response) => {
  const response = await getPeople();

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  res.json(response);
};

export const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const response = await getPeopleById(id);

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  res.json(response);
};
