import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import createAnalyticsMiddleware from "./middlewares/create-analytics-middleware";
import {
  createPersistedAnalyticsReducer,
  createPersistedUserReducer,
} from "./middlewares/create-persistor";
import { persistStore } from "redux-persist";

import activitiesReducer from "features/activities/activities-slice";
import analyticsReducer from "features/analytics/analytics-slice";
import appReducer from "features/app/app-slice";
import browserReducer from "features/browser/browser-slice";
import directionsReducer from "features/directions/directions-slice";
import drawerReducer from "features/drawer/drawer-slice";
import geolocationReducer from "features/geolocation/geolocation-slice";
import linksModalReducer from "features/links-modal/links-modal-slice";
import mapReducer from "features/map/map-slice";
import profilesReducer from "features/profiles/profiles-slice";
import regionReducer from "features/region/region-slice";
import toastReducer from "features/toast/toast-slice";
import tourReducer from "features/tour/tour-slice";
import tripOptionsReducer from "features/trip-options/trip-options-slice";
import userReducer from "features/user/user-slice";
import waypointsReducer from "features/waypoints/waypoints-slice";

const rootReducer = combineReducers({
  activities: activitiesReducer,
  analytics: createPersistedAnalyticsReducer(analyticsReducer),
  app: appReducer,
  browser: browserReducer,
  directions: directionsReducer,
  drawer: drawerReducer,
  geolocation: geolocationReducer,
  linksModal: linksModalReducer,
  map: mapReducer,
  profiles: profilesReducer,
  region: regionReducer,
  toast: toastReducer,
  tour: tourReducer,
  tripOptions: tripOptionsReducer,
  user: createPersistedUserReducer(userReducer),
  waypoints: waypointsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      serializableCheck: {
        // redux-persist puts non-serializable properties on its actions
        ignoredActionPaths: ["register", "rehydrate"],
      },
    });

    if (ANALYTICS === "yes") {
      const ANALYTICS_URL = `//${window.location.host}/analytics`;
      middleware = middleware.concat(
        createAnalyticsMiddleware({
          endpoint: ANALYTICS_URL,
        })
      );
    }
    return middleware;
  },
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export { store, persistor };
