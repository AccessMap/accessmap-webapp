import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";

import DirectionsCard from "components/DirectionsCard";

import { routeResult as routeResultProps } from "prop-schema";

/* const getLandmarkArray = linRefList => {
  linRefList = linRefList.replace(/[\[\]']+/g, "");
  linRefList = linRefList.replace(/[\(\)']+/g, "");
  linRefList = linRefList.replace(/[\'']+/g, "");
  linRefList = linRefList.split(",");
  return linRefList;
};

const formatLandmarkText = (lmarkArray, dist) => {
  var lmarkString = "";
  var i;
  var name;
  var lmarkDist;
  for (i = 0; i < lmarkArray.length / 2; i++) {
    name = lmarkArray[i * 2];
    lmarkDist = dist * parseFloat(lmarkArray[i * 2 + 1]);
    lmarkString = lmarkString + name + " " + lmarkDist + " ";
  }
  return lmarkString;
}; */

const stepSubtitle = stepCount => {
  return "There are " + stepCount + " steps.";
};

const Directions = props => {
  const { onClose, routeResult } = props;

  // const stepsData = routeResult.routes[0].legs[0];
  const stepsData = routeResult.routes[0].segments.features;
  const steps = stepsData.map((d, i) => {
    // Transform raw data into ListItems
    // TODO: create a dedicated 'directions step' component
    const p = d.properties;

    const origin = routeResult.origin.geometry.coordinates;
    const destination = routeResult.destination.geometry.coordinates;
    const key = `step-${origin}-${destination}-${i}`;
    // const landmarkArray = getLandmarkArray(p.lin_ref_list);
    // const landmarkString = formatLandmarkText(landmarkArray, p.length);

    switch (p.subclass) {
      case "steps":
        var sub = "Unknown number of steps.";
        if (p.step_count) {
          sub = stepSubtitle(p.step_count);
        }
        return (
          <DirectionsCard
            key={key}
            distance={p.length}
            title="Take the stairs"
            subtitle={sub}
          />
        );
      case "ped_cycleway":
        return (
          <DirectionsCard
            key={key}
            distance={p.length}
            title="Walk on the cycleway. Be careful!"
            subtitle={p.description}
          />
        );
      case "footway":
        switch (p.footway) {
          case "sidewalk":
            return (
              <DirectionsCard
                key={key}
                distance={p.length}
                title="Use the sidewalk"
                subtitle={p.description}
              />
            );
          case "crossing":
            switch (p.traffic_signals) {
              case "traffic_lights":
                return (
                  <DirectionsCard
                    key={key}
                    distance={p.length}
                    title="Cross the street at the light"
                    subtitle={p.description}
                  />
                );
              case "stop_sign":
                return (
                  <DirectionsCard
                    key={key}
                    distance={p.length}
                    title="Cross the street at the stop sign"
                    subtitle={p.description}
                  />
                );
              case "pedestrian_sign":
                return (
                  <DirectionsCard
                    key={key}
                    distance={p.length}
                    title="Cross the street at the yield sign"
                    subtitle={p.description}
                  />
                );
              case "no":
                return (
                  <DirectionsCard
                    key={key}
                    distance={p.length}
                    title="Cross the street. Be careful!"
                    subtitle={p.description}
                  />
                );
              default:
                return (
                  <DirectionsCard
                    key={key}
                    distance={p.length}
                    title="Cross the street"
                    subtitle={p.description}
                  />
                );
            }
          default:
            if (p.elevator) {
              return (
                <DirectionsCard
                  key={key}
                  distance={p.length}
                  title={`Use ${p.indoor ? "indoor" : "outdoor"} elevator`}
                  subtitle={p.description}
                />
              );
            } else {
              return (
                <DirectionsCard
                  key={key}
                  distance={p.length}
                  title="Walk on the path"
                  subtitle={p.description}
                />
              );
            }
            return null;
        }
      default:
        return null;
    }
  });

  return (
    <React.Fragment>
      <Toolbar
        title="Directions"
        actions={[
          <Button key="directions-close-button" icon onClick={onClose}>
            close
          </Button>
        ]}
      />
      <CardText className="directions--steps">{steps}</CardText>
    </React.Fragment>
  );
};

Directions.propTypes = {
  onClose: PropTypes.func,
  routeResult: routeResultProps
};

Directions.defaultProps = {
  onClose: null,
  routeResult: null
};

export default Directions;
