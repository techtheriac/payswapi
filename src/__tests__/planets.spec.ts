import { Request, Response } from "express";
import { getOnePlanet, getAllPlanets } from "../handlers/planets";
import { QueryParams } from "../types";

export const requestStub = {
  query: {
    search: "",
    page: "",
  } as QueryParams,
} as Request;
export const responseStub = {
  json: jest.fn(),
  status: jest.fn(),
} as unknown as Response;

jest.mock("../services/planetsApiService.ts", () => ({
  getPlanets: jest.fn(({}) => {
    return {
      success: true,
      status: 200,
      response: [],
    };
  }),

  getPlanetById: jest.fn((id) => {
    return {
      success: true,
      status: 200,
      response: {},
    };
  }),
}));

describe("getAllPlanets", () => {
  it("should return a list of planets", async () => {
    await getAllPlanets(requestStub, responseStub);
    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledTimes(1);
    expect(responseStub.json).toHaveBeenCalledWith([]);
  });
});

describe("getOnePlanet", () => {
  const requestStub = {
    params: {
      id: 1,
    },
  } as unknown as Request;
  it("should return one planet", async () => {
    await getOnePlanet(requestStub, responseStub);
    expect(responseStub.json).toHaveBeenCalled();
  });
});
