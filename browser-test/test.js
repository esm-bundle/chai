describe("@esm-bundle/chai", () => {
  it("can load the ESM bundle", () => {
    return import("/base/esm/chai.js");
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/chai.js");
  });
});
