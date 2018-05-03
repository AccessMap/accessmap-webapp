import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import Card, { CardActions, CardText } from 'react-md/src/js/Cards';
import Collapse from 'react-md/src/js/Helpers/Collapse';
import { DatePicker, TimePicker } from 'react-md/src/js/Pickers';
import { LinearProgress } from 'react-md/src/js/Progress';
import SVGIcon from 'react-md/src/js/SVGIcons';
import Toolbar from 'react-md/src/js/Toolbars';

import DirectionsList from 'components/DirectionsList';

import DestinationGeocoder from 'containers/Geocoders/DestinationGeocoder';
import OriginGeocoder from 'containers/Geocoders/OriginGeocoder';
import SearchGeocoder from 'containers/Geocoders/SearchGeocoder';

import ProfileList from 'containers/ProfileList';

import CurbRampsToggle from 'containers/Settings/CurbRampsToggle';
import DownhillSlider from 'containers/Settings/DownhillSlider';
import UphillSlider from 'containers/Settings/UphillSlider';

import AccessMapLogo from 'components/Icons/AccessMapLogo';

import directions from 'icons/directions.svg';
import magnify from 'icons/magnify.svg';
import menu from 'icons/menu.svg';
import pencil from 'icons/pencil.svg';

import { pointFeature, routeResult as routeResultProps } from 'prop-schema';


class OmniCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTripOptions: false,
    };
  }

  render() {
    const {
      actions,
      dateTime,
      destination,
      drawerVisible,
      fetchingRoute,
      mediaType,
      origin,
      planningTrip,
      profileName,
      routeResult,
      settingProfile,
      viewingDirections,
      viewingMapInfo,
    } = this.props;

    const {
      showTripOptions,
    } = this.state;

    const isMobile = mediaType === 'mobile';

    if (!isMobile && viewingDirections) {
      return (
        <Card className='omnicard directions--mode'>
          <Toolbar
            title='Directions'
            actions={[
              <Button
                icon
                onClick={() => actions.closeDirections(routeResult)}
              >
                close
              </Button>,
            ]}
          />
          <CardText className='directions--bar'>
            <DirectionsList routeResult={routeResult} />
          </CardText>
        </Card>
      );
    }

    if (isMobile && settingProfile) return null;
    if (isMobile && viewingDirections) return null;
    if (isMobile && viewingMapInfo) return null;

    const header = isMobile && planningTrip ?
      null :
      (
        <Toolbar
          className='omnicard--header'
          title={
            <div
              className='accessmap-title'
              key='accessmap-brand'
            >
              <AccessMapLogo />
            </div>
          }
          nav={
            <Button
              icon
              svg
              onClick={() => {
                if (drawerVisible) {
                  actions.hideDrawer();
                } else {
                  actions.showDrawer();
                }
              }}
            >
              <SVGIcon use={menu.url} />
            </Button>
          }
        >
          <h6 className='accessmaplogo-region'>Seattle</h6>
        </Toolbar>
      );

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
          nav={
            <SVGIcon
              className={cn('md-btn--toolbar search-icon')}
              use={magnify.url}
            />
          }
          actions={[
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
          <Button
            icon
            className='md-fake-btn md-icon md-btn--icon md-inline-block'
            onClick={() => {
              if (showTripOptions) {
                this.setState({ showTripOptions: false });
              } else {
                this.setState({ showTripOptions: true });
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
          </Button>,
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
        { fetchingRoute ?
          <LinearProgress
            id='retrieving-route-indicator'
            className='route-progressbar'
          /> :
          null
        }
        {header}
        {topBar}
        <Toolbar
          className='profiles-toolbar'
          title={<ProfileList />}
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
      </Card>
    );
  }
}

OmniCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  dateTime: PropTypes.number.isRequired,
  destination: pointFeature({ name: PropTypes.string }),
  drawerVisible: PropTypes.bool.isRequired,
  fetchingRoute: PropTypes.bool,
  origin: pointFeature({ name: PropTypes.string }),
  mediaType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  planningTrip: PropTypes.bool,
  profileName: PropTypes.string.isRequired,
  routeResult: routeResultProps,
  settingProfile: PropTypes.bool,
  viewingDirections: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
};

OmniCard.defaultProps = {
  destination: null,
  origin: null,
  fetchingRoute: false,
  mediaType: 'desktop',
  planningTrip: false,
  routeResult: null,
  settingProfile: false,
  viewingDirections: false,
  viewingMapInfo: false,
};

const mapStateToProps = (state) => {
  const {
    activities,
    browser,
    profile,
    route,
    routesettings,
    waypoints,
  } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    dateTime: routesettings.dateTime,
    destination: waypoints.destination,
    drawerVisible: activities.drawerVisible,
    fetchingRoute: route.fetchingRoute,
    origin: waypoints.origin,
    mediaType: browser.mediaType,
    planningTrip: activities.planningTrip,
    profileName: currentProfile.name,
    routeResult: route.routeResult,
    selectedProfile: profile.selectedProfile,
    settingProfile: activities.settingProfile,
    viewingDirections: activities.viewingDirections,
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
