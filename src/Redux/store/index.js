import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers'; // the value from combineReducers

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
const initialState = { isLoggedIn: false, email: "" };

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer,initialState);
export const persistor = persistStore(store);



