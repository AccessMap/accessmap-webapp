import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Card from "react-md/lib/Cards";

import { getCurrentProfile } from "selectors";

import SpeedLegend from "components/SpeedLegend";

const BottomBar = props => {
  const { isDownhill, uphillMax, downhillMax, maxSpeed } = props;

  return (
    <Card className="bottom-bar">
      <SpeedLegend
        n={15}
        isDownhill={isDownhill}
        uphillMax={uphillMax}
        downhillMax={downhillMax}
        maxSpeed={maxSpeed}
      />
    </Card>
  );
};

BottomBar.propTypes = {
  isDownhill: PropTypes.bool.isRequired,
  uphillMax: PropTypes.number.isRequired,
  downhillMax: PropTypes.number.isRequired,
  maxSpeed: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  const currentProfile = getCurrentProfile(state);
  return {
    isDownhill: state.profile.editorMode == "DOWNHILL",
    uphillMax: currentProfile.uphillMax,
    downhillMax: currentProfile.downhillMax,
    maxSpeed: currentProfile.speed
  };
};

export default connect(mapStateToProps)(BottomBar);
