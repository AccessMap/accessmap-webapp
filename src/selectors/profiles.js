import { createSelector } from "reselect";
import { defaultProfiles } from "profiles";

const getCustomProfile = state => state.profile.custom;
const getSelectedProfile = state => state.profile.selected;

export const getCurrentProfile = createSelector(
  [getCustomProfile, getSelectedProfile],
  (customProfile, selectedProfile) => {
    switch (selectedProfile) {
      case "Custom":
        return customProfile;
      default:
        return defaultProfiles[selectedProfile];
    }
  }
);
