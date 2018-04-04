import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import { pointFeature } from 'prop-schema';

import Button from 'react-md/lib/Buttons';
import Card, { CardActions, CardText } from 'react-md/lib/Cards';
import { DatePicker, TimePicker } from 'react-md/lib/Pickers';
import FontIcon from 'react-md/lib/FontIcons';
import SelectionControl, { SelectionControlGroup } from 'react-md/lib/SelectionControls';
import Slider from 'react-md/lib/Sliders';
import { Tabs, Tab } from 'react-md/lib/Tabs';
import Toolbar from 'react-md/lib/Toolbars';

import GeocoderAutocomplete from 'components/GeocoderAutocomplete';
import TooltipFontIcon from 'components/TooltipFontIcon';

import CaneUserIcon from 'components/Icons/CaneUserIcon';
import PoweredWheelchairIcon from 'components/Icons/PoweredWheelchairIcon';
import WheelchairIcon from 'components/Icons/WheelchairIcon';


const OmniCard = (props) => {
  const {
    actions,
    center,
    dateTime,
    destination,
    destinationText,
    inclineMax,
    inclineMin,
    mediaType,
    mode,
    origin,
    originText,
    planningTrip,
    profileLabel,
    profileName,
    requireCurbRamps,
    searchText,
    settingProfile,
    viewingMapInfo,
  } = props;

  const defaultMode = (mediaType !== 'MOBILE' || !settingProfile);
  const showSettings = (mediaType !== 'MOBILE' || settingProfile);
  const showOmniCard = (mediaType !== 'MOBILE' || !viewingMapInfo);

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
  if (!showOmniCard) return null;

  let topBar;
  if (mediaType === 'MOBILE' && settingProfile) {
    // Mobile browser and settings should be open
    topBar = (
      <Toolbar
        nav={
          <Button
            flat
            primary
            onClick={() => actions.setProfileDefault(profileName)}
          >
            Reset to defaults
          </Button>
        }
        actions={[
          <Button
            tooltipLabel='Close'
            tooltipPosition='left'
            onClick={() => actions.toggleSettingProfile(settingProfile)}
            icon
          >
            close
          </Button>,
        ]}
      />
    );
  } else if (planningTrip) {
    topBar = (
      <React.Fragment>
        <Toolbar
          className='geocoder-toolbar'
          nav={<div>A</div>}
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
            tooltipLabel='Plan a trip'
            tooltipPosition='left'
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
    value: 'wheelchair',
    onChange: d => actions.setProfile(d),
    className: profileName === 'wheelchair' ? 'profile-selected' : '',
    checkedRadioIcon: (
      <WheelchairIcon
        secondary
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ),
    uncheckedRadioIcon: (
      <WheelchairIcon
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ),
  }, {
    label: '',
    value: 'powered',
    onChange: d => actions.setProfile(d),
    className: profileName === 'powered' ? 'profile-selected' : '',
    checkedRadioIcon: (
      <PoweredWheelchairIcon
        secondary
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ),
    uncheckedRadioIcon: (
      <PoweredWheelchairIcon
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ),
  }, {
    label: '',
    value: 'cane',
    onChange: d => actions.setProfile(d),
    className: profileName === 'cane' ? 'profile-selected' : '',
    checkedRadioIcon: (
      <CaneUserIcon
        secondary
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ),
    uncheckedRadioIcon: (
      <CaneUserIcon
        size={mediaType === 'DESKTOP' ? 20 : 24}
      />
    ),
  }];

  const profileActions = [
  ];

  if (mediaType === 'MOBILE') {
    profileActions.unshift(
      <Button
        icon
        tooltipLabel='Edit profile settings'
        tooltipPosition='left'
        onClick={() => actions.toggleSettingProfile(settingProfile)}
      >
        settings
      </Button>,
    );
  }

  const date = new Date(dateTime);

  const profileLabelView = (
    <CardText className='profile-label'>
      <h6 className='md-subheading-2 md-inline-block'>
        {profileLabel}
      </h6>
      { planningTrip
        ?
          <div>
            <div
              className='md-inline-block'
              style={{ width: '50%' }}
            >
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
            </div>
            <div
              className='md-inline-block'
              style={{ width: '50%' }}
            >
              <TimePicker
                id='time-picker'
                defaultValue={date}
                fullWidth={false}
                onChange={(s, d) => actions.setTime(d.getHours(), d.getMinutes())}
              />
            </div>
          </div>
        :
          null
      }
    </CardText>
  );

  const profileBar = (
    <Toolbar
      nav={
        <SelectionControlGroup
          className='profiles-container'
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

  const uphillPercent = +(inclineMax * 100).toFixed(1);
  const downhillPercent = +(inclineMin * 100).toFixed(1);

  const uphillSlider = (
    <Slider
      discrete
      id='uphill-slider'
      label={(
        <React.Fragment>
          {`Maximum uphill incline: ${uphillPercent}%`}
          <TooltipFontIcon
            tooltipLabel='Cutoff for uphill steepness'
            tooltipPosition='top'
          >
            help
          </TooltipFontIcon>
        </React.Fragment>
      )}
      defaultValue={uphillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setInclineMax(d / 100)}
      value={uphillPercent}
    />
  );

  const downhillSlider = (
    <Slider
      discrete
      id='downhill-slider'
      label={(
        <React.Fragment>
          {`Maximum downhill incline: ${downhillPercent}%`}
          <TooltipFontIcon
            tooltipLabel='Cutoff for downhill steepness'
            tooltipPosition='top'
          >
            help
          </TooltipFontIcon>
        </React.Fragment>
      )}
      defaultValue={-downhillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setInclineMin(-d / 100)}
      onMouseEnter={actions.mouseOverDownhill}
      onMouseLeave={actions.mouseOutDownhill}
      value={-downhillPercent}
    />
  );

  const curbrampToggle = (
    <SelectionControl
      type='switch'
      checked={requireCurbRamps}
      id='require_curbramps'
      label={(
        <React.Fragment>
          {'Require Curb Ramps'}
          <TooltipFontIcon
            tooltipLabel='Check if you need curb ramps'
            tooltipPosition='top'
          >
            help
          </TooltipFontIcon>
        </React.Fragment>
      )}
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
      <React.Fragment>
        <CardText>
          {uphillSlider}
          {downhillSlider}
          {curbrampToggle}
        </CardText>
        <CardActions>
          <Button
            flat
            primary
            onClick={() => actions.setProfileDefault(profileName)}
          >
            Reset to defaults
          </Button>
        </CardActions>
      </React.Fragment>
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
      {defaultMode ? profileLabelView : undefined}
      {defaultMode ? profileBar : undefined}
      {defaultMode ? divider : undefined}
      {showSettings ? settings : undefined}
    </Card>
  );
};

OmniCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  dateTime: PropTypes.number.isRequired,
  destination: pointFeature({ name: PropTypes.string }),
  destinationText: PropTypes.string,
  inclineMax: PropTypes.number.isRequired,
  inclineMin: PropTypes.number.isRequired,
  origin: pointFeature({ name: PropTypes.string }),
  originText: PropTypes.string,
  mediaType: PropTypes.oneOf(['MOBILE', 'TABLET', 'DESKTOP']),
  mode: PropTypes.oneOf(['UPHILL', 'DOWNHILL', 'OTHER', null]),
  planningTrip: PropTypes.bool,
  profileLabel: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  requireCurbRamps: PropTypes.bool.isRequired,
  settingProfile: PropTypes.bool,
  searchText: PropTypes.string,
  viewingMapInfo: PropTypes.bool,
};

OmniCard.defaultProps = {
  destination: null,
  destinationText: '',
  origin: null,
  originText: '',
  mediaType: 'DESKTOP',
  mode: 'UPHILL',
  planningTrip: false,
  settingProfile: false,
  searchText: '',
  viewingMapInfo: false,
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
    dateTime: tripplanning.dateTime,
    destination: waypoints.destination,
    destinationText: tripplanning.geocoderText.destinationText,
    inclineMax: profile.inclineMax,
    inclineMin: profile.inclineMin,
    origin: waypoints.origin,
    originText: tripplanning.geocoderText.originText,
    mediaType: browser.mediaType,
    mode,
    planningTrip: activities.planningTrip,
    profileLabel: profile.label,
    profileName: profile.name,
    requireCurbRamps: profile.requireCurbRamps,
    selectedProfile: routingprofile.selectedProfile,
    settingProfile: activities.settingProfile,
    searchText: tripplanning.geocoderText.searchText,
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
