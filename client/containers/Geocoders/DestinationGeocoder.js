import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import GeocoderAutocomplete from 'components/GeocoderAutocomplete';

const DestinationGeocoder = (props) => {
  const {
    actions,
    center,
    destinationText,
  } = props;

  return (
    <GeocoderAutocomplete
      id='destination-geocoder'
      key='destination-geocoder'
      className='destination-geocoder md-title--toolbar'
      listClassName='toolbar-destination__list'
      block
      placeholder='End address'
      proximity={center}
      onAutocomplete={(label, index, data) => {
        actions.setDestinationText(data[index].name);
        const o = data[index];
        actions.setDestination(o.location[0], o.location[1], o.name);
      }}
      onChange={(v) => { actions.setDestinationText(v); }}
      value={destinationText}
    />
  );
};

DestinationGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  destinationText: PropTypes.string,
};

DestinationGeocoder.defaultProps = {
  destinationText: '',
};

const mapStateToProps = (state) => {
  const {
    tripplanning,
    view,
  } = state;

  return {
    center: [view.lng, view.lat],
    destinationText: tripplanning.geocoderText.destinationText,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestinationGeocoder);
