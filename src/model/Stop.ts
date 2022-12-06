import { Metadata } from './Common';

export interface Facility {
  Code: string;
  Description: string;
  DescriptionFr: string;
}
export interface Parking {
  Name: string;
  NameFr: string;
  ParkSpots: number;
  Type: string;
}

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
  Facilities: Facility[];
  Parkings: Parking[];
}

export interface FacilityReturn {
  description: string;
}
export interface ParkingReturn {
  name: string;
  parkSpots: number;
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
  facilities: FacilityReturn[];
  parkings: ParkingReturn[];
}

export interface StopResult {
  Metadata: Metadata;
  Stop: Stop;
}
