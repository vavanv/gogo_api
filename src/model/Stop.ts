import { Metadata } from './Common';

export interface Stop {
  ZoneCode: string;
  StreetNumber: string;
  Intersection: string;
  City: string;
  StreetName: string;
  Code: string;
  StopName: string;
  Longitude: number;
  Latitude: number;
}

export interface StopReturn {
  zoneCode: string;
  streetNumber: string;
  intersection: string;
  city: string;
  streetName: string;
  code: string;
  stopName: string;
  longitude: number;
  latitude: number;
}

export interface StopResult {
  Metadata: Metadata;
  Stop: Stop;
}
