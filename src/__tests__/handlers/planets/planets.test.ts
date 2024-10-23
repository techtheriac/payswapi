import { requestStub, responseStub } from "../people/__stubs__";
import { getAllPlanets, getOnePlanet } from "../../../handlers/planets";

describe("getAllPersons", () => {
  it("should return a list of planets", async () => {
    await getAllPlanets(requestStub, responseStub);
    expect(responseStub.json).toHaveBeenCalled();
  });
});

describe("getOnePerson", () => {
  it("should return one planet", async () => {
    await getOnePlanet(requestStub, responseStub);
    expect(responseStub.json).toHaveBeenCalled();
  });
});
