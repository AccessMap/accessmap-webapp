import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';
import Card, { CardText, CardTitle } from 'react-md/lib/Cards';
import FontIcon from 'react-md/lib/FontIcons';
import List from 'react-md/lib/Lists';
import SelectionControl from 'react-md/lib/SelectionControls';
import { TabsContainer, Tabs, Tab } from 'react-md/lib/Tabs';
import SVGIcon from 'react-md/lib/SVGIcons';

import GeocoderAutocomplete from 'components/GeocoderAutocomplete';
import InclineSlider from 'components/InclineSlider';
import SimpleListItem from 'components/SimpleListItem';

import CaneUserIcon from 'components/Icons/CaneUserIcon';
import PoweredWheelchairIcon from 'components/Icons/PoweredWheelchairIcon';
import WheelchairIcon from 'components/Icons/WheelchairIcon';

import './style.scss';

const OmniCard = (props) => {
  const {
    actions,
    center,
    destination,
    destinationText,
    inclineMin,
    inclineMax,
    mediaType,
    mode,
    onUphillChange,
    onDownhillChange,
    onCurbRampsChange,
    onDownhillMouseEnter,
    onDownhillMouseLeave,
    origin,
    originText,
    planningTrip,
    profileName,
    proximity,
    requireCurbRamps,
    searchText,
    settingProfile,
  } = props;

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
          style={{
            float: 'right',
          }}
          onClick={() => actions.toggleSettingProfile(settingProfile)}
          icon
        >
          close
        </Button>
      </List>
    );
  } else {
    if (planningTrip) {
      topBar = (
        <List>
          <SimpleListItem>
            <GeocoderAutocomplete
              id='origin-geocoder'
              key='origin-geocoder'
              placeholder='Start address'
              block
              className='md-title--toolbar'
              inputClassName='md-text-field--toolbar'
              proximity={center}
              onAutocomplete={(label, index, data) => {
                actions.setOriginText(label);
                const origin = data[index];
                actions.setOrigin(origin.location[0], origin.location[1],
                                  origin.name);
              }}
              onChange={(v) => { actions.setOriginText(v); }}
              value={originText}
           />
            <Button
              onClick={() => actions.toggleTripPlanning(planningTrip) }
              key='tripplanning--close'
              icon
            >
              close
            </Button>
          </SimpleListItem>
          <SimpleListItem>
            <GeocoderAutocomplete
              id='destination-geocoder'
              key='destination-geocoder'
              placeholder='End address'
              block
              className='md-title--toolbar'
              inputClassName='md-text-field--toolbar'
              proximity={center}
              onAutocomplete={(label, index, data) => {
                actions.setDestinationText(label);
                const destination = data[index];
                actions.setDestination(
                  destination.location[0],
                  destination.location[1],
                  destination.name
                );
              }}
              onChange={(v) => { actions.setDestinationText(v); }}
              value={destinationText}
            />
            <Button
              className='md-btn--toolbar'
              key='tripplanning--swap-waypoints'
              icon
              onClick={() => {
                actions.swapWaypoints(origin, destination);
              }}
            >
              swap_vert
            </Button>
          </SimpleListItem>
        </List>
      );
    } else {
      topBar = (
        <List>
          <SimpleListItem>
            <GeocoderAutocomplete
              id='address_search'
              key='address_search'
              placeholder='Search address'
              block
              onAutocomplete={(label, index, data) => {
                const poi = data[index];
                actions.setPOI(poi.location[0], poi.location[1], poi.name);
                actions.setSearchText(poi.name);
              }}
              proximity={center}
              onChange={(v) => { actions.setSearchText(v); }}
              value={searchText}
            />
            <FontIcon
              key='search-icon'
              className={ cn('md-btn--toolbar md-btn--icon') }
            >
              search
            </FontIcon>
            <Button
              className='md-btn--toolbar'
              key='omnicard-tripplanning--toggle'
              secondary
              icon
              onClick={() => actions.toggleTripPlanning(planningTrip)}
            >
              directions
            </Button>
          </SimpleListItem>
        </List>
      );
    }
  }

  const profiles = (
    <React.Fragment>
      <div className="dividers__border-example">
        <div className="md-divider-border md-divider-border--top" />
      </div>
      <List>
        <Button
          className='md-btn--toolbar'
          icon
          onClick={() => actions.setProfile('wheelchair')}
        >
          <WheelchairIcon
            secondary={profileName === 'wheelchair'}
            size={20}
          />
        </Button>
        <Button
          className='md-btn--toolbar'
          icon
          onClick={() => actions.setProfile('powered')}
        >
          <PoweredWheelchairIcon
            secondary={profileName === 'powered'}
            size={20}
          />
        </Button>
        <Button
          className='md-btn--toolbar'
          icon
          onClick={() => actions.setProfile('cane')}
        >
          <CaneUserIcon
            secondary={profileName === 'cane'}
            size={20}
          />
        </Button>
        <Button
          className='md-btn--toolbar'
          icon
          secondary={profileName === 'custom'}
          onClick={() => actions.setProfile('custom')}
        >
          settings
        </Button>
      </List>
    </React.Fragment>
  );

  const uphillSlider = (
    <InclineSlider
      id='uphill_discrete'
      controlled
      label='Maximum uphill incline'
      incline={inclineMax}
      max={12}
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
      max={12}
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
            }
          }}
        >
          <Tab
            id='tab-uphill'
            label='Uphill'
          >
          </Tab>
          <Tab
            id='tab-downhill'
            label='Downhill'
          >
          </Tab>
          <Tab
            id='tab-other'
            label='Other'
          >
          </Tab>
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

  // TODO:
  // 1. Adjust routes / view so that OmniCard will never overlap it.

  return (
    <Card className='omnicard'>
      {topBar}
      {(mediaType !== 'MOBILE' | settingProfile === false)
        ?
        profiles
        :
        undefined
      }
      {(mediaType !== 'MOBILE' | settingProfile === true)
        ?
        settings
        :
        undefined
      }
    </Card>
  );
}
// TODO: make card a little smaller, make menu width same size as card

OmniCard.defaultProps = {
  onDownhillMouseEnter: null,
  onDownhillMouseLeave: null,
}

function mapStateToProps(state) {
  const {
    activities,
    browser,
    mode,
    routingprofile,
    tripplanning,
    view,
    waypoints,
  } = state;

  return {
    center: [view.lng, view.lat],
    destination: waypoints.destination,
    destinationText: tripplanning.geocoderText.destinationText,
    inclineMax: routingprofile.inclineMax,
    inclineMin: routingprofile.inclineMin,
    inclineIdeal: routingprofile.inclineIdeal,
    origin: waypoints.origin,
    originText: tripplanning.geocoderText.originText,
    mediaType: browser.mediaType,
    mode: mode,
    planningTrip: activities.planningTrip,
    profileName: routingprofile.profileName,
    settingProfile: activities.settingProfile,
    requireCurbRamps: routingprofile.requireCurbRamps,
    searchText: tripplanning.geocoderText.searchText,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OmniCard);
