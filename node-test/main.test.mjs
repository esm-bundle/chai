describe("@esm-bundle/chai", () => {
  it("can load the esm bundle without dying", () => {
    return import("../esm/chai.js");
  });
});
