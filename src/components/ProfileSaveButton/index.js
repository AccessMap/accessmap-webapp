import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";

import sync from "icons/sync.svg";

const ProfileSaveButton = ({ onClick, mini }) => (
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

ProfileSaveButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ProfileSaveButton;
