import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from 'react-md/src/js/Autocompletes';
import MapboxClient from 'mapbox/lib/services/geocoding';
import throttle from 'lodash.throttle';


const API_KEY = process.env.MAPBOX_TOKEN;


export default class GeocoderAutocomplete extends Component {
  state = {
    places: [],
  }

  geocode = (value) => {
    if (!value) {
      this.setState({ places: [] });
      return;
    }

    const mapboxClient = new MapboxClient(API_KEY);
    const geocoderOptions = { country: 'us' };
    if (this.props.proximity) {
      geocoderOptions.proximity = {
        longitude: this.props.proximity[0],
        latitude: this.props.proximity[1],
      };
    }

    // Seattle bounding box - should derive a little more systematically,
    // eventually
    geocoderOptions.bbox = [
      -122.43791813067659,
      47.471620665946823,
      -122.22065507703849,
      47.75814927864544,
    ];

    mapboxClient.geocodeForward(value, geocoderOptions)
      .then((results) => {
        this.setState({
          places: results.entity.features.map(d => ({
            name: d.place_name,
            location: d.center,
          })),
        });
      });
  };

  throttledGeocode = throttle(this.geocode, 250);

  handleOnChange = (value, event) => {
    if (this.props.onChange) {
      this.props.onChange(value, event);
    }
    this.throttledGeocode(value);
  };

  render() {
    const {
      block,
      className,
      id,
      label,
      listClassName,
      onAutocomplete,
      placeholder,
      value,
    } = this.props;

    const {
      places,
    } = this.state;

    return (
      <Autocomplete
        id={id}
        block={block}
        className={className}
        label={label}
        listClassName={listClassName}
        textFieldClassName='md-text-field--search'
        placeholder={placeholder}
        data={places}
        dataLabel='name'
        deleteKeys={['location']}
        onChange={this.handleOnChange}
        onAutocomplete={onAutocomplete}
        value={value}
      />
    );
  }
}

GeocoderAutocomplete.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  listClassName: PropTypes.string,
  onAutocomplete: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  proximity: PropTypes.arrayOf(PropTypes.number),
  value: PropTypes.string,
};

GeocoderAutocomplete.defaultProps = {
  block: false,
  className: null,
  id: null,
  label: null,
  listClassName: null,
  onAutocomplete: null,
  onChange: null,
  placeholder: '',
  proximity: null,
  value: '',
};
