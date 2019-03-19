import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Map from "containers/Map";
import AnalyticsBar from "containers/AnalyticsBar";
import AppDrawer from "containers/AppDrawer";
import FeatureCard from "containers/FeatureCard";
import FloatingButtons from "containers/FloatingButtons";
import Legend from "containers/Legend";
import LinkOverlay from "containers/LinkOverlay";
import MapOverlay from "containers/MapOverlay";
import OmniCard from "containers/OmniCard";
import RegionSelector from "containers/RegionSelector";
import RouteBottomCard from "containers/RouteBottomCard";
import RouteBottomSheet from "containers/RouteBottomSheet";
import SettingsCard from "containers/SettingsCard";
import SignupPrompt from "containers/SignupPrompt";
import Toast from "containers/Toast";
import TopRightButtons from "containers/TopRightButtons";
import Tour from "containers/Tour";

class App extends PureComponent {
  componentDidMount = () => {
    this.props.actions.loadApp();
    window.addEventListener("resize", this.props.actions.resizeWindow);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.props.actions.resizeWindow);
  };

  render = () => (
    <React.Fragment>
      <Toast />
      <AnalyticsBar />
      <AppDrawer />
      <MapOverlay>
        <Legend />
        <OmniCard />
        <SettingsCard />
        <TopRightButtons />
        <FloatingButtons />
        <LinkOverlay />
        <RouteBottomCard />
        <FeatureCard />
      </MapOverlay>
      <Map />
      <RouteBottomSheet />
      <Tour />
      <SignupPrompt />
      <RegionSelector />
    </React.Fragment>
  );
}

App.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
