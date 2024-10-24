import { getAllPersons, getOnePerson } from "../handlers/people";
import { Request, Response } from "express";
import {
  StarwarsPerson,
  StarwarsPersons,
  getPeople,
  getPeopleById,
} from "../services/peopleApiService";
import { PaginatedResponseViewModel } from "../services/shared";

jest.mock("../services/peopleApiService.ts", () => ({
  getPeople: jest.fn(),
  getPeopleById: jest.fn(),
}));

describe("getAllPersons handler", () => {
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

  it("should return a list of people", async () => {
    const successResponseStub = {
      success: true,
      status: 200,
      response: {} as PaginatedResponseViewModel<StarwarsPersons>,
    };

    const getPeopleMocked = getPeople as jest.MockedFunction<typeof getPeople>;
    getPeopleMocked.mockResolvedValueOnce(successResponseStub);

    // ACT
    await getAllPersons(requestStub as Request, responseStub as Response);

    // ASSERT
    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledTimes(1);
    expect(responseStub.json).toHaveBeenCalledWith({});
    expect(responseStub.status).not.toHaveBeenCalled();
  });

  it("should return appropriate error response and status codes on failure", async () => {
    const errorResponseStub = {
      success: false,
      status: 500,
      error: {
        message: "an unexpected error occured whist processing request",
      },
    };

    const getPeopleMocked = getPeople as jest.MockedFunction<typeof getPeople>;
    getPeopleMocked.mockResolvedValueOnce(errorResponseStub);

    // ACT
    await getAllPersons(requestStub as Request, responseStub as Response);

    // ASSERT
    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledTimes(1);
    expect(responseStub.json).toHaveBeenCalledWith({
      message: "an unexpected error occured whist processing request",
    });
    expect(responseStub.status).toHaveBeenCalled();
    expect(responseStub.status).toHaveBeenCalledWith(500);
  });
});

describe("getOnePerson handler", () => {
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

  it("should return one person with appropriate response code", async () => {
    // ARRANGE
    const successResponseStub = {
      success: true,
      status: 200,
      response: {} as StarwarsPerson,
    };

    const getPeopleByIdMocked = getPeopleById as jest.MockedFunction<
      typeof getPeopleById
    >;
    getPeopleByIdMocked.mockResolvedValueOnce(successResponseStub);
    // ACT
    await getOnePerson(requestStub as Request, responseStub as Response);

    //ASSERT
    expect(getPeopleByIdMocked).toHaveBeenCalledWith("1");
    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledWith(
      successResponseStub.response
    );
    expect(responseStub.status).not.toHaveBeenCalled();
  });

  it("should return appropriate error response & status code for failures", async () => {
    // ARRANGE
    const errorResponseStub = {
      success: false,
      status: 404,
      error: { message: "Not found" },
    };

    const getPeopleByIdMocked = getPeopleById as jest.MockedFunction<
      typeof getPeopleById
    >;
    getPeopleByIdMocked.mockResolvedValueOnce(errorResponseStub);

    // ACT
    await getOnePerson(requestStub as Request, responseStub as Response);

    // ASSERT
    expect(getPeopleByIdMocked).toHaveBeenCalledWith("1");
    expect(responseStub.json).toHaveBeenCalled();
    expect(responseStub.json).toHaveBeenCalledWith({ message: "Not found" });
    expect(responseStub.status).toHaveBeenCalledWith(404);
  });
});
