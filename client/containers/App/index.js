import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'react-md/lib/Buttons';
import Dialog from 'react-md/lib/Dialogs';
import Drawer from 'react-md/lib/Drawers';
import List, { ListItem } from 'react-md/lib/Lists';
import { Switch } from 'react-md/lib/SelectionControls';
import Toolbar from 'react-md/lib/Toolbars';

import {
  MOBILE_MIN_WIDTH,
  TABLET_MIN_WIDTH,
  DESKTOP_MIN_WIDTH
} from 'react-md/lib/constants/media';

import AccessMap from 'containers/AccessMap';

import AccessMapIcon from 'components/AccessMapIcon';
import GeocoderAutocomplete from 'components/GeocoderAutocomplete';
import InclineSlider from 'components/InclineSlider';
import PreferenceCard from 'components/PreferenceCard';
import FeatureCard from 'components/FeatureCard';

import * as AppActions from 'actions';
import './style.scss';


const CLICKABLE_LAYERS = ['sidewalk', 'crossing-ramps', 'crossing-noramps'];


class App extends Component {
  constructor(props) {
    super(props);

    // TODO: put geocoder autocompletes' data into an array, make them
    // controlled components - enables both extracting + setting the values.
    this.state = {
      mobile: false,
      tablet: false,
      desktop: true,
      drawerVisible: false,
      setting: null,
      contextDialog: false,
      contextCenter: [],
      searchName: '',
      originName: '',
      destinationName: ''
    };

    // TODO: all of these _methods should become actions+reducers with redux.
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleTripPlanning = this.toggleTripPlanning.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.closeContextDialog = this.closeContextDialog.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  toggleDrawer() {
    this.setState(prevState => ({
      drawerVisible: !prevState.drawerVisible
    }));
  }

  toggleTripPlanning() {
    this.setState((prevState, props) => {
      if (props.planningTrip) {
        this.props.actions.tripPlanningOff(props.destination);
        // Switched to trip planning mode: move search to destination
        return {
          ...prevState,
          setting: null,
          searchName: '',
          destinationName: prevState.searchName
        };
      }
      // Switched to search mode: move destination to search
      this.props.actions.tripPlanningOn(props.poi);
      return {
        ...prevState,
        setting: null,
        destinationName: '',
        originName: '',
        searchName: prevState.destinationName
      };
    });
  }

  closeContextDialog() {
    this.setState({ contextDialog: false });
  }

  updateDimensions() {
    if (typeof window === 'undefined') {
      this.setState({ mobile: true, tablet: false, desktop: false });
    }

    const mobile = window.matchMedia(`
      screen and (min-width: ${MOBILE_MIN_WIDTH}px) and (max-width: ${TABLET_MIN_WIDTH - 1}px)
    `).matches;

    const tablet = window.matchMedia(`
      screen and (min-width: ${TABLET_MIN_WIDTH}px) and (max-width: ${DESKTOP_MIN_WIDTH - 1}px)
    `).matches;

    const desktop = window.matchMedia(`
      screen and (min-width: ${DESKTOP_MIN_WIDTH}px)
    `).matches;

    this.setState({
      mobile,
      tablet,
      desktop
    });
  }

  render() {
    // TODO: use desktop/tablet props?
    const {
      mobile,
      drawerVisible,
      contextDialog,
      contextCenter,
      setting,
      searchName,
      originName,
      destinationName
    } = this.state;

    const {
      actions,
      origin,
      destination,
      planningTrip,
      inclineMax,
      inclineMin,
      inclineIdeal,
      requireCurbRamps,
      center,
      selectedFeature,
    } = this.props;

    let rightNav;
    if (mobile) {
      rightNav = (
        <Button
          icon
          onClick={this.toggleDrawer}
        >
        menu
        </Button>
      );
    } else {
      rightNav = [
        <Button
          key='nav-experiment'
          flat
          label='Experiments'
        />,
        <Button
          key='nav-blog'
          flat
          label='Blog'
        />,
        <Button
          key='nav-about'
          flat
          label='About'
        />,
        <Button
          key='nav-donate'
          flat
          label='Donate'
        />
      ];
    }

    // FIXME: the sliders seem to share their thumb position (displayed).
    // i.e., if I drag the 'uphill' slider to 3.5 and switch to the 'downhill'
    // slider card, the 'downhill' slider also says 3.5 now.
    let preferenceCard;
    if (setting !== null) {
      let preferences;
      switch (setting) {
        case 'DOWNHILL':
          preferences = (
            <InclineSlider
              id='downhill_discrete'
              label='Maximum downhill incline'
              incline={-inclineMin}
              max={10}
              step={0.5}
              valuePrecision={1}
              onChange={d => actions.setInclineMin(-d / 100)}
            />
          );
          break;
        case 'OTHER':
          preferences = (
            <Switch
              defaultChecked={requireCurbRamps}
              id='require_curbramps'
              label='Require curbramps'
              name='require_curbramps_toggle'
              onChange={actions.toggleCurbRamps}
            />
          );
          break;
        default:
          preferences = (
            <InclineSlider
              id='uphill_discrete'
              label='Maximum uphill incline'
              incline={inclineMax}
              max={10}
              step={0.5}
              valuePrecision={1}
              onChange={d => actions.setInclineMax(d / 100)}
            />
          );
      }

      preferenceCard = (
        <PreferenceCard
          actions={[
            <Button
              flat
              primary
              label='Uphill'
              key='preference-toggle-uphill'
              onClick={() => this.setState({ setting: 'UPHILL' })}
            >
              trending_up
            </Button>,
            <Button
              flat
              primary
              label='Downhill'
              key='preference-toggle-downhill'
              onClick={() => this.setState({ setting: 'DOWNHILL' })}
            >
              trending_down
            </Button>,
            <Button
              flat
              primary
              label='Other'
              key='preference-toggle-other'
              onClick={() => this.setState({ setting: 'OTHER' })}
            >
              settings
            </Button>
          ]}
          onClick={() => this.setState({ setting: null })}
        >
          {preferences}
        </PreferenceCard>
      );
    }

    let selectedFeatureCard;
    if (selectedFeature) {
      let featureTitle;
      let featureProperties;

      if (selectedFeature.layer === 'sidewalk') {
        featureTitle = 'Sidewalk';
        featureProperties = [selectedFeature.properties.grade];
      } else if (selectedFeature.layer === 'crossing-ramps') {
        featureTitle = 'Street Crossing';
        featureProperties=[{
            name: 'Curb ramps',
            value: 'Yes'
        }];
      } else if (selectedFeature.layer === 'crossing-noramps') {
        featureTitle = 'Street Crossing';
        featureProperties=[{
            name: 'Curb ramps',
            value: 'No'
        }];
      }

      selectedFeatureCard = (
        <FeatureCard
          title={featureTitle}
          featureProperties={featureProperties}
          onClickClose={() => actions.clearSelectedFeatures()}
        />
      );
    }

    const accessMapIcon = (
      <div className='accessmap-title md-btn--text'>
        <AccessMapIcon
          secondary='#aeea00'
          width={mobile ? 32 : 150}
          primary='#fff'
          backgroundTransparent
          mini={mobile}
          className='accessmap-toolbar-icon'
        />
      </div>
    );

    const searchGeocoder = (
      <GeocoderAutocomplete
        style={{ paddingLeft: 16 }}
        id='address_search'
        key='address_search'
        placeholder='Search address'
        block
        className='md-title--toolbar'
        inputClassName='md-text-field--toolbar'
        onAutocomplete={(label, index, data) => {
          actions.setPOI({
            location: data[index].location,
            name: data[index].name
          });
          this.setState({ searchName: label });
        }}
        proximity={center}
        onChange={(v) => { this.setState({ searchName: v }); }}
        value={searchName}
      />
    );

    const originGeocoder = (
      <GeocoderAutocomplete
        style={{ paddingLeft: 16 }}
        id='origin-geocoder'
        key='origin-geocoder'
        placeholder='Start address'
        block
        className='md-title--toolbar'
        inputClassName='md-text-field--toolbar'
        proximity={center}
        onAutocomplete={(label, index, data) => {
          this.setState({ originName: label });
          actions.setOrigin(data[index]);
        }}
        onChange={(v) => { this.setState({ originName: v }); }}
        value={originName}
      />
    );

    const destinationGeocoder = (
      <GeocoderAutocomplete
        style={{ paddingLeft: 16 }}
        id='destination-geocoder'
        key='destination-geocoder'
        placeholder='End address'
        block
        className='md-title--toolbar'
        inputClassName='md-text-field--toolbar'
        proximity={center}
        onAutocomplete={(label, index, data) => {
          this.setState({ destinationName: label });
          actions.setDestination(data[index]);
        }}
        onChange={(v) => { this.setState({ destinationName: v }); }}
        value={destinationName}
      />
    );

    let bottomGeocoder = destinationGeocoder;

    if (!planningTrip) {
      bottomGeocoder = searchGeocoder;
    }

    // FIXME: toggling trip planning mode off always sends set
    // origin/destination actions (shouldn't do that!)

    const topToolbarActions = planningTrip
      ? [<Button onClick={this.toggleTripPlanning} icon>close</Button>]
      : rightNav;

    const bottomToolbarChildren = [];
    const bottomToolbarActions = [];
    if (planningTrip) {
      bottomToolbarChildren.push(
        <Button
          className='md-btn--toolbar'
          key='swap'
          icon
          onClick={() => {
            actions.swapWaypoints(origin, destination);
            this.setState({
              originName: destinationName,
              destinationName: originName
            });
          }}
        >
          swap_vert
        </Button>,
      );

      bottomToolbarActions.push(
        <Button
          onClick={() => this.setState({ setting: 'UPHILL' })}
          key='uphill'
          icon
        >
          settings
        </Button>
      );
    } else {
      bottomToolbarActions.push(
        <Button
          onClick={() => this.setState({ setting: 'UPHILL' })}
          key='downhill'
          icon
        >
          settings
        </Button>
      );
    }

    return (
      <div style={{ height: '100%' }}>
        <Toolbar
          style={{ width: '100%', zIndex: 2, boxShadow: 'none' }}
          title={!planningTrip && accessMapIcon}
          colored
          actions={topToolbarActions}
          fixed
        >
          {planningTrip && originGeocoder}
        </Toolbar>
        <Toolbar
          style={{
            position: 'fixed',
            width: '100%',
            zIndex: 1,
            top: 0,
            // FIXME: don't hard-code these, use scss to get toolbar height
            marginTop: mobile ? 48 : 64
          }}
          className='md-paper--2'
          colored
          actions={bottomToolbarActions}
          zDepth={0}
        >
          {bottomGeocoder}
          {bottomToolbarChildren}
        </Toolbar>
        <Drawer
          position='right'
          overlay={false}
          onVisibilityToggle={() => {}}
          visible={drawerVisible}
          header={
            <Toolbar
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <AccessMapIcon
                    style={{ margin: '0 auto', display: 'block' }}
                    width={150}
                    backgroundTransparent
                  />
                </div>
              }
              nav={<Button icon onClick={this.toggleDrawer}>close</Button>}
              className='md-divider-border md-divider-border--bottom'
            />
          }
          navItems={[
            <ListItem
              key='experiments'
              primaryText='Experiments'
            />,
            <ListItem
              key='blog'
              primaryText='Blog'
            />,
            <ListItem
              key='about'
              primaryText='About'
            />,
            <ListItem
              key='donate'
              primaryText='Donate'
            />
          ]}
        />

        <div className='map-container'>
          <Dialog
            id='context-dialog'
            visible={contextDialog}
            title='Set waypoint?'
            onHide={this.closeContextDialog}
          >
            <List>
              <ListItem
                id='set-origin'
                primaryText='Set origin'
                onClick={() => {
                  actions.setOrigin({
                    location: contextCenter,
                    name: 'Custom origin'
                  });
                  this.closeContextDialog();
                }}
              />
              <ListItem
                id='set-destination'
                primaryText='Set destination'
                onClick={() => {
                  // FIXME: setting this to index 1 is brittle
                  actions.setDestination({
                    location: contextCenter,
                    name: 'Custom destination'
                  });
                  this.closeContextDialog();
                }}
              />
              <ListItem
                id='cancel'
                primaryText='Cancel'
                onClick={this.closeContextDialog}
              />
            </List>
          </Dialog>
          <AccessMap
            containerStyle={{
              width: '100%',
              height: '100%'
            }}
            inclineMax={inclineMax}
            inclineMin={inclineMin}
            inclineIdeal={inclineIdeal}
            requireCurbRamps={requireCurbRamps}
            mode={setting === 'DOWNHILL' ? 'downhill' : 'uphill'}
            onMoveEnd={(m, e) => {
              const bounds = m.getBounds().toArray();
              const bbox = [
                bounds[0][0],
                bounds[0][1],
                bounds[1][0],
                bounds[1][1]
              ];
              if (e.originalEvent) {
                const { lng, lat } = m.getCenter();
                actions.mapMove([lng, lat], m.getZoom(), bbox);
              } else {
                actions.logBounds(bbox);
              }
            }}
            onContextMenu={(m, e) => {
              const { lng, lat } = e.lngLat;
              this.setState({
                contextDialog: true,
                contextCenter: [lng, lat]
              });
            }}
            onMouseMove={(m, e) => {
              const features = m.queryRenderedFeatures(e.point, {
                layers: CLICKABLE_LAYERS
              });
              m.getCanvas().style.cursor = features.length ? 'pointer': '';
            }}
            onClick={(m, e) => {
              const features = m.queryRenderedFeatures(e.point, {
                layers: CLICKABLE_LAYERS
              });
              actions.mapClick(features);
            }}
            onStyleLoad={(m) => {
              const bounds = m.getBounds().toArray();
              const bbox = [
                bounds[0][0],
                bounds[0][1],
                bounds[1][0],
                bounds[1][1]
              ];
              actions.logBounds(bbox);
            }}
          />
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              zIndex: 10,
              padding: 10,
              margin: 10
            }}
          >
            <Button
              style={{ display: 'block', margin: 15 }}
              floating
              secondary
              onClick={actions.toggleGeolocation}
            >
              gps_fixed
            </Button>
            <Button
              style={{ display: 'block', margin: 15 }}
              floating
              secondary
              onClick={this.toggleTripPlanning}
            >
              directions
            </Button>
          </div>
        </div>
        {preferenceCard}
        {selectedFeatureCard}
      </div>
    );
  }
}

