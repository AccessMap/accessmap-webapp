import { createMigrate, persistReducer } from "redux-persist";
// localStorage persistence
import storage from "redux-persist/lib/storage";

const userMigrations = {
  0: (state) => ({
    _persist: state._persist,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    sub: state.sub,
  }),
  1: (state) => ({
    _persist: state._persist,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }),
};

// Use of 'key' is unclear. Hopefully it's mostly about the key in
// localStorage and not essential to diving into the state tree.
const userPersistConfig = {
  key: "auth",
  storage,
  version: 1,
  migrate: createMigrate(userMigrations, { debug: false }),
  whitelist: ["accessToken", "refreshToken"],
};

const createUserReducer = (rootReducer) =>
  persistReducer<any, any>(userPersistConfig, rootReducer);

export default createUserReducer;
