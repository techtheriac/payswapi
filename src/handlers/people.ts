import { Request, Response } from "express";
import { getPeople, getPeopleById } from "../services/peopleApiService";

export const getAllPersons = async (req: Request, res: Response) => {
  const response = await getPeople();

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  res.json(response);
};

export const getOnePerson = async (req: Request, res: Response) => {
  const id = req.params.id;

  const response = await getPeopleById(id);

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  res.json(response);
};