// TODO: describe shape of actions?
App.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable react/require-default-props */
  actions: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  /* eslint-enable react/require-default-props */
  origin: PropTypes.shape({
    type: PropTypes.oneOf(['Feature']).isRequired,
    geometry: PropTypes.shape({
      type: PropTypes.oneOf(['Point']).isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    }),
    properties: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  destination: PropTypes.shape({
    type: PropTypes.oneOf(['Feature']).isRequired,
    geometry: PropTypes.shape({
      type: PropTypes.oneOf(['Point']).isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    }),
    properties: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  planningTrip: PropTypes.bool,
  inclineMax: PropTypes.number.isRequired,
  inclineMin: PropTypes.number.isRequired,
  inclineIdeal: PropTypes.number.isRequired,
  requireCurbRamps: PropTypes.bool.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  selectedFeature: PropTypes.shape({
    type: PropTypes.string,
    info: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    }),
  })
};

App.defaultProps = {
  origin: null,
  destination: null,
  planningTrip: false,
  inclineMax: 0.1,
  inclineMin: -0.0833,
  inclineIdeal: -0.01,
  requireCurbRamps: true,
  center: [-122.333592, 47.605628],
  selectedFeature: null,
};

function mapStateToProps(state) {
  const {
    map,
    tripplanning,
    waypoints,
    view
  } = state;

  return {
    planningTrip: tripplanning.planningTrip,
    origin: waypoints.origin,
    destination: waypoints.destination,
    poi: waypoints.poi,
    inclineMax: tripplanning.inclineMax,
    inclineMin: tripplanning.inclineMin,
    inclineIdeal: tripplanning.inclineIdeal,
    requireCurbRamps: tripplanning.requireCurbRamps,
    center: view.center,
    selectedFeature: map.selectedFeature,
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
)(App);
