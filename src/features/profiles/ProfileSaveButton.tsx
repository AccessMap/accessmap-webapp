import React from "react";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";

import sync from "icons/sync.svg";

interface Props {
  onClick?(event: React.MouseEvent): void;
  mini: boolean;
}

const ProfileSaveButton = ({ onClick, mini }: Props) => (
  <Button
    className="save-profile-button"
    raised
    primary
    iconEl={mini ? null : <SVGIcon use={sync.url} />}
    onClick={onClick}
  >
    Save
  </Button>
);

export default ProfileSaveButton;
