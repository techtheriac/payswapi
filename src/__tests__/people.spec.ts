import { getAllPersons, getOnePerson } from "../handlers/people";
import { Request, Response } from "express";
import { QueryParams } from "../types";
import { getPeople } from "../services/peopleApiService";

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

jest.mock("../services/peopleApiService.ts", () => ({
  getPeople: jest.fn(({}) => {
    return {
      success: true,
      status: 200,
      response: [],
    };
  }),

  getPeopleById: jest.fn((id) => {
    return {
      success: true,
      status: 200,
      response: {},
    };
  }),
}));

describe("getAllPersons", () => {
  it("should return a list of people", async () => {
    await getAllPersons(requestStub, responseStub);
    expect(responseStub.json).toHaveBeenCalled();
  });
});

// describe("getOnePerson", () => {

//   const req = {}
//   it("should return one ", async () => {
//     await getOnePerson(requestStub, responseStub);
//     expect(responseStub.json).toHaveBeenCalled();
//   });
// });
