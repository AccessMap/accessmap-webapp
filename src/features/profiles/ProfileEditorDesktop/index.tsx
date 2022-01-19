import React from "react";

import { CardText } from "react-md/src/js/Cards";

import AvoidCurbsToggle from "features/profiles/ProfileSettings/AvoidCurbsToggle";
import AvoidStreetsSlider from "features/profiles/ProfileSettings/AvoidStreetsSlider";
import DownhillSlider from "features/profiles/ProfileSettings/DownhillSlider";
import UphillSlider from "features/profiles/ProfileSettings/UphillSlider";

const ProfileEditorDesktop = () => (
  <CardText className="profile-editor-desktop">
    <AvoidStreetsSlider />
    <UphillSlider />
    <DownhillSlider />
    {"Avoid barriers:"}
    <AvoidCurbsToggle />
  </CardText>
);

export default ProfileEditorDesktop;
