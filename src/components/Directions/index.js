import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";

import DirectionsCard from "components/DirectionsCard";

import { routeResult as routeResultProps } from "prop-schema";

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

    switch (p.subclass) {
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
            return (
              <DirectionsCard
                key={key}
                distance={p.length}
                title="Cross the street"
                subtitle={p.description}
              />
            );
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
            }
            return null;
        }
      default:
        return null;
    }
  });

  return (
    <>
      <Toolbar
        title="Directions"
        actions={[
          <Button key="directions-close-button" icon onClick={onClose}>
            close
          </Button>
        ]}
      />
      <CardText className="directions--steps">{steps}</CardText>
    </>
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
