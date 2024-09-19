import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from "@/app/auth/login/slice/authSlice";
import deletePosReducer from "@/app/dashboard/position/slices/deleteSlice"
import editPosReducer from "@/app/dashboard/position/slices/editSlice";
import editAgencyeEducer from "@/app/dashboard/agency/slices/editAgencySlice";
import deleteAgencyReducer from "@/app/dashboard/agency/slices/deleteAgencySlice";
import deleteDeptReducer from "@/app/dashboard/departments/slices/delDepSlice";
import editDeptReducer from "@/app/dashboard/departments/slices/editDeptSlice";
import deleteServReducer from "@/app/dashboard/serviceses/slices/deleteServSlice";
import editEmployeeReducer from "@/app/dashboard/view-employees/slices/editEmployeeSlice";
import deleteEmployeeReducer from "@/app/dashboard/view-employees/slices/deleteEmployeeSlice";
// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  deletePos: deletePosReducer,
  editPos: editPosReducer,
  editAgen: editAgencyeEducer,
  deleteAgen: deleteAgencyReducer,
  delDept: deleteDeptReducer,
  editDept: editDeptReducer,
  delServ: deleteServReducer,
  editEmpl: editEmployeeReducer,
  deleteEmpl: deleteEmployeeReducer,
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