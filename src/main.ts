import Earthquake, {
  Magnitude,
  Location,
  AdditionalData,
} from "./lib/models/earthquake-item.model";
import ParsedItem from "./lib/models/persed-item.model";
import { KRDAE_SDK } from "./lib/sdk";

export default KRDAE_SDK;
export { Earthquake, Magnitude, Location, AdditionalData, ParsedItem };
