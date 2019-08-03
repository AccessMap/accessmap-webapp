import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Card, { CardText } from "react-md/src/js/Cards";
import SVGIcon from "react-md/src/js/SVGIcons";

const MapLoadingStatus = ({ loaded }) => {
  if (loaded) return null;
  return (
    <div className="map-loading-status">
      <Card>
        <CardText>Loading Map...</CardText>
      </Card>
    </div>
  );
};

MapLoadingStatus.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  loaded: PropTypes.bool
};

MapLoadingStatus.defaultProps = {
  loaded: false
};

const mapStateToProps = state => ({
  loaded: state.map.loaded
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapLoadingStatus);
