import React from "react";
import PropTypes from "prop-types";

import GeocoderAutocomplete from "components/GeocoderAutocomplete/GeocoderAutocomplete";

export default class DefaultedGeocoderAutocomplete extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    // This is the primary difference between this and the primary geocoderautocomplete
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({ value: nextProps.defaultValue });
    }
  }

  handleOnChange = (value, event) => {
    if (this.props.onChange) {
      this.props.onChange(value, event);
    }

    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <GeocoderAutocomplete
        {...this.props}
        value={value || ""}
        onChange={this.handleOnChange}
      />
    );
  }
}

DefaultedGeocoderAutocomplete.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};

DefaultedGeocoderAutocomplete.defaultProps = {
  defaultValue: null,
  onChange: null
};
