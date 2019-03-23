import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import GeocoderAutocomplete from "components/GeocoderAutocomplete";

const SearchGeocoder = props => {
  const { actions, bbox, center, poiName } = props;

  return (
    <GeocoderAutocomplete
      aria-label="Search for address"
      id="search-geocoder"
      key="search-geocoder"
      className="search-geocoder md-title--toolbar"
      listClassName="toolbar-search__list"
      bbox={bbox}
      block
      placeholder="Search address"
      onAutocomplete={(label, index, data) => {
        const poi = data[index];
        actions.setPOI(poi.location[0], poi.location[1], poi.name);
      }}
      proximity={center}
      defaultValue={poiName || ""}
    />
  );
};

SearchGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  bbox: PropTypes.arrayOf(PropTypes.number),
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  poiName: PropTypes.string
};

SearchGeocoder.defaultProps = {
  bbox: null,
  poiName: null
};

const mapStateToProps = state => {
  const { map, router, waypoints } = state;

  const { lon, lat } = router.route.params;

  return {
    bbox: map.region.properties.bounds,
    center: [lon, lat],
    poiName: waypoints.poi ? waypoints.poi.name : null
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchGeocoder);
