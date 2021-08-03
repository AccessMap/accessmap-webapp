import React from "react";

// TODO: place in separate data module
import caneIcon from "icons/cane-user.svg";
import wheelchairIcon from "icons/wheelchair.svg";
import wheelchairPoweredIcon from "icons/wheelchair-powered.svg";
import personPinIcon from "icons/person-pin.svg";

import { ProfileIconButton } from "./ProfileIconButton";

import { ProfilesState } from "features/profiles/profiles-slice";

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

const icons = {
  "cane-user": caneIcon,
  wheelchair: wheelchairIcon,
  "wheelchair-powered": wheelchairPoweredIcon,
  "person-pin": personPinIcon,
};

interface Props extends ProfilesState {
  onSelectProfile(profile: string): void;
}

const ProfileList = ({
  selected,
  profiles,
  onSelectProfile,
  editingProfile,
}: Props) => {
  return (
    <div
      className="profile-list"
      role="radiogroup"
      onKeyDown={(e) => {
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

        const profile = Object.keys(profiles)[newIndex];
        onSelectProfile(profile);
      }}
    >
      {Object.keys(profiles).map((profileKey) => {
        const profile = profiles[profileKey];
        const isSelected = profileKey === selected;
        return (
          <ProfileIconButton
            key={`profile-icon-button-${profileKey}`}
            isSelected={isSelected}
            onClick={() => onSelectProfile(profileKey)}
            profileKey={profileKey}
            label={profile.label}
            iconURL={icons[profile.icon].url}
          />
        );
      })}
    </div>
  );
};

export default ProfileList;
