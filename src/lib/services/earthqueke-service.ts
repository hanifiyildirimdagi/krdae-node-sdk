import Earthquake from "../models/earthquake-item.model";
import FetchingServiceV1 from "./fetching-service";

/* This class is responsible for retrieving the latest earthquakes from the API and returning them as
Earthquake objects. */
export default class EarthquakeService {
  private readonly _fetching: FetchingServiceV1;

  constructor() {
    this._fetching = new FetchingServiceV1();
  }

  /**
   * This method retrieves the latest earthquakes from the API, parses them and returns them as Earthquake objects.
   * @returns An array of Earthquake objects.
   */
  public async GetLatests(): Promise<Array<Earthquake>> {
    const parsed = await this._fetching.GetLastEarthquakes();
    const items = parsed.map((r) => new Earthquake(r));
    return items;
  }
}
