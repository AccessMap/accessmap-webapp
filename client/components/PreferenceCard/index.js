import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Card, { CardText, CardTitle } from 'react-md/lib/Cards';
import SelectionControl from 'react-md/lib/SelectionControls';
import InclineSlider from 'components/InclineSlider';

const PreferenceCard = (props) => {
  const {
    inclineMin,
    inclineMax,
    curbramps,
    onUphillChange,
    onDownhillChange,
    onCurbRampsChange,
    onDownhillMouseEnter,
    onDownhillMouseLeave,
    style,
  } = props;

  return (
    <Card className={cn('md-cell--3')} style={style}>
      <CardTitle title='Preferences' />
      <CardText>
        <InclineSlider
          id='uphill_discrete'
          label='Maximum uphill incline'
          incline={inclineMax}
          max={10}
          step={0.5}
          valuePrecision={1}
          onChange={onUphillChange}
        />
        <InclineSlider
          id='downhill_discrete'
          label='Maximum downhill incline'
          incline={-inclineMin}
          max={10}
          step={0.5}
          valuePrecision={1}
          onChange={onDownhillChange}
          onMouseEnter={onDownhillMouseEnter}
          onMouseLeave={onDownhillMouseLeave}
        />
        <SelectionControl
          type='switch'
          checked={curbramps}
          id='require_curbramps'
          label='Require curbramps'
          name='require_curbramps_toggle'
          onChange={onCurbRampsChange}
        />
      </CardText>
    </Card>
  );
}

PreferenceCard.defaultProps = {
  onDownhillMouseEnter: null,
  onDownhillMouseLeave: null,
}

export default PreferenceCard;
