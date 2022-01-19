import MapboxClient from "mapbox/lib/services/geocoding";

type BboxType = [number, number, number, number];
interface Proximity {
  longitude: number;
  latitude: number;
}

interface MapboxGeocoderResult {
  name: string;
  location: number[];
}

type GeocoderCallback = (geocoded: MapboxGeocoderResult[]) => void;

const geocode = (
  value: string,
  bbox: BboxType = null,
  proximity: Proximity = null,
  callback: GeocoderCallback
): void => {
  if (!value) {
    return;
  }

  const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
  // TODO: set country code from region
  const geocoderOptions = {
    proximity: proximity,
    bbox: bbox,
  };

  mapboxClient.geocodeForward(value, geocoderOptions).then((results) => {
    const places: MapboxGeocoderResult[] = results.entity.features.map((d) => ({
      name: d.place_name,
      location: { longitude: d.center[0], latitude: d.center[1] },
    }));
    callback(places);
  });
};

export default geocode;
