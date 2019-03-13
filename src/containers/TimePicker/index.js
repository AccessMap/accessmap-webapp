import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import { CardText } from "react-md/src/js/Cards";
import Collapse from "react-md/src/js/Helpers/Collapse";
import { DatePicker, TimePicker } from "react-md/src/js/Pickers";

const TimePickerContainer = props => {
  const { actions, dateTime, mediaType, showTripOptions } = props;

  const isMobile = mediaType === "mobile";

  const date = new Date(dateTime);

  return (
    <Collapse collapsed={isMobile && !showTripOptions}>
      <CardText className="timepicker">
        <DatePicker
          id="date-picker"
          defaultValue={date}
          fullWidth={false}
          pickerStyle={{ zIndex: 100 }}
          onChange={(s, d) => {
            actions.setDate(d.getFullYear(), d.getMonth(), d.getDate());
          }}
        />
        <TimePicker
          id="time-picker"
          autoOk
          hoverMode
          defaultValue={date}
          fullWidth={false}
          onChange={(s, d) => actions.setTime(d.getHours(), d.getMinutes())}
        />
      </CardText>
    </Collapse>
  );
};

TimePickerContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  dateTime: PropTypes.number.isRequired,
  mediaType: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
  showTripOptions: PropTypes.bool.isRequired
};

TimePickerContainer.defaultProps = {
  mediaType: "desktop"
};

const mapStateToProps = state => {
  const { browser, routesettings } = state;

  return {
    dateTime: routesettings.dateTime,
    mediaType: browser.mediaType
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimePickerContainer);
