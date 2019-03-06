import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Card from "react-md/lib/Cards";

import { getCurrentProfile } from "selectors";

import SpeedLegend from "components/SpeedLegend";

const Legend = props => {
  const { isDownhill, maxUphill, maxDownhill, maxSpeed } = props;

  return (
    <div className="legend">
      <Card>
        <SpeedLegend
          n={15}
          isDownhill={isDownhill}
          maxUphill={maxUphill}
          maxDownhill={maxDownhill}
          maxSpeed={maxSpeed}
        />
      </Card>
    </div>
  );
};

Legend.propTypes = {
  isDownhill: PropTypes.bool.isRequired,
  maxUphill: PropTypes.number.isRequired,
  maxDownhill: PropTypes.number.isRequired,
  maxSpeed: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  const currentProfile = getCurrentProfile(state);
  return {
    isDownhill: state.profile.editorMode == "DOWNHILL",
    maxUphill: currentProfile.inclineMax,
    maxDownhill: currentProfile.inclineMin,
    maxSpeed: currentProfile.speed
  };
};

export default connect(mapStateToProps)(Legend);
