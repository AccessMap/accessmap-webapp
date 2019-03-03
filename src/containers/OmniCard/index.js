import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import cn from "classnames";

import * as AppActions from "actions";

import Button from "react-md/src/js/Buttons";
import Card, { CardActions, CardText } from "react-md/src/js/Cards";
import Collapse from "react-md/src/js/Helpers/Collapse";
import { DatePicker, TimePicker } from "react-md/src/js/Pickers";
import { LinearProgress } from "react-md/src/js/Progress";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import DestinationGeocoder from "containers/Geocoders/DestinationGeocoder";
import OriginGeocoder from "containers/Geocoders/OriginGeocoder";
import SearchGeocoder from "containers/Geocoders/SearchGeocoder";

import ProfileList from "containers/ProfileList";

import Login from "containers/Login";

import CurbRampsToggle from "containers/Settings/CurbRampsToggle";
import DownhillSlider from "containers/Settings/DownhillSlider";
import UphillSlider from "containers/Settings/UphillSlider";

import AccessMapLogo from "components/Icons/AccessMapLogo";
import Directions from "components/Directions";
import RouteInfo from "components/RouteInfo";

import chevronDown from "icons/chevron-down.svg";
import close from "icons/close.svg";
import directions from "icons/directions.svg";
import magnify from "icons/magnify.svg";
import menu from "icons/menu.svg";
import pencil from "icons/pencil.svg";
import swapVert from "icons/swap-vert.svg";

import { pointFeature, routeResult as routeResultProps } from "prop-schema";

class OmniCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTripOptions: false
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
      viewingRouteInfo
    } = this.props;

    const { showTripOptions } = this.state;

    const isMobile = mediaType === "mobile";

    if (!isMobile && viewingDirections) {
      return (
        <Card className="omnicard directions--mode">
          <Directions
            onClose={() => actions.closeDirections(routeResult)}
            routeResult={routeResult}
          />
        </Card>
      );
    }

    if (!isMobile && viewingRouteInfo) {
      return (
        <Card className="omnicard route-info--mode">
          <RouteInfo
            onClose={() => actions.closeDirections(routeResult)}
            routeResult={routeResult}
          />
        </Card>
      );
    }

    if (isMobile && settingProfile) return null;
    if (isMobile && viewingDirections) return null;
    if (isMobile && viewingMapInfo) return null;
    if (isMobile && viewingRouteInfo) return null;

    const header =
      isMobile && planningTrip ? null : (
        <Toolbar
          className="omnicard--header"
          nav={
            <Button
              aria-label="Main Menu"
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
          actions={[<Login />]}
        >
          <div className="accessmap-title" key="accessmap-brand" aria-hidden>
            <AccessMapLogo />
            <h6 className="accessmaplogo-region">Seattle</h6>
          </div>
        </Toolbar>
      );

    let topBar;
    if (planningTrip) {
      topBar = (
        <React.Fragment>
          <Toolbar
            className="geocoder-toolbar"
            nav={<div>A</div>}
            title={<OriginGeocoder />}
            actions={[
              <Button
                aria-label="Exit trip planning"
                key="tripplanning--close"
                icon
                svg
                onClick={actions.exitTripPlanning}
                tooltipLabel="Exit trip planning"
                tooltipPosition="left"
              >
                <SVGIcon use={close.url} />
              </Button>
            ]}
          />
          <Toolbar
            className="geocoder-toolbar"
            nav={<div>B</div>}
            title={<DestinationGeocoder />}
            actions={[
              <Button
                aria-label="Swap start and destination locations"
                className="md-btn--toolbar"
                key="tripplanning--swap-waypoints"
                icon
                svg
                tooltipLabel="Swap start and end"
                tooltipPosition="left"
                onClick={() => {
                  actions.swapWaypoints(origin, destination);
                }}
              >
                <SVGIcon use={swapVert.url} />
              </Button>
            ]}
          />
        </React.Fragment>
      );
    } else {
      topBar = (
        <Toolbar
          className="geocoder-toolbar"
          title={<SearchGeocoder />}
          nav={
            <SVGIcon
              className={cn("md-btn--toolbar search-icon")}
              use={magnify.url}
            />
          }
          actions={[
            <Button
              aria-label="Trip planning mode"
              className="directions-button md-btn--toolbar"
              key="omnicard-tripplanning--toggle"
              icon
              secondary
              svg
              tooltipLabel="Plan a trip"
              tooltipPosition="left"
              onClick={actions.planTrip}
            >
              <SVGIcon use={directions.url} />
            </Button>
          ]}
        />
      );
    }

    const profileActions = [];

    if (isMobile) {
      profileActions.push(
        <Button
          aria-label="Edit trip planning profile"
          className="edit-profile-button"
          icon
          svg
          tooltipLabel="Edit profile settings"
          tooltipPosition="left"
          onClick={() => actions.toggleSettingProfile(settingProfile)}
        >
          <SVGIcon use={pencil.url} />
        </Button>
      );
      if (planningTrip) {
        profileActions.push(
          <Button
            aria-label="Toggle display of trip options"
            icon
            svg
            className="trip-options-collapser md-fake-btn md-icon md-btn--icon md-inline-block"
            onClick={() => {
              if (showTripOptions) {
                this.setState({ showTripOptions: false });
              } else {
                this.setState({ showTripOptions: true });
              }
            }}
          >
            <i
              className={cn("md-icon material-icons md-collapser", {
                "md-collapser--flipped": showTripOptions
              })}
            >
              <SVGIcon use={chevronDown.url} />
            </i>
          </Button>
        );
      }
    }

    const date = new Date(dateTime);

    const timePicker = (
      <Collapse collapsed={isMobile && !showTripOptions}>
        <CardText className="timepicker">
          <DatePicker
            id="date-picker"
            defaultValue={date}
            fullWidth={false}
            pickerStyle={{ zIndex: 100 }}
            onChange={(s, d) => {
              actions.setDate(d.getFullYear(), d.getMonth(), d.getDate());
            }}
          />
          <TimePicker
            id="time-picker"
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
      <Card
        role="complementary"
        aria-label="main interface"
        className="omnicard"
      >
        {fetchingRoute ? (
          <LinearProgress
            id="retrieving-route-indicator"
            className="route-progressbar"
          />
        ) : null}
        {header}
        {topBar}
        <Toolbar
          className="profiles-toolbar"
          title={<ProfileList />}
          actions={profileActions}
        />
        {!isMobile ? (
          <React.Fragment>
            <CardText className="profile-editor-desktop">
              <UphillSlider />
              <DownhillSlider />
              <CurbRampsToggle />
            </CardText>
            <CardActions>
              <Button
                aria-label="Reset profile to defaults"
                flat
                primary
                onClick={() => actions.setProfileDefault(profileName)}
              >
                Reset to defaults
              </Button>
            </CardActions>
          </React.Fragment>
        ) : null}
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
  mediaType: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
  planningTrip: PropTypes.bool,
  profileName: PropTypes.string.isRequired,
  routeResult: routeResultProps,
  settingProfile: PropTypes.bool,
  viewingDirections: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
  viewingRouteInfo: PropTypes.bool
};

OmniCard.defaultProps = {
  destination: null,
  origin: null,
  fetchingRoute: false,
  mediaType: "desktop",
  planningTrip: false,
  routeResult: null,
  settingProfile: false,
  viewingDirections: false,
  viewingMapInfo: false,
  viewingRouteInfo: false
};

const mapStateToProps = state => {
  const {
    activities,
    browser,
    profile,
    route,
    router,
    routesettings,
    waypoints
  } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    dateTime: routesettings.dateTime,
    destination: waypoints.destination,
    drawerVisible: activities.drawerVisible,
    fetchingRoute: route.fetchingRoute,
    origin: waypoints.origin,
    mediaType: browser.mediaType,
    planningTrip: router.route && router.route.name === "directions",
    profileName: currentProfile.name,
    routeResult: route.routeResult,
    selectedProfile: profile.selectedProfile,
    settingProfile: activities.settingProfile,
    viewingDirections: activities.viewingDirections,
    viewingMapInfo: activities.viewingMapInfo,
    viewingRouteInfo: activities.viewingRouteInfo
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OmniCard);
