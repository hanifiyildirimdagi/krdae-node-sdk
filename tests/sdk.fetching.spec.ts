import { assert, expect } from "chai";
import "mocha";
import KRDAE_SDK from "../src/main";

describe("SDK.Fetch", () => {
  it("Object must creation with successfully", () => {
    expect(() => {
      const fetch = new KRDAE_SDK.Fetching.V1();
    });
  });
  it("Response must retrun string result", async () => {
    const fetch = new KRDAE_SDK.Fetching.V1();
    const result = await fetch.GetResponse();
    expect(result).is.string;
  });
  it("Parser must return value with correct value", async () => {
    const fetch = new KRDAE_SDK.Fetching.V1();
    const result = await fetch.GetResponse();
    const items = fetch.Parser(result);
    expect(items.length).is.greaterThan(0);
  });
});
