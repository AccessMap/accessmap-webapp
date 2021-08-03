import React from "react";

import Card, { CardTitle, CardText } from "react-md/src/js/Cards";

import units from "constants/units";

interface Props {
  title: string;
  subtitle?: string;
  distance?: number;
  feet?: boolean;
}

const Step = ({
  title,
  subtitle = "",
  distance = null,
  feet = false,
}: Props) => {
  let distanceText = null;
  if (distance) {
    if (feet) {
      distanceText = `${(distance * units.feetPerMeter).toPrecision(1)} meters`;
    } else {
      distanceText = `${distance.toPrecision(1)} meters`;
    }
  }

  return (
    <Card className="step">
      <CardTitle title={title} subtitle={subtitle} />
      <CardText>{distanceText}</CardText>
    </Card>
  );
};

export default Step;
