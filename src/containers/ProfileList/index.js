import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import SVGIcon from "react-md/src/js/SVGIcons";

// TODO: place in separate data module
import caneIcon from "icons/cane-user.svg";
import wheelchairIcon from "icons/wheelchair.svg";
import wheelchairPoweredIcon from "icons/wheelchair-powered.svg";
import personPinIcon from "icons/person-pin.svg";

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

const icons = {
  "cane-user": caneIcon,
  wheelchair: wheelchairIcon,
  "wheelchair-powered": wheelchairPoweredIcon,
  "person-pin": personPinIcon
};

import { defaultProfiles } from "profiles";

class ProfileIconButton extends React.Component {
  state = {
    hover: false
  };

  _handleOnMouseEnter = () => {
    this.setState({ hover: true });
  };

  _handleOnMouseLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    const { iconURL, isSelected, label, onClick, profileKey } = this.props;
    const { hover } = this.state;

    return (
      <div
        className={cn("profile-btn-container", {
          selected: isSelected
        })}
        role="radio"
        tabIndex={isSelected ? 0 : -1}
        aria-checked={isSelected}
        aria-label={label}
      >
        <button
          className={cn("md-btn md-btn--icon md-pointer--hover", {
            "md-btn--hover": hover
          })}
          onClick={onClick}
          onMouseEnter={this._handleOnMouseEnter}
          onMouseLeave={this._handleOnMouseLeave}
        >
          <div className="icon-container">
            <SVGIcon
              className={cn("profile-icon", {
                selected: isSelected
              })}
              use={iconURL}
            />
          </div>
          {isSelected ? (
            <h6 className="profile-selected-label">{profileKey}</h6>
          ) : null}
        </button>
      </div>
    );
  }
}

ProfileIconButton.propTypes = {
  iconURL: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  profileKey: PropTypes.string.isRequired
};

const ProfileList = props => {
  const { actions, selected, profiles } = props;

  /* eslint-disable jsx-a11y/interactive-supports-focus */
  // NOTE: eslint a11y check disabled here because it wants the radiogroup div to be
  // focusable - it is presumably wanting to see the children of role="radiogroup" and
  // see tabIndex="0" somewhere, but it can't do it because the children aren't
  // hard-coded.
  // TODO: maybe adding tabIndex=* in the .map scope would help the linter?
  return (
    <div
      className="profile-list"
      role="radiogroup"
      label="Select a profile"
      onKeyDown={e => {
        const key = e.which || e.keyCode;
        const increment = key === DOWN || key === RIGHT;
        const decrement = key === UP || key === LEFT;
        if (!increment && !decrement) return;

        e.preventDefault();

        let selectedIndex;
        let i = 0;
        const profileKeys = Object.keys(profiles);
        // So messy
        for (let profileKey of profileKeys) {
          if (profileKey === selected) {
            selectedIndex = i;
            break;
          }
          i += 1;
        }

        let newIndex = increment ? selectedIndex + 1 : selectedIndex - 1;
        if (newIndex < 0 || newIndex >= profileKeys.length) {
          return;
        }

        actions.selectProfile(Object.keys(profiles)[newIndex]);
      }}
    >
      {Object.keys(profiles).map(profileKey => {
        const profile = profiles[profileKey];
        const isSelected = profileKey === selected;
        return (
          <ProfileIconButton
            key={`profile-icon-button-${profileKey}`}
            isSelected={isSelected}
            onClick={() => {
              actions.selectProfile(profileKey);
            }}
            profileKey={profileKey}
            label={profile.label}
            iconURL={icons[profile.icon].url}
          />
        );
      })}
    </div>
  );
  /* eslint-enable jsx-a11y/interactive-supports-focus */
};

ProfileList.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  selected: PropTypes.string.isRequired,
  profiles: PropTypes.shape().isRequired
};

const mapStateToProps = state => {
  const { profile } = state;

  const profiles = {
    ...defaultProfiles,
    Custom: profile.custom
  };

  return {
    profiles,
    selected: profile.selected
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileList);
