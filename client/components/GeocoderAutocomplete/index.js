import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Autocomplete from 'react-md/lib/Autocompletes';

import MapboxClient from 'mapbox/lib/services/geocoding';

import throttle from 'lodash.throttle';

const apiKey = process.env.MAPBOX_TOKEN;


export default class GeocoderAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };

    // Throttling helps us not abuse the geocoder API
    this.geocode = throttle(this.geocode.bind(this), 250);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  geocode(value) {
    if (!value) {
      this.setState({ places: [] });
      return;
    }

    // TODO: Make this more generic so it works with other geocoders
    // FIXME: don't hardcode the apiKey, add it to geocoder settings prop
    const mapboxClient = new MapboxClient(apiKey);
    const geocoderOptions = { country: 'us' };
    if (this.props.proximity) {
      geocoderOptions.proximity = {
        longitude: this.props.proximity[0],
        latitude: this.props.proximity[1],
      };
    }

    mapboxClient.geocodeForward(value, geocoderOptions)
      .then((results) => {
        this.setState({
          places: results.entity.features.map(d => ({
            name: d.place_name,
            location: d.center
          }))
        });
      });
  }

  handleOnChange(value, event) {
    if (this.props.onChange) {
      this.props.onChange(value, event);
    }
    this.geocode(value);
  }

  render() {
    const {
      className,
      ...props
    } = this.props;

    const {
      places,
    } = this.state;

    delete props.proximity;

    return (
      <Autocomplete
        {...props}
        className={className}
        data={places}
        dataLabel='name'
        deleteKeys={['location']}
        onChange={this.handleOnChange}
        listStyle={{
          paddingLeft: '16px',
        }}
      />
    );
  }
}

GeocoderAutocomplete.propTypes = {
  onChange: PropTypes.func,
  proximity: PropTypes.arrayOf(PropTypes.number)
};

GeocoderAutocomplete.defaultProps = {
  onChange: null,
  proximity: null
};
