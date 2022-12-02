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
