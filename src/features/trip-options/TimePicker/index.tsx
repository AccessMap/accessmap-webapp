import React from "react";

import { CardText } from "react-md/src/js/Cards";
import Collapse from "react-md/src/js/Helpers/Collapse";
import {
  DatePicker,
  TimePicker as ReactMDTimePicker,
} from "react-md/src/js/Pickers";

import { useAppSelector, useAppDispatch } from "hooks";
import { setDate, setTime } from "features/trip-options/trip-options-slice";

const TimePicker = ({ showTripOptions = false }) => {
  const dispatch = useAppDispatch();
  const { mediaType } = useAppSelector((state) => state.browser);
  const { dateTime } = useAppSelector((state) => state.tripOptions);

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
            dispatch(
              setDate({
                year: d.getFullYear(),
                month: d.getMonth(),
                date: d.getDate(),
              })
            );
          }}
        />
        <ReactMDTimePicker
          id="time-picker"
          autoOk
          hoverMode
          defaultValue={date}
          fullWidth={false}
          onChange={(s, d) =>
            dispatch(
              setTime({
                hours: d.getHours(),
                minutes: d.getMinutes(),
              })
            )
          }
        />
      </CardText>
    </Collapse>
  );
};

export default TimePicker;
