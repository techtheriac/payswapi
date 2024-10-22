import { Request, Response } from "express";
import { getPeople, getPeopleById } from "../services/peopleApiService";

import Cache from "../utils/cache";

const cache = new Cache();

const PERSONS_CACHE_KEY = "persons";
const PERSON_CACHE_KEY = (id: string) => `person-${id}`;

export const getAllPersons = async (req: Request, res: Response) => {
  const personsCache = cache.get(PERSONS_CACHE_KEY);

  if (personsCache) {
    res.json(personsCache);
    return;
  }

  const response = await getPeople();

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  cache.set(PERSONS_CACHE_KEY, response);

  res.json(response);
};

export const getOnePerson = async (req: Request, res: Response) => {
  const id = req.params.id;

  const personCache = cache.get(PERSON_CACHE_KEY(id));

  if (personCache) {
    res.json(personCache);
    return;
  }

  const response = await getPeopleById(id);

  if (!response.success) {
    res.status(401);
    res.json(response);
    return;
  }

  cache.set(PERSON_CACHE_KEY(id), response);

  res.json(response);
};
