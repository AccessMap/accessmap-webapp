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
    onUphillChange,
    onDownhillChange,
    onCurbRampsChange,
    onDownhillMouseEnter,
    onDownhillMouseLeave,
    origin,
    originText,
    planningTrip,
    proximity,
    requireCurbRamps,
    searchText,
  } = props;

  let topBar;
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
              actions.setSearchText(label);
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

  // TODO:
  // 1. Adjust routes / view so that OmniCard will never overlap it.

  return (
    <Card className='omnicard'>
      { topBar }
      <div className="dividers__border-example">
        <div className="md-divider-border md-divider-border--top" />
      </div>
      <CardText>
        <Button
          className='md-btn--toolbar'
          icon
        >
          <WheelchairIcon size={24} />
        </Button>
        <Button
          className='md-btn--toolbar'
          icon
        >
          <PoweredWheelchairIcon size={24} />
        </Button>
        <Button
          className='md-btn--toolbar'
          icon
        >
          <CaneUserIcon size={24} />
        </Button>
        <Button
          className='md-btn--toolbar'
          icon
        >
          settings
        </Button>
      </CardText>
      <CardText>
        <InclineSlider
          id='uphill_discrete'
          label='Maximum uphill incline'
          incline={inclineMax}
          max={10}
          step={0.5}
          valuePrecision={1}
          onChange={d => actions.setInclineMax(d / 100)}
        />
        <InclineSlider
          id='downhill_discrete'
          label='Maximum downhill incline'
          incline={-inclineMin}
          max={10}
          step={0.5}
          valuePrecision={1}
          onChange={d => actions.setInclineMin(-d / 100)}
          onMouseEnter={actions.mouseOverDownhill}
          onMouseLeave={actions.mouseOutDownhill}
        />
        <SelectionControl
          type='switch'
          checked={requireCurbRamps}
          id='require_curbramps'
          label='Require curbramps'
          name='require_curbramps_toggle'
          onChange={actions.toggleCurbRamps}
        />
      </CardText>
    </Card>
  );
}

OmniCard.defaultProps = {
  onDownhillMouseEnter: null,
  onDownhillMouseLeave: null,
}

function mapStateToProps(state) {
  const {
    browser,
    routingprofile,
    tripplanning,
    view,
    waypoints,
  } = state;

  return {
    searchText: tripplanning.geocoderText.searchText,
    originText: tripplanning.geocoderText.originText,
    destinationText: tripplanning.geocoderText.destinationText,
    inclineMax: routingprofile.inclineMax,
    inclineMin: routingprofile.inclineMin,
    inclineIdeal: routingprofile.inclineIdeal,
    requireCurbRamps: routingprofile.requireCurbRamps,
    origin: waypoints.origin,
    destination: waypoints.destination,
    planningTrip: tripplanning.planningTrip,
    center: [view.lng, view.lat],
    mediaType: browser.mediaType,
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
