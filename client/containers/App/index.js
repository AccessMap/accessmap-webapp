import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';

import AccessMap from 'containers/AccessMap';
import AnalyticsDialog from 'containers/AnalyticsDialog';
import FloatingButtons from 'containers/FloatingButtons';
import LinkOverlay from 'containers/LinkOverlay';
import OmniCard from 'containers/OmniCard';
import Toast from 'containers/Toast';

import AccessMapIcon from 'components/Icons/AccessMapIcon';
import AccessMapLogo from 'components/Icons/AccessMapLogo';
import ContextMenu from 'components/ContextMenu';
import FeatureCard from 'components/FeatureCard';

import * as AppActions from 'actions';


class App extends PureComponent {
  componentDidMount = () => {
    this.props.actions.loadApp();
    window.addEventListener('resize', this.props.actions.resizeWindow);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.props.actions.resizeWindow);
  };

  render = () => {
    const {
      actions,
      contextClick,
      mediaType,
      planningTrip,
      selectedFeature,
      settingProfile,
    } = this.props;

    const mobile = mediaType === 'MOBILE';

    const links = [{
      label: 'About',
      action: actions.clickAboutLink,
    }, {
      label: 'Contact',
      action: actions.clickContactLink,
    }];

    const hideToolbar = (planningTrip || settingProfile) && mobile;
    const toolbar = hideToolbar ? null : (
      <Toolbar
        className={'topbar md-paper--1'}
        title={
          <div
            className='accessmap-title'
            key='accessmap-brand'
          >
            {mobile ? <AccessMapIcon /> : <AccessMapLogo />}
          </div>
        }
        actions={
          links.map(d =>
            <Button
              flat
              primary
              onClick={d.action}
            >
              {d.label}
            </Button>,
          )
        }
        themed
        fixed
        zDepth={0}
      />
    );

    return (
      <React.Fragment>
        {toolbar}
        <AnalyticsDialog />
        <OmniCard />
        <FloatingButtons />
        <LinkOverlay />
        <Toast />
        <div className='map-container'>
          <AccessMap
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
          />
          <ContextMenu
            visible={contextClick !== null}
            onClickCancel={actions.cancelContext}
            onClickOrigin={() => {
              actions.setOrigin(contextClick.lng,
                                contextClick.lat,
                                'Custom origin');
            }}
            onClickDestination={() => {
              actions.setDestination(contextClick.lng,
                                     contextClick.lat,
                                     'Custom destination');
            }}
          />
          { selectedFeature &&
            <FeatureCard
              className='feature-card'
              title={selectedFeature.layerName}
              featureProperties={Object.values(selectedFeature.properties)}
              onClickClose={() => actions.clearSelectedFeatures()}
            />
          }
        </div>
      </React.Fragment>
    );
  };
}

App.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  contextClick: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  planningTrip: PropTypes.bool,
  mediaType: PropTypes.string,
  selectedFeature: PropTypes.shape({
    type: PropTypes.string,
    info: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  }),
  settingProfile: PropTypes.bool,
};

App.defaultProps = {
  contextClick: null,
  mediaType: null,
  planningTrip: false,
  selectedFeature: null,
  settingProfile: false,
};

const mapStateToProps = (state) => {
  const {
    activities,
    browser,
    map,
  } = state;

  return {
    contextClick: map.contextClick,
    mediaType: browser.mediaType,
    planningTrip: activities.planningTrip,
    settingProfile: activities.settingProfile,
    selectedFeature: map.selectedFeature,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
