import { persistStore } from "redux-persist";

const createPersistor = store => persistStore(store);

export default createPersistor;
