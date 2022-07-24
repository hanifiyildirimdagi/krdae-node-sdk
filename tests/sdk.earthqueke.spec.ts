import { assert, expect } from "chai";
import "mocha";
import KRDAE_SDK from "../src/main";

describe("SDK.Earthquake", () => {
  it("Object must creation with successfully", () => {
    expect(() => {
      const service = new KRDAE_SDK.Earthquakes.V1();
    });
  });
  it("Object must return array of Earthquake", async () => {
    const service = new KRDAE_SDK.Earthquakes.V1();
    const results = await service.GetLatests();
    expect(results.length > 0).is.true;
  });
});
