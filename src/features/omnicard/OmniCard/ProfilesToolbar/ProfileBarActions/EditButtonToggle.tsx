import React from "react";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";

import pencil from "icons/pencil.svg";

const EditButtonToggle = ({ onClick }) => {
  return (
    <Button
      aria-label="Edit trip planning profile"
      className="edit-profile-button"
      icon
      svg
      tooltipLabel="Edit profile settings"
      tooltipPosition="left"
      onClick={onClick}
    >
      <div>
        <SVGIcon use={pencil.url} />
      </div>
    </Button>
  );
};

export default EditButtonToggle;
