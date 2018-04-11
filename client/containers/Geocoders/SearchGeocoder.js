import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import GeocoderAutocomplete from 'components/GeocoderAutocomplete';

const SearchGeocoder = (props) => {
  const {
    actions,
    center,
    searchText,
  } = props;

  return (
    <GeocoderAutocomplete
      id='search-geocoder'
      key='search-geocoder'
      className='search-geocoder md-title--toolbar'
      listClassName='toolbar-search__list'
      block
      placeholder='Search address'
      onAutocomplete={(label, index, data) => {
        const poi = data[index];
        actions.setPOI(poi.location[0], poi.location[1], poi.name);
        actions.setSearchText(poi.name);
      }}
      proximity={center}
      onChange={(v) => { actions.setSearchText(v); }}
      value={searchText}
    />
  );
};

SearchGeocoder.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchText: PropTypes.string,
};

SearchGeocoder.defaultProps = {
  searchText: '',
};

const mapStateToProps = (state) => {
  const {
    tripplanning,
    view,
  } = state;

  return {
    center: [view.lng, view.lat],
    searchText: tripplanning.geocoderText.searchText,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchGeocoder);
