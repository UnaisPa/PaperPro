import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import tempUserSlice from "./tempUserSlice";
import condRenderSlice from "./condRenderSlice";
import postSlice from "./postSlice";
import adminSlice from "./adminSlice";
import positionsSlice from "./positionsSlice";
import completedTradesSlice from "./completedTradesSlice";
const rootReducer = combineReducers({
    user: userReducer,
    tempUser: tempUserSlice,
    condRender: condRenderSlice,
    posts:postSlice,
    admin:adminSlice,
    positions:positionsSlice,
    completedTrades:completedTradesSlice
});
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user', 'tempUser','admin'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)