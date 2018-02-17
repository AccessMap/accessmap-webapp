/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import * as AppActions from '../../actions';
import { bindActionCreators } from 'redux';

import List from 'react-md/lib/Lists';
import SelectField from 'react-md/lib/SelectFields';
import Button from 'react-md/lib/Buttons';
import { createUserProfile } from '../../utils/api';

export function RoutingProfileSelector (props) {
  const {
    actions,
    userRoutingProfiles,
    currentlySelectedProfileIndex,
    user,
    currentActivatedProfile
  } = props;

  const profileItems = [];
  for (let i = 0; i < userRoutingProfiles.length; i++) {
    profileItems.push({
      label: String(userRoutingProfiles[i].profileName),
      value: i,
    });
  }

  if (!user) {
    return (<div/>);
  }

  return (
    <div>
      <SelectField
        id="user-profile-select"
        label="Profile"
        // placeholder="..."
        className="md-cell"
        menuItems={profileItems}
        // position={SelectField.Positions.BELOW}
        // simplifiedMenu={true}
        value={currentlySelectedProfileIndex}
        onChange={(idx) => {
          actions.changeUserRoutingProfileSelection(idx);
          actions.setProfile({
            profileName: userRoutingProfiles[idx].profileName,
            inclineIdeal: -0.01,
            inclineMax: userRoutingProfiles[idx].inclineMax,
            inclineMin: userRoutingProfiles[idx].inclineMin,
            requireCurbRamps: userRoutingProfiles[idx].avoidCurbs,
          });
        }}
        onClick={() => actions.refreshUserRoutingProfiles()}
      />
      <Button
        icon
        onClick={() => {
          createUserProfile({
            profileName: "New Profile",
            inclineMin: currentActivatedProfile.inclineMin,
            inclineMax: currentActivatedProfile.inclineMax,
            inclineIdeal: currentActivatedProfile.inclineIdeal,
            avoidCurbs: currentActivatedProfile.requireCurbRamps,
            avoidConstruction: true,
          })
        }}>
        favorite
      </Button>
    </div>
  );
}

function mapStateToProps (state) {
  return {
    userRoutingProfiles: state.userpreference.userRoutingProfiles,
    currentlySelectedProfileIndex: state.userpreference.currentlySelectedProfileIndex,
    currentActivatedProfile: state.routingprofile,
    user: state.oidc.user,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutingProfileSelector);