import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import { SelectionControlGroup } from "react-md/src/js/SelectionControls";
import SVGIcon from "react-md/src/js/SVGIcons";

// TODO: place in separate data module
import caneIcon from "icons/cane-user.svg";
import wheelchairIcon from "icons/wheelchair.svg";
import wheelchairPoweredIcon from "icons/wheelchair-powered.svg";
import personPinIcon from "icons/person-pin.svg";
const icons = {
   "cane-user": caneIcon,
   "wheelchair": wheelchairIcon,
   "wheelchair-powered": wheelchairPoweredIcon,
   "person-pin": personPinIcon,
};

import profiles from "profiles";

const ProfileList = props => {
  const { actions, profileName } = props;

  return (
    <SelectionControlGroup
      className="profiles-container"
      id="profile-radio-selector"
      name="routing-profile-selector"
      type="radio"
      controlClassName="md-inline-block"
      defaultValue={profileName}
      onChange={(d, e) => {
        if (e.type === "change") {
          actions.setProfile(d);
        } else if (e.type === "keydown") {
          // This is improper navigation - arrow keys + space is better. But
          // either this never worked for react-md or it broke at some point...
          actions.setProfile(d);
        }
      }}
      controls={Object.keys(profiles).map(profileKey => {
        let profile = profiles[profileKey];
        return {
          label: profileName === profile.name ? (<h6 aria-hidden>{profile.name}</h6>) : "",
          value: profile.name,
          className: profileName === profile.name ? "profile-selected" : "",
          checkedRadioIcon: (
            <SVGIcon
              aria-label={profile.label}
              secondary
              use={icons[profile.icon].url}
            />
          ),
          uncheckedRadioIcon: (
            <SVGIcon
              aria-label={profile.label}
              use={icons[profile.icon].url}
            />
          ),
          inkDisabled: true
        };
      })}
    />
  );
};

ProfileList.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  profileName: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { profile } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    profileName: currentProfile.name
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileList);
