import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from "@/app/auth/login/slice/authSlice";
import deletePosReducer from "@/app/dashboard/position/slices/deleteSlice"
import editPosReducer from "@/app/dashboard/position/slices/editSlice"
// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  deletePos: deletePosReducer,
  editPos: editPosReducer
})

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };