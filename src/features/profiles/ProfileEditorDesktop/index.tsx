import React from "react";

import { CardText } from "react-md/src/js/Cards";

import AvoidCurbsToggle from "features/profiles/ProfileSettings/AvoidCurbsToggle";
import DownhillSlider from "features/profiles/ProfileSettings/DownhillSlider";
import UphillSlider from "features/profiles/ProfileSettings/UphillSlider";
import ProfileSaveButton from "features/profiles/ProfileSaveButton";

import { useAppSelector, useAppDispatch } from "hooks";

import { openSignupPrompt } from "features/user/user-slice";
import { saveProfile } from "features/profiles/profiles-slice";

const ProfileEditorDesktop = () => {
  const dispatch = useAppDispatch();

  const { selected: selectedProfile } = useAppSelector(
    (state) => state.profiles
  );
  // TODO: log in prompt should be layed out elsewhere
  const { isLoggedIn } = useAppSelector((state) => state.user);

  return (
    <CardText className="profile-editor-desktop">
      <UphillSlider />
      <DownhillSlider />
      {"Avoid barriers:"}
      <AvoidCurbsToggle />
      {selectedProfile === "Custom" && (
        <ProfileSaveButton
          mini={false}
          onClick={() => {
            if (isLoggedIn) {
              dispatch(saveProfile());
            } else {
              dispatch(openSignupPrompt());
            }
          }}
        />
      )}
    </CardText>
  );
};

export default ProfileEditorDesktop;
