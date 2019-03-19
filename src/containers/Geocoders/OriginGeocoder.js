import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import { DefaultedGeocoderAutocomplete } from "components/GeocoderAutocomplete";

const OriginGeocoder = props => {
  const { actions, bbox, center, originName } = props;

  return (
    <DefaultedGeocoderAutocomplete
      aria-label="Search for start address"
      id="origin-geocoder"
      key="origin-geocoder"
      className="origin-geocoder md-title--toolbar"
      listClassName="toolbar-origin__list"
      bbox={bbox}
      block
      placeholder="Start address"
      onAutocomplete={(label, index, data) => {
        const o = data[index];
        actions.setOrigin(o.location[0], o.location[1], o.name);
      }}
      proximity={center}
      defaultValue={originName || ""}
    />
  );
};

OriginGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  bbox: PropTypes.arrayOf(PropTypes.number),
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  originName: PropTypes.string
};

OriginGeocoder.defaultProps = {
  bbox: null,
  originName: null
};

const mapStateToProps = state => {
  const { map, router, waypoints } = state;

  const { lon, lat } = router.route.params;

  return {
    bbox: map.region.properties.bounds,
    center: [lon, lat],
    originName: waypoints.origin ? waypoints.origin.name : null
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OriginGeocoder);
