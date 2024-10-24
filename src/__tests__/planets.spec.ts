import { Request, Response } from "express";
import { getOnePlanet, getAllPlanets } from "../handlers/planets";
import { PaginatedResponseViewModel } from "../services/shared";
import {
  Planet,
  Planets,
  getPlanetById,
  getPlanets,
} from "../services/planetsApiService";

jest.mock("../services/planetsApiService.ts", () => ({
  getPlanets: jest.fn(),
  getPlanetById: jest.fn(),
}));

describe("getAllPlanets handler", () => {
  let requestStub: Partial<Request>;
  let responseStub: Partial<Response>;

  beforeEach(() => {
    requestStub = {
      query: {
        search: "",
        page: "",
      },
    };

    responseStub = {
      json: jest.fn(),
      status: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("should return a list of planets", async () => {
    const successResponseStub = {
      success: true,
      status: 200,
      response: {} as PaginatedResponseViewModel<Planets>,
    };

    const getPlanetsMocked = getPlanets as jest.MockedFunction<
      typeof getPlanets
    >;
    getPlanetsMocked.mockResolvedValueOnce(successResponseStub);

    await getAllPlanets(requestStub as Request, responseStub as Response);
    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledTimes(1);
    expect(responseStub.json).toHaveBeenCalledWith({});
    expect(responseStub.status).not.toHaveBeenCalled();
  });

  it("should return appropriate response and status code for failure", async () => {
    const errorResponseStub = {
      success: false,
      status: 500,
      error: {
        message: "an unexpected error occured whist processing request",
      },
    };

    const getPlanetsMocked = getPlanets as jest.MockedFunction<
      typeof getPlanets
    >;

    getPlanetsMocked.mockResolvedValueOnce(errorResponseStub);

    await getAllPlanets(requestStub as Request, responseStub as Response);

    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledTimes(1);
    expect(responseStub.json).toHaveBeenCalledWith({
      message: "an unexpected error occured whist processing request",
    });
    expect(responseStub.status).toHaveBeenCalledWith(500);
  });
});

describe("getOnePlanet handler", () => {
  let requestStub: Partial<Request>;
  let responseStub: Partial<Response>;

  beforeEach(() => {
    requestStub = {
      params: {
        id: "1",
      },
    };

    responseStub = {
      json: jest.fn(),
      status: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it("should return one planet", async () => {
    const successResponseStub = {
      success: true,
      status: 200,
      response: {} as Planet,
    };

    const getPlanetByIdMocked = getPlanetById as jest.MockedFunction<
      typeof getPlanetById
    >;

    getPlanetByIdMocked.mockResolvedValueOnce(successResponseStub);
    await getOnePlanet(requestStub as Request, responseStub as Response);
    expect(responseStub.json).toHaveBeenCalled();
  });

  it("should return appropriate error response and status code for failure", async () => {
    const errorResponseStub = {
      success: false,
      status: 400,
      error: { message: "Not Found" },
    };

    const getPlanetsMocked = getPlanetById as jest.MockedFunction<
      typeof getPlanetById
    >;

    getPlanetsMocked.mockResolvedValueOnce(errorResponseStub);
    await getOnePlanet(requestStub as Request, responseStub as Response);
    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledWith({ message: "Not Found" });
    expect(responseStub.status).toHaveBeenCalledTimes(1);
    expect(responseStub.status).toHaveBeenCalledWith(400);
  });
});
