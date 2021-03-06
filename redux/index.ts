import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Root Reducer
import { rootReducer } from "./reducers/rootReducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['homeFeed', 'myPosts', 'names']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)