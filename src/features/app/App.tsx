import React, { useEffect } from "react";

import { Map } from "features/map/Map";

import MapOverlay from "features/mapoverlay/MapOverlay";

import Drawer from "features/drawer/Drawer";
import POICard from "features/waypoints/POICard";
import FloatingButtons from "features/map/FloatingButtons";
import LinksModal from "features/links-modal/LinksModal";
import OmniCard from "features/omnicard/OmniCard";
import RegionSelector from "features/region/RegionSelector";
import DirectionsCard from "features/directions/DirectionsCard";
import DirectionsSheet from "features/directions/DirectionsSheet";
import ProfileEditorMobile from "features/profiles/ProfileEditorMobile";
import SignupPrompt from "features/user/SignupPrompt";
import SpeedLegend from "features/profiles/SpeedLegend";
import Toast from "features/toast/Toast";
import TopRightButtons from "features/map/TopRightButtons";
import Tour from "features/tour/Tour";

import { useAppSelector, useAppDispatch } from "hooks";
import { load as loadApp } from "features/app/app-slice";

const App = () => {
  const dispatch = useAppDispatch();
  const loaded = useAppSelector((state) => state.app.loaded);
  const mediaType = useAppSelector((state) => state.browser.mediaType);
  const currentActivity = useAppSelector(
    (state) => state.activities.currentActivity
  );

  useEffect(() => {
    if (!loaded) {
      dispatch(loadApp());
    }
  });

  return (
    <>
      <Drawer />
      <div className="map-view">
        <MapOverlay mediaType={mediaType} activity={currentActivity}>
          <div className="omnicard-section">
            <OmniCard />
            <ProfileEditorMobile />
          </div>
          <div className="map-section">
            <TopRightButtons />
            <FloatingButtons />
          </div>
        </MapOverlay>
        <DirectionsCard />
        <POICard />
        <Map />
        {currentActivity === "directions-info" && <DirectionsSheet />}
        {currentActivity === "directions-steps" && <DirectionsSheet />}
        <Toast />
      </div>
      <SpeedLegend />
      <Tour />
      <SignupPrompt />
      <RegionSelector />
      <LinksModal />
    </>
  );
};

export default App;
