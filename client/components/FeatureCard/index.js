import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardTitle } from 'react-md/lib/Cards';
import List from 'react-md/lib/Lists';
import ListItemText from 'react-md/lib/Lists/ListItemText';

const FeatureCard = props =>
  <Card className='feature-card md-cell md-cell--4'>
    <CardTitle title={props.title} />
    <List>
      {props.featureProperties.map(d =>
        <li className='md-list-item' key={d.name}>
          <div className='md-list-tile'>
            <ListItemText
              className='md-tile-content--right-padding'
              primaryText={d.name}
            />
            <ListItemText primaryText={d.value} />
          </div>
        </li>,
      )}
    </List>
  </Card>;

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  featureProperties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

FeatureCard.defaultProps = {
  featureProperties: [],
};

export default FeatureCard;
