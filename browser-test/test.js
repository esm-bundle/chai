describe("@esm-bundle/chai", () => {
  it("can load the ESM bundle", async () => {
    const chai = await import("/base/esm/chai.js");
    if (typeof chai.expect !== "function") {
      throw new Error("expect should be a function");
    }
    if (typeof chai.assert !== "function") {
      throw new Error("assert should be a function");
    }
    if (typeof chai.default !== "object") {
      throw new Error("default should be an object");
    }
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/chai.js");
  });
});
