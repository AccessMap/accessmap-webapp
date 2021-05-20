import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import cn from "classnames";

import ReactMapboxGl from "react-mapbox-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import * as AppActions from "actions";

import mapConstants from "constants/map";
import regions from "constants/regions";

import Sources from "./sources";

import Crossings from "./layers-crossings";
import Geolocation from "./layers-geolocation";
import ElevatorPaths from "./layers-elevator-paths";
import Route from "./layers-route";
import Sidewalks from "./layers-sidewalks";
import Waypoints from "./layers-waypoints";
import Regions from "./layers-regions";

const CLICKABLE_LAYERS = [
  "crossing-click",
  "elevator-paths-click",
  "sidewalk-click"
];

const MapboxGL = ReactMapboxGl({
  /* eslint-disable no-undef */
  accessToken: MAPBOX_TOKEN,
  /* eslint-enable no-undef */
  minZoom: 6,
  maxZoom: 20,
  bearing: [0],
  pitch: [0]
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: [15],
      width: 0,
      height: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    const width = this.mapEl.container.clientWidth;
    const height = this.mapEl.container.clientHeight;
    if (this.state.width !== width || this.state.height !== height) {
      this.setState({
        width,
        height
      });
      this.props.actions.resizeMap(width, height);
    }
  }

  handleClick(m, e) {
    if (this.props.viewingDirections) return;

    const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
    const features = m.queryRenderedFeatures(e.point, {
      layers
    });
    const point = [e.lngLat.lng, e.lngLat.lat];

    this.props.actions.mapClick(features, point);
  }

  render() {
    const {
      actions,
      lon,
      lat,
      mediaType,
      viewingDirections,
      zoom,
      ...props
    } = this.props;

    // NOTE: Do not create actions that modify the `view` substate via
    // onMoveEnd or onZoomEnd. If you do, it creates an infinite loop.
    return (
      <MapboxGL
        className={cn("map mapboxgl-map", {
          directions: mediaType === "mobile" && viewingDirections
        })}
        ref={el => {
          this.mapEl = el;
        }}
        center={[lon, lat]}
        maxBounds={mapConstants.bounds}
        zoom={[zoom]}
        bearing={[0]}
        pitch={[0]}
        /* eslint-disable react/style-prop-object */
        style="mapbox://styles/accessmap/cjglbmftk00202tqmpidtfxk3"
        /* eslint-enable react/style-prop-object */
        onMoveEnd={(m, e) => {
          const newBounds = m.getBounds().toArray();
          const bbox = [
            newBounds[0][0],
            newBounds[0][1],
            newBounds[1][0],
            newBounds[1][1]
          ];

          if (e.originalEvent) {
            const center = m.getCenter();
            actions.mapMove(center.lng, center.lat, m.getZoom(), bbox);
          }
        }}
        onMouseMove={(m, e) => {
          const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
          const features = m.queryRenderedFeatures(e.point, {
            layers
          });
          m.getCanvas().style.cursor = features.length ? "pointer" : "default";
        }}
        onDrag={m => {
          m.getCanvas().style.cursor = "grabbing";
        }}
        onClick={this.handleClick}
        onStyleLoad={m => {
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
        {...props}
      >
        <Sources />

        <Regions />
        <Route before="crossing-click" />
        <Crossings />
        <ElevatorPaths />
        <Sidewalks />
        <Waypoints />
        <Geolocation />
      </MapboxGL>
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
