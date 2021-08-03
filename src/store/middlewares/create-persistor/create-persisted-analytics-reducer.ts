import { createMigrate, persistReducer } from "redux-persist";
// localStorage persistence
import storage from "redux-persist/lib/storage";

// Note: _persist is a required key for the (mostly unmaintained) redux-persist
// library migration state.
const analyticsMigrations = {
  0: (state) => ({
    ...state,
  }),
  1: (state) => ({
    _persist: state._persist,
    enabled: state.enabled,
  }),
};

const analyticsPersistConfig = {
  key: "analytics",
  storage,
  version: 1,
  migrate: createMigrate(analyticsMigrations, { debug: false }),
  whitelist: ["enabled"],
};

const createAnalyticsReducer = (rootReducer) =>
  persistReducer<any, any>(analyticsPersistConfig, rootReducer);
export default createAnalyticsReducer;
