import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';

import AccessMap from 'containers/AccessMap';
import AnalyticsDialog from 'containers/AnalyticsDialog';
import FeatureCard from 'containers/FeatureCard';
import FloatingButtons from 'containers/FloatingButtons';
import LinkOverlay from 'containers/LinkOverlay';
import MapInfoButton from 'containers/MapInfoButton';
import OmniCard from 'containers/OmniCard';
import Toast from 'containers/Toast';

import AccessMapIcon from 'components/Icons/AccessMapIcon';
import AccessMapLogo from 'components/Icons/AccessMapLogo';

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
      mediaType,
      planningTrip,
      settingProfile,
      viewingMapInfo,
    } = this.props;

    const mobile = mediaType === 'MOBILE';

    const links = [{
      label: 'About',
      action: actions.clickAboutLink,
    }, {
      label: 'Contact',
      action: actions.clickContactLink,
    }];

    const hideToolbar = (planningTrip || settingProfile || viewingMapInfo) && mobile;
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
        <AnalyticsDialog />
        <div className='widgets'>
          <Toast />
          {toolbar}
          <MapInfoButton />
          <FloatingButtons />
          <LinkOverlay />
          <OmniCard />
          <FeatureCard />
        </div>
        <AccessMap />
      </React.Fragment>
    );
  };
}

App.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  planningTrip: PropTypes.bool,
  mediaType: PropTypes.string,
  settingProfile: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
};

App.defaultProps = {
  mediaType: null,
  planningTrip: false,
  settingProfile: false,
  viewingMapInfo: false,
};

const mapStateToProps = (state) => {
  const {
    activities,
    browser,
  } = state;

  return {
    mediaType: browser.mediaType,
    planningTrip: activities.planningTrip,
    settingProfile: activities.settingProfile,
    viewingMapInfo: activities.viewingMapInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
