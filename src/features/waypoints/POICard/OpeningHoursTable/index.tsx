import React from "react";

import cn from "classnames";
import OpeningHours from "opening_hours";

import DataTable, {
  TableBody,
  TableRow,
  TableColumn,
} from "react-md/src/js/DataTables";

interface Props {
  openingHours: string;
}

const OpeningHoursTable = ({ openingHours }: Props) => {
  const oh = new OpeningHours(openingHours);

  const now = new Date();
  const open = oh.getState(now);

  const curdate = new Date();
  curdate.setHours(0);
  curdate.setMinutes(0);
  const lastdate = new Date(curdate);
  lastdate.setDate(curdate.getDate() + 7);

  const dateToString = (date) => {
    const hours = `${date.getHours() < 10 ? 0 : ""}${date.getHours()}`;
    const minutes = `${date.getMinutes() < 10 ? 0 : ""}${date.getMinutes()}`;
    return `${hours}:${minutes}`;
  };

  let days;
  if (open && oh.getNextChange() === undefined) {
    days = Array(7).fill(["00:00-24:00"]);
  } else {
    days = [[], [], [], [], [], [], []];

    oh.getOpenIntervals(curdate, lastdate).map((interval) => {
      const times = [dateToString(interval[0]), dateToString(interval[1])];

      days[interval[0].getDay()].push(times.join("-"));
      return times;
    });
  }

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const rows = [];
  days.map((intervals, i) => {
    const dayName = dayNames[i];
    const description = intervals.join("; ");
    let available;
    if (now.getDay() !== i) {
      available = null;
    } else {
      available = open ? "open" : "closed";
    }
    rows.push({ dayName, description, available });
    return available;
  });

  return (
    <DataTable
      className="opening-hours-table"
      baseId="opening-hours-table"
      selectableRows={false}
    >
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.dayName} className="oh-row">
            <TableColumn className="oh-day-column">{r.dayName}</TableColumn>
            <TableColumn
              className={cn("oh-time-column", {
                "oh-time-column--open": r.available === "open",
                "oh-time-column--closed": r.available === "closed",
              })}
            >
              {r.description}
            </TableColumn>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
};

export default OpeningHoursTable;
