export default interface ParsedItem {
  Date: string;
  Time: string;
  Latitude: number;
  Longitude: number;
  Depth: number;
  Magnitude_MD: number | null;
  Magnitude_ML: number | null;
  Magnitude_MW: number | null;
  LocationName: string | null;
  SolutionAttribute: string;
  SolutionAttributeDate: string | null;
}
