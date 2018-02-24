import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Autocomplete from 'react-md/lib/Autocompletes';

import MapboxClient from 'mapbox/lib/services/geocoding';

import throttle from 'lodash.throttle';

const API_KEY = process.env.MAPBOX_TOKEN;


export default class GeocoderAutocomplete extends Component {
  state = {
    places: [],
  }

  _geocode = (value) => {
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
      47.75814927864544
    ];

    mapboxClient.geocodeForward(value, geocoderOptions)
      .then((results) => {
        this.setState({
          places: results.entity.features.map(d => ({
            name: d.place_name,
            location: d.center
          }))
        });
      });
  };

  geocode = throttle(this._geocode, 250);

  handleOnChange = (value, event) => {
    if (this.props.onChange) {
      this.props.onChange(value, event);
    }
    this.geocode(value);
  };

  render() {
    const {
      className,
      data,
      id,
      label,
      onAutocomplete,
      onChange,
      proximity,
      value,
    } = this.props;

    const {
      places,
    } = this.state;

    return (
      <Autocomplete
        id={id}
        className={className}
        label={label}
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
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onAutocomplete: PropTypes.func,
  onChange: PropTypes.func,
  proximity: PropTypes.arrayOf(PropTypes.number),
  value: PropTypes.string,
};

GeocoderAutocomplete.defaultProps = {
  className: null,
  id: null,
  label: null,
  onAutocomplete: null,
  onChange: null,
  proximity: null,
  value: ''
};
