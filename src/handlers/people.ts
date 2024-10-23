import { Request, Response } from "express";
import { getPeople, getPeopleById } from "../services/peopleApiService";

const PERSONS_CACHE_KEY = "persons";
const PERSON_CACHE_KEY = (id: string) => `person-${id}`;

export const getAllPersons = async (req: Request, res: Response) => {
  const response = await getPeople();

  if (!response.success) {
    res.status(response.status);
    res.json(response.error);
    return;
  }

  res.json(response.response);
};

export const getOnePerson = async (req: Request, res: Response) => {
  const id = req.params.id;
  const response = await getPeopleById(id);

  if (!response.success) {
    res.status(response.status);
    res.json(response.error);
    return;
  }

  res.json(response.response);
};
