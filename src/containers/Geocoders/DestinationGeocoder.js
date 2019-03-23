import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import { DefaultedGeocoderAutocomplete } from "components/GeocoderAutocomplete";

const DestinationGeocoder = props => {
  const { actions, bbox, center, destinationName } = props;

  return (
    <DefaultedGeocoderAutocomplete
      aria-label="Search for destination address"
      id="destination-geocoder"
      key="destination-geocoder"
      className="destination-geocoder md-title--toolbar"
      listClassName="toolbar-destination__list"
      bbox={bbox}
      block
      placeholder="End address"
      onAutocomplete={(label, index, data) => {
        const o = data[index];
        actions.setDestination(o.location[0], o.location[1], o.name);
      }}
      proximity={center}
      defaultValue={destinationName || ""}
    />
  );
};

DestinationGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  bbox: PropTypes.arrayOf(PropTypes.number),
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  destinationName: PropTypes.string
};

DestinationGeocoder.defaultProps = {
  bbox: null,
  destinationName: null
};

const mapStateToProps = state => {
  const { map, router, waypoints } = state;

  const { lon, lat } = router.route.params;

  return {
    bbox: map.region.properties.bounds,
    center: [lon, lat],
    destinationName: waypoints.destination ? waypoints.destination.name : null
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationGeocoder);
