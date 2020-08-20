import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "react-md/src/js/Buttons";
import Card, { CardActions } from "react-md/src/js/Cards";
import DataTable, {
  TableBody,
  TableRow,
  TableColumn
} from "react-md/src/js/DataTables";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import OpeningHoursTable from "components/OpeningHoursTable";

import * as AppActions from "actions";

import close from "icons/close.svg";

const SURFACE_MAP = {
  asphalt: "Asphalt",
  concrete: "Concrete",
  gravel: "Gravel",
  paving_stone: "Paving stones",
  paving_stones: "Paving stones"
};

const ContentRow = props => (
  <TableRow>
    <TableColumn>{props.label}</TableColumn>
    <TableColumn>{props.content}</TableColumn>
  </TableRow>
);

ContentRow.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

const getFeatureType = properties => {
  switch (properties.subclass) {
    case "footway":
      switch (properties.footway) {
        case "sidewalk":
          return "Sidewalk";
        case "crossing":
          return "Crossing";
        default:
          return "Footway";
      }
    case "service":
      return "Service";
    case "pedestrian":
      return "Pedestrian";
    case "path":
      return "Path";
    case "steps":
      return "Steps";
  }
  switch (properties.amenity) {
    case "bench":
      return "Bench";
    case "waste_basket":
      return "Trash Can";
  }
  switch (properties.traffic_signals) {
    case "request_button":
      return "Request Button";
    case "pedestrian_crossing":
      return "Pedestrian Crossing";
  }
  switch (properties.traffic_sign) {
    case "yes":
      return "Traffic Sign";
    // default:
    // return "Traffic Sign";
  }
  switch (properties.barrier) {
    case "bollard":
      return "Bollard";
  }
  switch (properties.highway) {
    case "street_lamp":
      return "Street Lamp";
    case "stop":
      return "Stop Sign";
  }
  switch (properties.man_made) {
    case "manhole":
      return "Manhole";
  }
  switch (properties.kerb) {
    case "flush":
      return "Flush Kerb";
    case "lowered":
      return "Lowered Kerb";
    case "raised":
      return "Raised Kerb";
    case "rolled":
      return "Rolled Kerb";
  }
  switch (properties.tactile_paving) {
    case 1:
      return "Tactile Paving";
  }
  return null;
};
/* if (properties.hasOwnProperty("footway")) {
    switch (properties.footway) {
      case "sidewalk":
        console.log("sidewalk")
        return "Sidewalk";
      case "crossing":
        return "Crossing";
      default:
        return "Footway";
    }
  }
  if (properties.hasOwnProperty("pedestrian")) {
    console.log("pedestrian")
    return "Pedestrian Street";
  }
  if (properties.hasOwnProperty("service")) {
    console.log("service")
    return "Service Road";
  }
  return null; */

const FeatureCard = props => {
  const { actions, selectedFeature } = props;

  if (!selectedFeature) return null;
  if (!selectedFeature.properties) selectedFeature.properties = {};

  const { properties } = selectedFeature;

  const {
    curbramps,
    tactile_paving,
    crossing,
    traffic_signals,
    traffic_signals_sound,
    button_operated,
    handrail,
    step_count,
    description,
    incline,
    indoor,
    opening_hours,
    surface
  } = properties;

  // What kind of feature is it?
  const featureType = getFeatureType(properties);

  const title =
    featureType ||
    [
      selectedFeature.location[1].toFixed(6),
      selectedFeature.location[0].toFixed(6)
    ].join(", ");

  let markedCrossing;
  if (featureType === "Crossing") {
    switch (crossing) {
      case "marked":
        markedCrossing = "Yes";
        break;
      case "unmarked":
        markedCrossing = "No";
        break;
      default:
        markedCrossing = "Unknown";
        break;
    }
  }

  let crossingControl;
  if (featureType === "Crossing") {
    switch (traffic_signals) {
      case "traffic_lights":
        crossingControl = "Traffic Lights";
        break;
      case "stop_sign":
        crossingControl = "Stop Sign";
        break;
      case "pedestrian_sign":
        crossingControl = "Pedestrian Sign";
        break;
      case "no":
        crossingControl = "None";
        break;
      default:
        crossingControl = "Unknown";
        break;
    }
  }

  return (
    <Card className="feature-card md-cell md-cell--4">
      <Toolbar
        title={title}
        actions={
          <Button
            aria-label="Close point of interest popup"
            icon
            svg
            onClick={actions.clearSelectedFeatures}
          >
            <SVGIcon use={close.url} />
          </Button>
        }
      />
      <DataTable className="feature-card-body" plain>
        <TableBody>
          {description !== undefined ? (
            <ContentRow label="Description" content={description} />
          ) : null}
          {opening_hours !== undefined ? (
            <ContentRow
              label="Open Hours"
              content={<OpeningHoursTable openingHours={opening_hours} />}
            />
          ) : null}
          {curbramps !== undefined ? (
            <ContentRow label="Curbramps" content={curbramps ? "Yes" : "No"} />
          ) : null}
          {tactile_paving !== undefined ? (
            <ContentRow
              label="Tactile Paving"
              content={tactile_paving ? "Yes" : "No"}
            />
          ) : null}
          {markedCrossing ? (
            <ContentRow label="Marked Crosswalk" content={markedCrossing} />
          ) : null}
          {crossingControl ? (
            <ContentRow label="Traffic Control" content={crossingControl} />
          ) : null}
          {traffic_signals_sound !== undefined ? (
            <ContentRow
              label="Audible Pedestrian Signal"
              content={traffic_signals_sound ? "Yes" : "Unknown"}
            />
          ) : null}
          {button_operated !== undefined ? (
            <ContentRow
              label="Button Operated Pedestrian Signal"
              content={button_operated ? "Yes" : "Unknown"}
            />
          ) : null}
          {step_count !== undefined ? (
            <ContentRow label="Step Count" content={step_count} />
          ) : null}
          {handrail !== undefined ? (
            <ContentRow label="Handrail" content={handrail} />
          ) : null}
          {incline !== undefined ? (
            <ContentRow
              label="Incline"
              content={`${Math.abs((incline * 100).toFixed(1))}%`}
            />
          ) : null}
          {surface !== undefined ? (
            <ContentRow label="Surface" content={SURFACE_MAP[surface]} />
          ) : null}
          {indoor !== undefined ? (
            <ContentRow label="Indoor" content={indoor ? "Yes" : "No"} />
          ) : null}
        </TableBody>
      </DataTable>
      <CardActions>
        <Button
          flat
          primary
          onClick={() => {
            actions.setOrigin(
              selectedFeature.location[0],
              selectedFeature.location[1],
              [
                selectedFeature.location[1].toFixed(6),
                selectedFeature.location[0].toFixed(6)
              ].join(", ")
            );
          }}
        >
          Route from here
        </Button>
        <Button
          flat
          primary
          onClick={() => {
            actions.setDestination(
              selectedFeature.location[0],
              selectedFeature.location[1],
              [
                selectedFeature.location[1].toFixed(6),
                selectedFeature.location[0].toFixed(6)
              ].join(", ")
            );
          }}
        >
          Route to here
        </Button>
      </CardActions>
    </Card>
  );
};

FeatureCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number),
    properties: PropTypes.object
  })
};

FeatureCard.defaultProps = { selectedFeature: null };

const mapStateToProps = state => ({
  selectedFeature: state.map.selectedFeature
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureCard);
