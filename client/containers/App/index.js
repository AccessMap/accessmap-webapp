import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import AccessMap from 'containers/AccessMap';
import AnalyticsBar from 'containers/AnalyticsBar';
import FeatureCard from 'containers/FeatureCard';
import FloatingButtons from 'containers/FloatingButtons';
import LinkOverlay from 'containers/LinkOverlay';
import MapInfoButton from 'containers/MapInfoButton';
import MapOverlay from 'containers/MapOverlay';
import OmniCard from 'containers/OmniCard';
import RoutingProgressBar from 'containers/RoutingProgressBar';
import DirectionsCard from 'containers/DirectionsCard';
import SettingsCard from 'containers/SettingsCard';
import TeaserButton from 'containers/TeaserButton';
import Toast from 'containers/Toast';
import TopBar from 'containers/TopBar';

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
      viewingDirections,
    } = this.props;

    return (
      <React.Fragment>
        <div className={cn('mapview', { directions: viewingDirections })}>
          <Toast />
          <TopBar />
          <AnalyticsBar />
          <MapOverlay>
            <RoutingProgressBar />
            <OmniCard />
            <SettingsCard />
            <MapInfoButton />
            <FloatingButtons />
            <LinkOverlay />
            <TeaserButton />
            <FeatureCard />
          </MapOverlay>
          <AccessMap />
        </div>
        <DirectionsCard />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  viewingDirections: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  viewingDirections: state.activities.viewingDirections,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
