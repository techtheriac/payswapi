import { constructQuery } from ".";

describe("constructQuery", () => {
  it("should return a well form url", () => {
    const url = constructQuery("people", { search: "jesus", page: "2" });
    expect(url).toBe("https://swapi.dev/api/people?search=jesus&page=2");
  });
});
