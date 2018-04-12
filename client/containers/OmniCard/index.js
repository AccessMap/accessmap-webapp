import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import { pointFeature } from 'prop-schema';

import Button from 'react-md/src/js/Buttons';
import Card, { CardActions, CardText } from 'react-md/src/js/Cards';
import Collapse from 'react-md/src/js/Helpers/Collapse';
import { DatePicker, TimePicker } from 'react-md/src/js/Pickers';
import { ResizeObserver } from 'react-md/src/js/Helpers';
import SVGIcon from 'react-md/src/js/SVGIcons';
import Toolbar from 'react-md/src/js/Toolbars';
import Tooltipped from 'react-md/src/js/Tooltips/Tooltipped';

import DestinationGeocoder from 'containers/Geocoders/DestinationGeocoder';
import OriginGeocoder from 'containers/Geocoders/OriginGeocoder';
import SearchGeocoder from 'containers/Geocoders/SearchGeocoder';

import ProfileList from 'containers/ProfileList';

import CurbRampsToggle from 'containers/Settings/CurbRampsToggle';
import DownhillSlider from 'containers/Settings/DownhillSlider';
import UphillSlider from 'containers/Settings/UphillSlider';

import directions from 'icons/directions.svg';
import magnify from 'icons/magnify.svg';
import pencil from 'icons/pencil.svg';


const OmniCard = (props) => {
  const {
    actions,
    dateTime,
    destination,
    mediaType,
    origin,
    planningTrip,
    profileName,
    settingProfile,
    showTripOptions,
    viewingMapInfo,
  } = props;

  const isMobile = mediaType === 'MOBILE';

  if (isMobile && settingProfile) return null;
  if (isMobile && viewingMapInfo) return null;

  let topBar;
  if (planningTrip) {
    topBar = (
      <React.Fragment>
        <Toolbar
          className='geocoder-toolbar'
          nav={<div>A</div>}
          title={<OriginGeocoder />}
          actions={[
            <Button
              onClick={() => actions.toggleTripPlanning(planningTrip)}
              key='tripplanning--close'
              icon
              tooltipLabel='Close'
              tooltipPosition='left'
            >
              close
            </Button>,
          ]}
        />
        <Toolbar
          className='geocoder-toolbar'
          nav={<div>B</div>}
          title={<DestinationGeocoder />}
          actions={[
            <Button
              className='md-btn--toolbar'
              key='tripplanning--swap-waypoints'
              icon
              tooltipLabel='Swap start and end'
              tooltipPosition='left'
              onClick={() => {
                actions.swapWaypoints(origin, destination);
              }}
            >
              swap_vert
            </Button>,
          ]}
        />
      </React.Fragment>
    );
  } else {
    topBar = (
      <Toolbar
        className='geocoder-toolbar'
        title={<SearchGeocoder />}
        actions={[
          <SVGIcon
            className={cn('md-btn--toolbar search-icon')}
            use={magnify.url}
          />,
          <Button
            className='md-btn--toolbar'
            key='omnicard-tripplanning--toggle'
            icon
            secondary
            svg
            tooltipLabel='Plan a trip'
            tooltipPosition='left'
            onClick={() => actions.toggleTripPlanning(planningTrip)}
          >
            <SVGIcon use={directions.url} />
          </Button>,
        ]}
      />
    );
  }

  const profileActions = [
  ];

  if (isMobile) {
    profileActions.push(
      <Button
        icon
        svg
        tooltipLabel='Edit profile settings'
        tooltipPosition='left'
        onClick={() => actions.toggleSettingProfile(settingProfile)}
      >
        <SVGIcon use={pencil.url} />
      </Button>,
    );
    if (planningTrip) {
      profileActions.push(
        <Tooltipped
          label='Show trip options'
          position='left'
        >
          <Button
            icon
            className='md-fake-btn md-icon md-btn--icon md-inline-block'
            onClick={() => {
              if (showTripOptions) {
                actions.hideTripOptions();
              } else {
                actions.showTripOptions();
              }
            }}
          >
            <i
              className={cn('md-icon material-icons md-collapser', {
                'md-collapser--flipped': showTripOptions,
              })}
            >
              keyboard_arrow_down
            </i>
          </Button>
        </Tooltipped>,
      );
    }
  }

  const date = new Date(dateTime);

  const timePicker = (
    <Collapse collapsed={isMobile && !showTripOptions}>
      <CardText className='timepicker'>
        <DatePicker
          id='date-picker'
          defaultValue={date}
          fullWidth={false}
          pickerStyle={{ zIndex: 100 }}
          onChange={(s, d) => {
            actions.setDate(d.getFullYear(), d.getMonth(),
                            d.getDate());
          }}
        />
        <TimePicker
          id='time-picker'
          autoOk
          hoverMode
          defaultValue={date}
          fullWidth={false}
          onChange={(s, d) => actions.setTime(d.getHours(), d.getMinutes())}
        />
      </CardText>
    </Collapse>
  );

  return (
    <Card className='omnicard'>
      {topBar}
      <Toolbar
        className='profiles-toolbar'
        nav={<ProfileList />}
        actions={profileActions}
      />
      {!isMobile ?
        <CardText>
          <UphillSlider />
          <DownhillSlider />
          <CurbRampsToggle />
        </CardText> :
        null
      }
      {!isMobile ?
        <CardActions>
          <Button
            flat
            primary
            onClick={() => actions.setProfileDefault(profileName)}
          >
            Reset to defaults
          </Button>
        </CardActions> :
        null
      }
      {planningTrip ? timePicker : null}
      <ResizeObserver
        watchWidth
        watchHeight
        onResize={({ height, width }) => {
          if (planningTrip) {
            actions.resizeOmniCard(height, width);
          }
        }}
      />
    </Card>
  );
};

OmniCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  dateTime: PropTypes.number.isRequired,
  destination: pointFeature({ name: PropTypes.string }),
  origin: pointFeature({ name: PropTypes.string }),
  mediaType: PropTypes.oneOf(['MOBILE', 'TABLET', 'DESKTOP']),
  planningTrip: PropTypes.bool,
  profileName: PropTypes.string.isRequired,
  settingProfile: PropTypes.bool,
  showTripOptions: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
};

OmniCard.defaultProps = {
  destination: null,
  origin: null,
  mediaType: 'DESKTOP',
  planningTrip: false,
  settingProfile: false,
  showTripOptions: false,
  viewingMapInfo: false,
};

const mapStateToProps = (state) => {
  const {
    activities,
    browser,
    profile,
    tripplanning,
    waypoints,
  } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    dateTime: tripplanning.dateTime,
    destination: waypoints.destination,
    origin: waypoints.origin,
    mediaType: browser.mediaType,
    planningTrip: activities.planningTrip,
    profileName: currentProfile.name,
    selectedProfile: profile.selectedProfile,
    settingProfile: activities.settingProfile,
    showTripOptions: activities.showTripOptions,
    viewingMapInfo: activities.viewingMapInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OmniCard);
