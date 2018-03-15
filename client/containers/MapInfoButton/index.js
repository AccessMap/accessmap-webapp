import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';
import Card, { CardText } from 'react-md/lib/Cards';
import List, { ListItem } from 'react-md/lib/Lists';
import SVGIcon from 'react-md/lib/SVGIcons';
import Toolbar from 'react-md/lib/Toolbars';

import SidewalkIcon from 'components/Icons/SidewalkIcon';
import { SIDEWALK_FLAT, SIDEWALK_MID, SIDEWALK_STEEP } from 'constants/colors';


const MapInfoButton = (props) => {
  const {
    actions,
    mediaType,
    viewingMapInfo,
  } = props;

  const button = (
    <div className='mapinfo'>
      <Button
        floating
        secondary
        tooltipLabel='Map Legend'
        tooltipPosition='left'
        onClick={actions.viewMapInfo}
      >
        information
      </Button>
    </div>
  );

  const mapInfo = (
    <div className='mapinfo'>
      <Card>
        <Toolbar
          title='Map legend'
          actions={[
            <Button
              icon
              onClick={actions.closeMapInfo}
            >
              close
            </Button>
          ]}
        />
        <List>
          <ListItem
            leftAvatar={
              <SidewalkIcon
                fill={SIDEWALK_FLAT}
                size={48}
              />
            }
            primaryText='Flat sidewalk'
          />
          <ListItem
            leftAvatar={
              <SidewalkIcon
                fill={SIDEWALK_MID}
                size={48}
              />
            }
            primaryText='Medium sidewalk'
          />
          <ListItem
            leftAvatar={
              <SidewalkIcon
                fill={SIDEWALK_STEEP}
                size={48}
              />
            }
            primaryText='Steep sidewalk'
          />
          <ListItem
            leftAvatar={
              <SVGIcon
                className='inaccessible-icon'
                viewBox={'0 0 48 12'}
                size={48}
              >
                <path
                  d='m2,6 46,0'
                  stroke='#f00'
                  strokeWidth='1'
                  strokeDasharray='2,1'
                />
              </SVGIcon>
            }
            primaryText='Inaccessible path'
          />
          <ListItem
            leftAvatar={
              <SidewalkIcon
                fill='none'
                size={48}
              />
            }
            primaryText='Unmarked crossing'
          />
          <ListItem
            leftAvatar={
              <SVGIcon
                className='sidewalk-icon'
                viewBox={'0 0 48 12'}
                size={48}
              >
                <rect
                  x='2'
                  y='2'
                  width='44'
                  height='8'
                  ry='3.44'
                  opacity='0.97'
                  stroke='#000'
                  strokeWidth='.5'
                  fill='#555'
                />
                <rect
                  x='3'
                  y='4'
                  width='42'
                  height='4'
                  ry='3.44'
                  opacity='0.97'
                  stroke='#fff'
                  strokeWidth='1.5'
                  fill='none'
                />
              </SVGIcon>
            }
            primaryText='Marked crossing'
          />
        </List>
      </Card>
    </div>
  );

  if (viewingMapInfo) {
    return mapInfo;
  }

  return button;
};

MapInfoButton.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.oneOf(['MOBILE', 'TABLET', 'DESKTOP']),
  viewingMapInfo: PropTypes.bool,
};

MapInfoButton.defaultProps = {
  planningTrip: false,
  mediaType: 'DESKTOP',
  viewingMapInfo: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  viewingMapInfo: state.activities.viewingMapInfo,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapInfoButton);
