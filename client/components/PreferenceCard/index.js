import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardText } from 'react-md/lib/Cards';
import Button from 'react-md/lib/Buttons';


export default function PreferenceCard(props) {
  const {
    actions,
    children,
    onClick
  } = props;

  return (
    <Card
      className='md-cell md-cell--4'
      style={{
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        margin: '0 auto',
        zIndex: 20
      }}
    >
      <Button
        className='md-cell--1'
        onClick={onClick}
        icon
        style={{
          position: 'absolute',
          top: 0,
          right: 0
        }}
      >
        close
      </Button>
      <CardText className='md-cell--11'>
        {children}
      </CardText>
      <CardActions>
        {actions}
      </CardActions>
    </Card>
  );
}

PreferenceCard.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func
};

PreferenceCard.defaultProps = {
  actions: {},
  children: [],
  onClick: null
};
