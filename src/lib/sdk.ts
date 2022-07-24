import EarthquakeService from "./services/earthqueke-service";
import FetchingServiceV1 from "./services/fetching-service";
export namespace KRDAE_SDK {
  export const Fetching = {
    V1: FetchingServiceV1,
  };
  export const Earthquakes = {
    V1: EarthquakeService,
  };
}
