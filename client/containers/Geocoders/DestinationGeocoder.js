import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import { DefaultedGeocoderAutocomplete } from 'components/GeocoderAutocomplete';

const DestinationGeocoder = (props) => {
  const {
    actions,
    center,
    destinationName,
  } = props;

  return (
    <DefaultedGeocoderAutocomplete
      id='destination-geocoder'
      key='destination-geocoder'
      className='destination-geocoder md-title--toolbar'
      listClassName='toolbar-destination__list'
      block
      placeholder='End address'
      onAutocomplete={(label, index, data) => {
        const o = data[index];
        actions.setDestination(o.location[0], o.location[1], o.name);
      }}
      proximity={center}
      defaultValue={destinationName || ''}
    />
  );
};

DestinationGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  destinationName: PropTypes.string,
};

DestinationGeocoder.defaultProps = {
  destinationName: null,
};

const mapStateToProps = (state) => {
  const {
    view,
    waypoints,
  } = state;

  return {
    center: [view.lng, view.lat],
    destinationName: waypoints.destination ? waypoints.destination.properties.name : null,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestinationGeocoder);
