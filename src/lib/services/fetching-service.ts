import axios from "axios";
import ParsedItem from "../models/persed-item.model";

/**
 * # Fetching Service
 * This service retrieves the latest earthquake list from KRDAE and makes the data usable by performing the relevant shredding operations.
 */
export default class FetchingServiceV1 {
  /**
   * Get the response from the API, parse it, and return the result.
   * @returns An array of ParsedItem objects.
   */
  public async GetLastEarthquakes(): Promise<Array<ParsedItem>> {
    const response = await this.GetResponse();
    const result = this.Parser(response);
    return result;
  }

  /**
   * GetResponse() is an async function that returns a promise of type string. The promise is resolved
   * by the data property of the response object returned by the axios.get() function.
   * @param {string} [uri=http://www.koeri.boun.edu.tr/scripts/lst1.asp] - string =
   * "http://www.koeri.boun.edu.tr/scripts/lst1.asp"
   * @returns A promise that resolves to a string.
   */
  public async GetResponse(
    uri: string = "http://www.koeri.boun.edu.tr/scripts/lst1.asp"
  ): Promise<string> {
    return (await axios.get<string>(uri)).data;
  }

  /**
   * It takes a string, splits it into lines, filters out the lines that are not needed, and then
   * splits the remaining lines into an array of objects
   * @param {string} response - string
   * @returns An array of ParsedItem.
   */
  public Parser(response: string): Array<ParsedItem> {
    if (!response.includes("<pre>"))
      throw new Error("Response does not includes correct value.");
    if (!response.includes("</pre>"))
      throw new Error("Response does not includes correct value.");
    if (!response.includes("</pre>"))
      throw new Error("Response does not includes correct value.");

    var result: Array<ParsedItem> = [];
    let str = response.split("<pre>")[1];
    str = str.split("</pre>")[0];
    let lines = str.split("\n");
    lines = lines
      .filter((x) => x !== "\r")
      .filter((x) => x.replace(/\ /g, "").length !== 0)
      .filter((x) => !x.includes("..."))
      .filter((x) => !x.includes("---"))
      .filter((x) => !x.includes("B�y�kl�k\r"))
      .filter((x) => !x.includes("Tarih"));

    for (let line of lines) {
      try {
        const splitLine = line
          .split("  ")
          .filter((x) => x != "")
          .map((x) => x.trim());
        const md = Number(splitLine[4]);
        const ml = Number(splitLine[5]);
        const mw = Number(splitLine[6]);
        let item: ParsedItem = {
          Date: splitLine[0].split(" ")[0].replace(/\./g, "-"),
          Time: splitLine[0].split(" ")[1],
          Latitude: Number(splitLine[1]),
          Longitude: Number(splitLine[2]),
          Depth: Number(splitLine[3]),
          Magnitude_MD: Number.isNaN(md) ? null : md,
          Magnitude_ML: Number.isNaN(ml) ? null : ml,
          Magnitude_MW: Number.isNaN(mw) ? null : mw,
          LocationName: splitLine[7].trim(),
          SolutionAttribute:
            splitLine.length == 9
              ? [...splitLine].reverse()[0]
              : splitLine[splitLine.length - 1],
          SolutionAttributeDate:
            splitLine.length == 9 ? null : splitLine.reverse()[0],
        };
        result.push(item);
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    return result;
  }
}
