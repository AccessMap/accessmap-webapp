import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ReactMapGL from "react-map-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import * as AppActions from "actions";
import regions from "constants/regions";

import PedestrianSource from "containers/Map/source-pedestrian";
import RegionsSource from "containers/Map/source-regions";

import CrossingsLayers from "containers/Map/layers-crossings";
import SidewalkLayers from "containers/Map/layers-sidewalks";
import ElevatorPathsLayers from "containers/Map/layers-elevator-paths";
import RegionsLayer from "containers/Map/layer-regions";
import RouteLayers from "containers/Map/layers-route";
import WaypointsLayers from "containers/Map/layers-waypoints";
import GeolocationLayers from "containers/Map/layers-geolocation";

const CLICKABLE_LAYERS = [
  "elevator-paths-click",
  "crossing-click",
  "sidewalk-click"
];

class Map extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(pointerEvent) {
    if (this.props.viewingDirections) return;

    const features = this.mapRef.queryRenderedFeatures(pointerEvent.point, {
      layers: CLICKABLE_LAYERS
    });

    this.props.actions.mapClick(features, pointerEvent.lngLat);
  }

  render() {
    const { actions, lon, lat, zoom } = this.props;

    return (
      <div className="map mapboxgl-map">
        <ReactMapGL
          ref={ref => {
            this.mapRef = ref;
          }}
          width="100%"
          height="100%"
          longitude={lon}
          latitude={lat}
          zoom={zoom}
          /* eslint-disable no-undef */
          mapboxApiAccessToken={MAPBOX_TOKEN}
          /* eslint-enable no-undef */
          mapStyle="mapbox://styles/accessmap/cjglbmftk00202tqmpidtfxk3"
          interactiveLayerIds={CLICKABLE_LAYERS}
          onViewportChange={nextViewport => {
            const { longitude, latitude, zoom } = nextViewport;

            const m = this.mapRef.getMap();
            // TODO: run this earlier - right after mapbox style load
            const newBounds = m.getBounds().toArray();
            const bbox = [
              newBounds[0][0],
              newBounds[0][1],
              newBounds[1][0],
              newBounds[1][1]
            ];

            actions.mapMove(longitude, latitude, zoom, bbox);
          }}
          onLoad={() => {
            const m = this.mapRef.getMap();
            // TODO: run this earlier - right after mapbox style load
            const newBounds = m.getBounds().toArray();
            const bbox = [
              newBounds[0][0],
              newBounds[0][1],
              newBounds[1][0],
              newBounds[1][1]
            ];
            const center = m.getCenter();
            actions.loadMap(center.lng, center.lat, m.getZoom(), bbox);
          }}
          onClick={this.handleClick}
          getCursor={state => {
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
          <RegionsSource />

          <RouteLayers before="crossing-click" />
          <ElevatorPathsLayers />
          <CrossingsLayers />
          <SidewalkLayers />
          <RegionsLayer />
          <GeolocationLayers />
          <WaypointsLayers />
        </ReactMapGL>
      </div>
    );
  }
}

Map.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable react/require-default-props */
  actions: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  /* eslint-enable react/require-default-props */
  lon: PropTypes.number,
  lat: PropTypes.number,
  mediaType: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
  viewingDirections: PropTypes.bool,
  zoom: PropTypes.number
};

Map.defaultProps = {
  lon: regions.features[0].properties.lon,
  lat: regions.features[0].properties.lat,
  mediaType: "mobile",
  viewingDirections: false,
  zoom: regions.features[0].properties.zoom
};

const mapStateToProps = state => {
  const { activities, browser, router } = state;

  const { lon, lat, z } = router.route.params;

  return {
    lon,
    lat,
    mediaType: browser.mediaType,
    viewingDirections: activities.viewingDirections,
    zoom: z
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
