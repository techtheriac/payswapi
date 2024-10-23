import { Request, Response } from "express";
export const requestStub = {} as Request;
export const responseStub = {
  json: jest.fn(),
} as unknown as Response;
