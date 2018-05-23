import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import { DefaultedGeocoderAutocomplete } from 'components/GeocoderAutocomplete';

const OriginGeocoder = (props) => {
  const {
    actions,
    center,
    originName,
  } = props;

  return (
    <DefaultedGeocoderAutocomplete
      id='origin-geocoder'
      key='origin-geocoder'
      className='origin-geocoder md-title--toolbar'
      listClassName='toolbar-origin__list'
      block
      placeholder='Start address'
      onAutocomplete={(label, index, data) => {
        const o = data[index];
        actions.setOrigin(o.location[0], o.location[1], o.name);
      }}
      proximity={center}
      defaultValue={originName || ''}
    />
  );
};

OriginGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  originName: PropTypes.string,
};

OriginGeocoder.defaultProps = {
  originName: null,
};

const mapStateToProps = (state) => {
  const {
    router,
    waypoints,
  } = state;

  const { lon, lat } = router.route.params;

  return {
    center: [lon, lat],
    originName: waypoints.origin ? waypoints.origin.name : null,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OriginGeocoder);
