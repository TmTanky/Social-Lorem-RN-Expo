import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Root Reducer
import { rootReducer } from "./reducers/rootReducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)