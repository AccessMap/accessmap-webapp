import React, { useRef, useEffect } from "react";

import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { easeExpOut } from "d3-ease";

import MapLoadingStatus from "../MapLoadingStatus";

import PedestrianSource from "../sources/PedestrianSource";
import RegionsMaskSource from "../sources/RegionsMaskSource";
import TasksSource from "../sources/TasksSource";

import CrossingsLayers from "../layers/CrossingsLayers";
import SidewalkLayers from "../layers/SidewalkLayers";
import ElevatorPathLayers from "../layers/ElevatorPathLayers";
import RouteLayers from "../layers/RouteLayers";
import { WaypointsLayers } from "../layers/WaypointsLayers";
import GeolocationLayers from "features/geolocation/GeolocationLayers";
import RegionsLayers from "../layers/RegionsLayers";
import TasksLayers from "../layers/TasksLayers";

import { useAppSelector, useAppDispatch } from "hooks";
import { CLICKABLE_LAYERS } from "constants/layers";
import { move, moveEnd, click, load, resize as resizeMap } from "../map-slice";

import unsupportedAreaImage from "../images/unsupported-area-image";
import directionArrowImage from "../images/direction-arrow";
import directionArrowWhiteImage from "../images/direction-arrow-white";

const loadImageIfNotLoaded = (map, name, image) => {
  if (!map.hasImage(name)) {
    map.loadImage(image.src, (err, image) => {
      if (err) throw err;
      map.addImage(name, image);
    });
  }
};

const loadImageObjectIfNotLoaded = (map, name, image) => {
  if (!map.hasImage(name)) map.addImage(name, image);
};

const Map = () => {
  // TODO: pull up redux state to this level, make other components simple?
  const mapRef = useRef(null);

  useEffect(() => {
    // Attempt to load the custom image if it hasn't yet been added
    const map = mapRef.current.getMap();
    loadImageObjectIfNotLoaded(map, "unsupported-area", unsupportedAreaImage);
    loadImageIfNotLoaded(map, "direction-arrow", directionArrowImage);
    loadImageIfNotLoaded(
      map,
      "direction-arrow-white",
      directionArrowWhiteImage
    );
  }, [mapRef]);

  const { loaded, lon, lat, zoom, transitionDuration, uphillMode } =
    useAppSelector((state) => state.map);

  const { selected, profiles } = useAppSelector((state) => state.profiles);
  const profile = profiles[selected];

  const { hasRoute } = useAppSelector((state) => state.directions);

  const dispatch = useAppDispatch();

  return (
    <div className="map mapboxgl-map">
      <ReactMapGL
        ref={mapRef}
        width="100%"
        height="100%"
        longitude={lon}
        latitude={lat}
        zoom={zoom}
        transitionDuration={transitionDuration}
        transitionInterpolator={new FlyToInterpolator()}
        transitionEasing={easeExpOut}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/accessmap/cjglbmftk00202tqmpidtfxk3"
        interactiveLayerIds={CLICKABLE_LAYERS}
        onViewStateChange={({ viewState, interactionState }) => {
          const { longitude, latitude, zoom, transitionDuration } = viewState;

          const bounds = mapRef.current.getMap().getBounds().toArray();

          dispatch(
            move({
              lon: longitude,
              lat: latitude,
              zoom: zoom,
              bounds: [bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]],
              transitionDuration,
            })
          );
        }}
        onInteractionStateChange={(interactionState) => {
          if (
            !interactionState.inTransition &&
            !interactionState.isDragging &&
            !interactionState.isPanning &&
            !interactionState.isRotating &&
            !interactionState.isZooming
          ) {
            dispatch(moveEnd());
          }
        }}
        onResize={() => {
          const map = mapRef.current.getMap();
          const bounds = map.getBounds().toArray();

          dispatch(
            resizeMap({
              bounds: [bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]],
              canvasWidth: map.transform.width,
              canvasHeight: map.transform.height,
            })
          );
        }}
        onLoad={() => {
          const map = mapRef.current.getMap();
          const bounds = map.getBounds().toArray();

          dispatch(
            load({
              bounds: [bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]],
              canvasWidth: map.transform.width,
              canvasHeight: map.transform.height,
            })
          );
        }}
        onClick={(pointerEvent) => {
          const features = mapRef.current
            .getMap()
            .queryRenderedFeatures(pointerEvent.point, {
              layers: CLICKABLE_LAYERS,
            });

          if (features.length) {
            const feature = features[0];
            const lngLat = pointerEvent.lngLat;
            dispatch(
              click({
                layer: feature.layer,
                layerName: feature.layerName,
                lon: lngLat[0],
                lat: lngLat[1],
                properties: feature.properties,
              })
            );
          } else {
            dispatch(
              click({
                lon: pointerEvent.lngLat[0],
                lat: pointerEvent.lngLat[1],
              })
            );
          }
        }}
        getCursor={(state) => {
          if (state.isDragging) {
            return "grabbing";
          }
          if (state.isHovering) {
            return "pointer";
          }
          return "default";
        }}
      >
        <PedestrianSource />
        <RegionsMaskSource />
        <TasksSource />

        {hasRoute && <RouteLayers />}
        <ElevatorPathLayers />
        <CrossingsLayers avoidCurbs={profile.avoidCurbs} />
        <SidewalkLayers
          uphillMax={profile.uphillMax}
          downhillMax={profile.downhillMax}
          speed={profile.speed}
          uphillMode={uphillMode}
        />
        {/*<RegionsLayer />*/}
        <GeolocationLayers />
        <WaypointsLayers />
        <RegionsLayers />
        <TasksLayers />
      </ReactMapGL>
      {!loaded && <MapLoadingStatus />}
    </div>
  );
};

export { Map };
