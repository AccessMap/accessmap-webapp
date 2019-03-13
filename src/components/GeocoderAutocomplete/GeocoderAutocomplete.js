import React, { Component } from "react";
import PropTypes from "prop-types";

import Autocomplete from "react-md/src/js/Autocompletes";
import MapboxClient from "mapbox/lib/services/geocoding";
import throttle from "lodash.throttle";

export default class GeocoderAutocomplete extends Component {
  state = {
    places: [],
    value: ""
  };

  geocode = value => {
    if (!value) {
      this.setState({ places: [] });
      return;
    }

    /* eslint-disable no-undef */
    const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
    /* eslint-enable no-undef */
    const geocoderOptions = { country: "us" };

    if (this.props.proximity) {
      geocoderOptions.proximity = {
        longitude: this.props.proximity[0],
        latitude: this.props.proximity[1]
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

    mapboxClient.geocodeForward(value, geocoderOptions).then(results => {
      this.setState({
        places: results.entity.features.map(d => ({
          name: d.place_name,
          location: d.center
        }))
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
    const { onAutocomplete, ...otherProps } = this.props;

    const { places } = this.state;

    return (
      <Autocomplete
        {...otherProps}
        data={places}
        dataLabel="name"
        deleteKeys={["location"]}
        onChange={this.handleOnChange}
        onAutocomplete={onAutocomplete}
      />
    );
  }
}

GeocoderAutocomplete.propTypes = {
  onAutocomplete: PropTypes.func,
  onChange: PropTypes.func,
  proximity: PropTypes.arrayOf(PropTypes.number)
};

GeocoderAutocomplete.defaultProps = {
  onAutocomplete: null,
  onChange: null,
  proximity: null
};
