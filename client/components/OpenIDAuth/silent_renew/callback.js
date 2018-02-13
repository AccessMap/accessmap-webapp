import React from "react";
import { connect } from "react-redux";
import { processSilentRenew } from 'redux-oidc';

class SilentRenewPage extends React.Component {
  componentWillMount () {
    processSilentRenew();
  }

  render() {
    return (
      <div style={{display: 'none'}}/>
    );
  }
}

export default connect()(SilentRenewPage);
