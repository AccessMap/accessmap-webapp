import React from "react";

import Toolbar from "react-md/src/js/Toolbars";

import ProfileList from "features/profiles/ProfileList";

import { useAppSelector, useAppDispatch } from "hooks";

import { select as selectProfile } from "features/profiles/profiles-slice";
import { requestDirections } from "features/directions/directions-slice";

const ProfilesToolbar = ({ actions }) => {
  const dispatch = useAppDispatch();

  const {
    profiles,
    selected: selectedProfile,
    editingProfile,
  } = useAppSelector((state) => state.profiles);

  return (
    <Toolbar
      className="profiles-toolbar"
      title={
        <ProfileList
          selected={selectedProfile}
          profiles={profiles}
          onSelectProfile={(profile) => {
            dispatch(selectProfile(profile));
            dispatch(requestDirections());
          }}
          editingProfile={editingProfile}
        />
      }
      actions={actions}
    />
  );
};

export default ProfilesToolbar;
