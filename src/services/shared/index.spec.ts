import { constructQuery } from ".";

describe("constructQuery", () => {
  it("should return a well formed url with expected query params", () => {
    const url = constructQuery("people", { search: "jesus", page: "2" });
    expect(url).toBe("https://swapi.dev/api/people?search=jesus&page=2");
  });
});
