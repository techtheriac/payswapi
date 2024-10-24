import Cache from "./cache";

describe("cache implementation", () => {
  it("should retrieve appropriate value for a given key", () => {
    const cache = new Cache();
    cache.set("jesus", "is lord");
    expect(cache.get("jesus")).toBe("is lord");
  });

  it("should fail to retrieve deleted cache item(s)", () => {
    const cache = new Cache();
    cache.set("jesus", "is lord");
    cache.delete("jesus");
    expect(cache.get("jesus")).toBe(null);
  });

  it("should fail to retrieve values when cache is cleared", () => {
    const cache = new Cache();
    cache.set("jesus", "is lord");
    cache.set("suit", "yourself");
    cache.clear();
    expect(cache.get("jesus")).toBe(null);
    expect(cache.get("suit")).toBe(null);
  });
});
