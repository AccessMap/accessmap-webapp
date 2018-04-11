import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import GeocoderAutocomplete from 'components/GeocoderAutocomplete';

const OriginGeocoder = (props) => {
  const {
    actions,
    center,
    originText,
  } = props;

  return (
    <GeocoderAutocomplete
      id='origin-geocoder'
      key='origin-geocoder'
      className='origin-geocoder md-title--toolbar'
      listClassName='toolbar-origin__list'
      block
      placeholder='Start address'
      proximity={center}
      onAutocomplete={(label, index, data) => {
        actions.setOriginText(data[index].name);
        const o = data[index];
        actions.setOrigin(o.location[0], o.location[1], o.name);
      }}
      onChange={(v) => { actions.setOriginText(v); }}
      value={originText}
    />
  );
};

OriginGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  originText: PropTypes.string,
};

OriginGeocoder.defaultProps = {
  originText: '',
};

const mapStateToProps = (state) => {
  const {
    tripplanning,
    view,
  } = state;

  return {
    center: [view.lng, view.lat],
    originText: tripplanning.geocoderText.originText,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OriginGeocoder);
