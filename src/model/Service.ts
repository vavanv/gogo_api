import { Metadata } from './Common';

export interface Trip {
  Cars: string;
  TripNumber: string;
  StartTime: string;
  EndTime: string;
  LineCode: string;
  RouteNumber: string;
  VariantDir: string;
  Display: string;
  Latitude: number;
  Longitude: number;
  IsInMotion: boolean;
  DelaySeconds: number;
  Course: number;
  FirstStopCode: string;
  LastStopCode: string;
  PrevStopCode: string;
  NextStopCode: string;
  AtStationCode: string;
  ModifiedDate: string;
}

export interface TripResult {
  Metadata: Metadata;
  Trips: { Trip: Trip[] };
}

export interface TripReturn {
  cars: string;
  tripNumber: string;
  startTime: string;
  endTime: string;
  lineCode: string;
  routeNumber: string;
  variantDir: string;
  display: string;
  latitude: number;
  longitude: number;
  isInMotion: boolean;
  delaySeconds: number;
  course: number;
  firstStopCode: string;
  lastStopCode: string;
  prevStopCode: string;
  nextStopCode: string;
  atStationCode: string;
  modifiedDate: string;
}
