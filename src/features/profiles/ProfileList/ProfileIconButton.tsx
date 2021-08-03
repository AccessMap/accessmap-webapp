import React, { useState } from "react";

import cn from "classnames";

import SVGIcon from "react-md/src/js/SVGIcons";

interface Props {
  iconURL: string;
  isSelected: boolean;
  label: string;
  onClick(event: React.MouseEvent): void;
  profileKey: string;
}

const ProfileIconButton = ({
  iconURL,
  isSelected,
  label,
  onClick,
  profileKey,
}: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cn("profile-btn-container", {
        selected: isSelected,
      })}
      role="radio"
    >
      <button
        className={cn("md-btn md-btn--icon md-pointer--hover", {
          "md-btn--hover": hover,
        })}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        tabIndex={isSelected ? 0 : -1}
        aria-checked={isSelected}
        aria-label={label}
      >
        <div className="icon-container">
          <SVGIcon
            className={cn("profile-icon", {
              selected: isSelected,
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
};

export { ProfileIconButton };
