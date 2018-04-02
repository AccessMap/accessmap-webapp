import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import OpeningHours from 'opening_hours';

import DataTable, { TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables';


const OpeningHoursTable = (props) => {
  const {
    openingHours,
  } = props;
  // FIXME: handle 24/7

  const oh = new OpeningHours(openingHours);

  const now = new Date();
  const open = oh.getState(now);

  const curdate = new Date();
  curdate.setHours(0);
  curdate.setMinutes(0);
  const lastdate = new Date(curdate);
  lastdate.setDate(curdate.getDate() + 7);

  const days = [[], [], [], [], [], [], []];
  oh.getOpenIntervals(curdate, lastdate).map((interval) => {
    const times = [];
    for (let i = 0; i < 2; i += 1) {
      const d = interval[0];
      const hours = `${d.getHours() < 10 ? 0 : ''}${d.getHours()}`;
      const minutes = `${d.getMinutes() < 10 ? 0 : ''}${d.getMinutes()}`;
      times.push(`${hours}:${minutes}`);
    }
    days[interval[0].getDay()].push(times.join('-'));
    return times;
  });

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const rows = [];
  days.map((intervals, i) => {
    const dayName = dayNames[i];
    const description = intervals.join('; ');
    let available;
    if (now.getDay() !== i) {
      available = null;
    } else {
      available = open ? 'open' : 'closed';
    }
    rows.push({ dayName, description, available });
    return available;
  });

  return (
    <DataTable
      className='opening-hours-table'
      baseId='opening-hours-table'
      selectableRows={false}
    >
      <TableBody>
        {
          rows.map(r =>
            <TableRow
              key={r.dayName}
              className='oh-row'
            >
              <TableColumn
                className='oh-day-column'
              >
                {r.dayName}
              </TableColumn>
              <TableColumn
                className={cn('oh-time-column', {
                  'oh-time-column--open': r.available === 'open',
                  'oh-time-column--closed': r.available === 'closed',
                })}
              >
                {r.description}
              </TableColumn>
            </TableRow>,
          )
        }
      </TableBody>
    </DataTable>
  );
};


OpeningHoursTable.propTypes = {
  openingHours: PropTypes.string.isRequired,
};


export default OpeningHoursTable;
