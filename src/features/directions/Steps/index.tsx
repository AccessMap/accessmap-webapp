import React from "react";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";

import Step from "./Step";

import { RouteResult } from "types";

interface Props {
  onClose?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
  routeResult?: RouteResult;
}

const Steps = ({ onClose = null, routeResult = null }: Props) => {
  const stepsData = routeResult.routes[0].segments.features;
  const origin = routeResult.origin.geometry.coordinates;
  const destination = routeResult.destination.geometry.coordinates;

  const steps = stepsData.map((d, i) => {
    // Transform raw data into ListItems
    // TODO: create a dedicated 'directions step' component
    const p = d.properties;

    const key = `step-${origin}-${destination}-${i}`;

    switch (p.subclass) {
      case "footway":
        switch (p.footway) {
          case "sidewalk":
            return (
              <Step
                key={key}
                distance={p.length}
                title="Use the sidewalk"
                subtitle={p.description}
              />
            );
          case "crossing":
            return (
              <Step
                key={key}
                distance={p.length}
                title="Cross the street"
                subtitle={p.description}
              />
            );
          default:
            if (p.elevator) {
              return (
                <Step
                  key={key}
                  distance={p.length}
                  title={`Use ${p.indoor ? "indoor" : "outdoor"} elevator`}
                  subtitle={p.description}
                />
              );
            }
            return (
              <Step
                key={key}
                distance={p.length !== null && p.length}
                title={"Use footway"}
                subtitle={p.description && p.description}
              />
            );
        }
      case "steps":
        return (
          <Step
            key={key}
            distance={p.length !== null && p.length}
            title={"Use stairs"}
            subtitle={p.description && p.description}
          />
        );
      // TODO: catch the specific cases of roads instead. Default should
      // return null
      default:
        return (
          <Step
            key={key}
            distance={p.length !== null && p.length}
            title={`Use ${p.subclass} road`}
            subtitle={p.description && p.description}
          />
        );
    }
  });

  return (
    <>
      <Toolbar
        title="Directions"
        actions={[
          <Button key="steps-close-button" icon onClick={onClose}>
            close
          </Button>,
        ]}
      />
      <CardText className="steps">{steps}</CardText>
    </>
  );
};

export default Steps;
