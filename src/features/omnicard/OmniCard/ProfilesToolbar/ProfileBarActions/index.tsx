import React from "react";

import EditButtonToggle from "./EditButtonToggle";
import TripOptionsToggle from "./TripOptionsToggle";

import { useAppSelector, useAppDispatch } from "hooks";

import { clickProfileEditButton } from "features/profiles/profiles-slice";

interface ProfileBarActionsProps {
  editButton?: boolean;
  tripOptionsToggle?: boolean;
  showingTripOptions?: boolean;
  onClickShowTripOptions?(): void;
  onClickHideTripOptions?(): void;
}

const ProfileBarActions = ({
  editButton = false,
  tripOptionsToggle = false,
  showingTripOptions = false,
  onClickShowTripOptions,
  onClickHideTripOptions,
}: ProfileBarActionsProps) => {
  const dispatch = useAppDispatch();

  const { selected: selectedProfile } = useAppSelector(
    (state) => state.profiles
  );

  return (
    <>
      {editButton && selectedProfile === "Custom" && (
        <EditButtonToggle onClick={() => dispatch(clickProfileEditButton())} />
      )}
      {tripOptionsToggle && (
        <TripOptionsToggle
          showingTripOptions={showingTripOptions}
          onClickShowTripOptions={onClickShowTripOptions}
          onClickHideTripOptions={onClickHideTripOptions}
        />
      )}
    </>
  );
};

export default ProfileBarActions;
