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
    const { icon, isSelected, label, onClick, profileKey } = this.props;
    const { hover } = this.state;

    return (
      <div
        className={cn("profile-btn-container", {
          selected: isSelected
        })}
      >
        <button
          className={cn("md-btn md-btn--icon md-pointer--hover", {
            "md-btn--hover": hover
          })}
          aria-checked={isSelected}
          role="radio"
          taxIndex={isSelected ? 0 : -1}
          onClick={onClick}
          onMouseEnter={this._handleOnMouseEnter}
          onMouseLeave={this._handleOnMouseLeave}
        >
          <div className="icon-container">
            <SVGIcon
              className={cn("profile-icon", {
                selected: isSelected
              })}
              aria-label={label}
              use={icon.url}
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
  icon: PropTypes.node.isRequired,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  profileKey: PropTypes.string.isRequired
};

const ProfileList = props => {
  const { actions, selected, profiles } = props;

  return (
    <div
      className="profile-list"
      role="radiogroup"
      onKeyDown={e => {
        const key = e.which || e.keyCode;
        const increment = key === DOWN || key === RIGHT;
        const decrement = key === UP || key === LEFT;
        if (!increment && !decrement) return;

        e.preventDefault();

        let selectedIndex;
        let i = 0;
        // So messy
        for (let profileKey of Object.keys(profiles)) {
          if (profileKey === selected) {
            selectedIndex = i;
            break;
          }
          i += 1;
        }

        let newIndex = increment ? selectedIndex + 1 : selectedIndex - 1;
        if (newIndex < 0) {
          newIndex = profiles.length;
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
            icon={icons[profile.icon]}
          />
        );
      })}
    </div>
  );
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
