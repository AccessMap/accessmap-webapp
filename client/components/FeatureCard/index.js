import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';
import Card, { CardTitle } from 'react-md/lib/Cards';
import List, { ListItem } from 'react-md/lib/Lists';
import ListItemText from 'react-md/lib/Lists/ListItemText';

import './style.scss';

const FeatureCard = (props) =>
  <Card
    className='feature-card md-cell md-cell--4'
    style={{
      display: 'block',
      margin: '0 auto'
    }}
  >
    <CardTitle title={props.title} />
    <List>
      {props.featureProperties.map((d) =>
        <li className='md-list-item' key={d.name}>
          <div style={{ display: 'flex' }} className='md-list-tile'>
            <ListItemText
              className='md-tile-content--right-padding'
              primaryText={d.name}
            />
            <ListItemText primaryText={d.value}/>
          </div>
        </li>
      )}
    </List>
  </Card>

FeatureCard.propTypes = {
  title: PropTypes.string,
  featureProperties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ),
};

FeatureCard.defaultProps = {
  featureProperties: [],
};

export default FeatureCard;
