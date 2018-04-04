import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AccessMap from 'containers/AccessMap';
import FeatureCard from 'containers/FeatureCard';
import FloatingButtons from 'containers/FloatingButtons';
import LinkOverlay from 'containers/LinkOverlay';
import MapInfoButton from 'containers/MapInfoButton';
import OmniCard from 'containers/OmniCard';
import RoutingProgressBar from 'containers/RoutingProgressBar';
import Toast from 'containers/Toast';
import Topbar from 'containers/Topbar';

import * as AppActions from 'actions';


class App extends PureComponent {
  componentDidMount = () => {
    this.props.actions.loadApp();
    window.addEventListener('resize', this.props.actions.resizeWindow);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.props.actions.resizeWindow);
  };

  render = () => (
    <React.Fragment>
      <div className='widgets'>
        <Toast />
        <Topbar />
        <RoutingProgressBar />
        <MapInfoButton />
        <FloatingButtons />
        <LinkOverlay />
        <OmniCard />
        <FeatureCard />
      </div>
      <AccessMap />
    </React.Fragment>
  );
}

App.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
