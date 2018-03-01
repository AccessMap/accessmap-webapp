import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import { pointFeature } from 'prop-schema';

import Button from 'react-md/lib/Buttons';
import Card, { CardText } from 'react-md/lib/Cards';
import FontIcon from 'react-md/lib/FontIcons';
import List from 'react-md/lib/Lists';
import SelectionControl, { SelectionControlGroup } from 'react-md/lib/SelectionControls';
import { Tabs, Tab } from 'react-md/lib/Tabs';
import Toolbar from 'react-md/lib/Toolbars';

import GeocoderAutocomplete from 'components/GeocoderAutocomplete';
import InclineSlider from 'components/InclineSlider';

import CaneUserIcon from 'components/Icons/CaneUserIcon';
import PoweredWheelchairIcon from 'components/Icons/PoweredWheelchairIcon';
import WheelchairIcon from 'components/Icons/WheelchairIcon';


const OmniCard = (props) => {
  const {
    actions,
    center,
    currentProfile,
    destination,
    destinationText,
    inclineMax,
    inclineMin,
    mediaType,
    mode,
    origin,
    originText,
    planningTrip,
    profileName,
    requireCurbRamps,
    searchText,
    settingProfile,
  } = props;

  const defaultMode = (mediaType !== 'MOBILE' || !settingProfile);
  const showSettings = (mediaType !== 'MOBILE' || settingProfile);

  // Logic:
  // This controller has multiple states, branching first on device and then
  // on activity:
  // 1. Desktop/tablet
  //   A. Default:
  //     - Search geocoder visible
  //     - Profiles selectable
  //     - Profile settings always visible
  //   B. In trip planning mode
  //     - Search geocoder gets swapped for two geocoders - start and end
  // 2. Mobile
  //   A. Default:
  //     - Search geocoder visible
  //     - Profiles selectable
  //     - Profile settings hidden
  //   B. In trip planning mode
  //     - Same as for desktop, but profile settings still hidden
  //   C. After clicking the 'custom settings' button:
  //     - Geocoders hide, only settings shown. Close button in upper right to
  //     get out of this mode
  //
  //  These states could be achieved in multiple fashions, e.g. by setting
  //  display: * properties in CSS based on classes, etc, or by
  //  creating/destroying components on the fly. I prefer the latter because it
  //  leaves the DOM cleaner.
  //
  //  So, the card's logic:
  //  1. When mobile and settings on: card only has settings + close button.
  //  2. When mobile and settings off: card has top bar and profiles.
  //  3. When in desktop mode, settings are always visible.
  //  4. Top bar swaps between search and waypoints depending on trip planning
  //  mode.

  let topBar;
  if (mediaType === 'MOBILE' && settingProfile) {
    // Mobile browser and settings should be open
    topBar = (
      <List>
        <Button
          onClick={() => actions.toggleSettingProfile(settingProfile)}
          icon
        >
          close
        </Button>
      </List>
    );
  } else if (planningTrip) {
    topBar = (
      <React.Fragment>
        <Toolbar
          title={
            <GeocoderAutocomplete
              id='origin-geocoder'
              key='origin-geocoder'
              className='md-title--toolbar'
              block
              placeholder='Start address'
              proximity={center}
              onAutocomplete={(label, index, data) => {
                actions.setOriginText(data[index].name);
                const o = data[index];
                actions.setOrigin(o.location[0], o.location[1], o.name);
              }}
              onChange={(v) => { actions.setOriginText(v); }}
              value={originText}
            />
          }
          actions={[
            <Button
              onClick={() => actions.toggleTripPlanning(planningTrip)}
              key='tripplanning--close'
              icon
            >
              close
            </Button>,
          ]}
        />
        <Toolbar
          title={
            <GeocoderAutocomplete
              id='destination-geocoder'
              key='destination-geocoder'
              block
              placeholder='End address'
              className='md-title--toolbar'
              proximity={center}
              onAutocomplete={(label, index, data) => {
                actions.setDestinationText(data[index].name);
                const dest = data[index];
                actions.setDestination(
                  dest.location[0],
                  dest.location[1],
                  dest.name,
                );
              }}
              onChange={(v) => { actions.setDestinationText(v); }}
              value={destinationText}
            />
          }
          actions={[
            <Button
              className='md-btn--toolbar'
              key='tripplanning--swap-waypoints'
              icon
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
        className='md-background--card'
        title={
          <GeocoderAutocomplete
            id='address-search'
            key='address-search'
            className='address-search md-background--card'
            listClassName='toolbar-search__list'
            block
            placeholder='Search address'
            onAutocomplete={(label, index, data) => {
              const poi = data[index];
              actions.setPOI(poi.location[0], poi.location[1], poi.name);
              actions.setSearchText(poi.name);
            }}
            proximity={center}
            onChange={(v) => { actions.setSearchText(v); }}
            value={searchText}
          />
        }
        actions={[
          <FontIcon
            key='search-icon'
            className={cn('md-btn--toolbar md-btn--icon')}
          >
            search
          </FontIcon>,
          <Button
            className='md-btn--toolbar'
            key='omnicard-tripplanning--toggle'
            secondary
            icon
            onClick={() => actions.toggleTripPlanning(planningTrip)}
          >
            directions
          </Button>,
        ]}
      />
    );
  }

  const profileList = [{
    label: '',
    value: '1',
    onChange: () => actions.setProfile('wheelchair'),
    className: profileName === 'wheelchair' ? 'profile-selected' : '',
    checkedRadioIcon:
      <WheelchairIcon
        secondary
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ,
    uncheckedRadioIcon:
      <WheelchairIcon
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ,
  }, {
    label: '',
    value: '2',
    onChange: () => actions.setProfile('powered'),
    className: profileName === 'powered' ? 'profile-selected' : '',
    checkedRadioIcon:
      <PoweredWheelchairIcon
        secondary
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ,
    uncheckedRadioIcon:
      <PoweredWheelchairIcon
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ,
  }, {
    label: '',
    value: '3',
    onChange: () => actions.setProfile('cane'),
    className: profileName === 'cane' ? 'profile-selected' : '',
    checkedRadioIcon:
      <CaneUserIcon
        secondary
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ,
    uncheckedRadioIcon:
      <CaneUserIcon
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ,
  }];

  const profileActions = [
    <Button
      icon
      onClick={() => actions.setProfileDefault(profileName)}
    >
      refresh
    </Button>,
  ];

  mediaType === 'MOBILE' && profileActions.unshift(
    <Button
      icon
      onClick={() => actions.toggleSettingProfile(settingProfile)}
    >
      settings
    </Button>
  );

  const profileBar = (
    <Toolbar
      nav={
    <SelectionControlGroup className='profiles-container'
      id='profile-radio-selector'
      name='routing-profile-selector'
      type='radio'
      controls={profileList}
      controlClassName='md-inline-block'
    />
    }
    actions={profileActions}
    />
  );

  const uphillSlider = (
    <InclineSlider
      id='uphill_discrete'
      controlled
      label='Maximum uphill incline'
      incline={inclineMax}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setInclineMax(d / 100)}
    />
  );

  const downhillSlider = (
    <InclineSlider
      id='downhill_discrete'
      controlled
      label='Maximum downhill incline'
      incline={-inclineMin}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setInclineMin(-d / 100)}
      onMouseEnter={actions.mouseOverDownhill}
      onMouseLeave={actions.mouseOutDownhill}
    />
  );

  const curbrampToggle = (
    <SelectionControl
      type='switch'
      checked={requireCurbRamps}
      id='require_curbramps'
      label='Require curbramps'
      name='require_curbramps_toggle'
      onChange={actions.toggleCurbRamps}
    />
  );

  let settingsComponent;
  switch (mode) {
    case 'UPHILL':
      settingsComponent = uphillSlider;
      break;
    case 'DOWNHILL':
      settingsComponent = downhillSlider;
      break;
    case 'OTHER':
      settingsComponent = curbrampToggle;
      break;
    default:
      settingsComponent = uphillSlider;
  }

  let settings;
  if (mediaType === 'MOBILE') {
    settings = (
      <React.Fragment>
        <Tabs
          tabId='custom-settings'
          inactiveTabClassName='md-text--secondary'
          onTabChange={(activeTabIndex) => {
            switch (activeTabIndex) {
              case 0:
                actions.openUphillPreferences();
                break;
              case 1:
                actions.openDownhillPreferences();
                break;
              case 2:
                actions.openOtherPreferences();
                break;
              default:
                actions.openUphillPreferences();
            }
          }}
        >
          <Tab id='tab-uphill' label='Uphill' />
          <Tab id='tab-downhill' label='Downhill' />
          <Tab id='tab-other' label='Other' />
        </Tabs>
        <CardText>
          {settingsComponent}
        </CardText>
      </React.Fragment>
    );
  } else {
    settings = (
      <CardText>
        {uphillSlider}
        {downhillSlider}
        {curbrampToggle}
      </CardText>
    );
  }

  const divider = (
    <div className='dividers__border-example'>
      <div className='md-divider-border md-divider-border--top' />
    </div>
  );

  return (
    <Card
      className={cn('omnicard', {
        notoolbar: (planningTrip || settingProfile) && mediaType === 'MOBILE',
      })}
    >
      {topBar}
      {defaultMode ? divider : undefined}
      {defaultMode ? profileBar : undefined}
      {showSettings ? settings : undefined}
    </Card>
  );
};

OmniCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentProfile: PropTypes.number,
  destination: pointFeature({ name: PropTypes.string }),
  destinationText: PropTypes.string,
  origin: pointFeature({ name: PropTypes.string }),
  originText: PropTypes.string,
  mediaType: PropTypes.oneOf(['MOBILE', 'TABLET', 'DESKTOP']),
  mode: PropTypes.oneOf(['UPHILL', 'DOWNHILL', 'OTHER', null]),
  planningTrip: PropTypes.bool,
  profiles: PropTypes.arrayOf(PropTypes.shape({
    inclineMax: PropTypes.number,
    inclineMin: PropTypes.number,
    name: PropTypes.string,
    requireCurbRamps: PropTypes.bool,
    speed: PropTypes.number,
  })),
  settingProfile: PropTypes.bool,
  searchText: PropTypes.string,
};

OmniCard.defaultProps = {
  currentProfile: 0,
  destination: null,
  destinationText: '',
  origin: null,
  originText: '',
  mediaType: 'DESKTOP',
  mode: 'UPHILL',
  planningTrip: false,
  profiles: [],
  settingProfile: false,
  searchText: '',
};

const mapStateToProps = (state) => {
  const {
    activities,
    browser,
    mode,
    routingprofile,
    tripplanning,
    view,
    waypoints,
  } = state;

  const profile = routingprofile.profiles[routingprofile.selectedProfile];

  return {
    center: [view.lng, view.lat],
    destination: waypoints.destination,
    destinationText: tripplanning.geocoderText.destinationText,
    inclineMax: profile.inclineMax,
    inclineMin: profile.inclineMin,
    origin: waypoints.origin,
    originText: tripplanning.geocoderText.originText,
    mediaType: browser.mediaType,
    mode,
    planningTrip: activities.planningTrip,
    profileName: profile.name,
    requireCurbRamps: profile.requireCurbRamps,
    selectedProfile: routingprofile.selectedProfile,
    settingProfile: activities.settingProfile,
    searchText: tripplanning.geocoderText.searchText,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OmniCard);
