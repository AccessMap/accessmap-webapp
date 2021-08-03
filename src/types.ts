import { Feature, Point, LineString } from "geojson";

export type Activity =
  | "default"
  | "planning-trip"
  | "directions"
  | "directions-info"
  | "directions-steps"
  | "setting-profile"
  | "viewing-map-info"
  | "signing-up";
export type Media = "mobile" | "tablet" | "desktop";
export type Orientation = "portrait" | "landscape";

export interface TransportationProperties {
  construction: boolean;
  cost: number;
  crossing: string;
  curbramps: boolean;
  description: string;
  elevator: boolean;
  footway: "sidewalk" | "crossing";
  grade: number;
  incline: number;
  indoor: boolean;
  length: number;
  opening_hours: string;
  subclass: "footway";
  surface: string;
}

interface AccessMapSegment
  extends Feature<LineString>,
    TransportationProperties {}

export interface Route {
  geometry: LineString;
  legs: AccessMapSegment[][];
  segments: {
    type: "Featurecollection";
    features: AccessMapSegment[];
  };
  distance: number;
  duration: number;
}

// Route data
export interface RouteResult {
  code:
    | "Ok"
    | "Error"
    | "NoRoute"
    | "OriginFarAway"
    | "DestinationFarAway"
    | "GraphNotReady"
    | "SpatialIndexNotReady";
  message?: string;
  origin?: Feature<Point>;
  destination?: Feature<Point>;
  routes?: Route[];
  waypoints?: Feature<Point>;
}
