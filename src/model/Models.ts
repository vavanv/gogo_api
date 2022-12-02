import { Metadata } from './Common';

export interface Station {
  LocationCode: string;
  PublicStopId: string;
  LocationName: string;
  LocationType: string;
}

export interface StationResult {
  Metadata: Metadata;
  Stations: { Station: Station[] };
}

export interface Stop {
  // ZoneCode: string;
  // StreetNumber: string;
  // Intersection: string;
  // City: string;
  // StreetName: string;
  Code: string;
  StopName: string;
  Longitude: number;
  Latitude: number;
}

export interface StopResult {
  Metadata: Metadata;
  Stop: Stop;
}
