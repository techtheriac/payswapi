import { Request, Response } from "express";
import { getPeople, getPeopleById } from "../services/peopleApiService";
import { QueryParams } from "../types";

export const getAllPersons = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  const response = await getPeople(req.query);

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
