import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'react-md/lib/Buttons';
import Card, { CardActions } from 'react-md/lib/Cards';
import List from 'react-md/lib/Lists';
import ListItemText from 'react-md/lib/Lists/ListItemText';
import Toolbar from 'react-md/lib/Toolbars';

import * as AppActions from 'actions';


const FeatureCard = (props) => {
  const {
    actions,
    selectedFeature,
  } = props;

  if (!selectedFeature) { return null; }

  const title = selectedFeature.layerName
    ?
    selectedFeature.layerName
    :
    [
      selectedFeature.location[0].toFixed(5),
      selectedFeature.location[1].toFixed(5),
    ].join(', ');

  return (
    <Card
      className='feature-card md-cell md-cell--4'
    >
      <Toolbar
        title={title}
        actions={
          <Button
            icon
            onClick={actions.clearSelectedFeatures}
          >
            close
          </Button>
        }
      />
      { selectedFeature.properties &&
        <List>
          {selectedFeature.properties.map(d =>
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
      }
      <CardActions>
        <Button
          flat
          secondary
          onClick={() => {
            actions.setOrigin(
              selectedFeature.location[0],
              selectedFeature.location[1],
              'Custom origin',
            );
          }}
        >
          Route from here
        </Button>
        <Button
          flat
          secondary
          onClick={() => {
            actions.setDestination(
              selectedFeature.location[0],
              selectedFeature.location[1],
              'Custom destination',
            );
          }}
        >
          Route to here
        </Button>
      </CardActions>
    </Card>
  );
};

FeatureCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    properties: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })),
    location: PropTypes.arrayOf(PropTypes.number),
  }),
};

FeatureCard.defaultProps = { selectedFeature: null };

const mapStateToProps = state => ({
  selectedFeature: state.map.selectedFeature,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeatureCard);
