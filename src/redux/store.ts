import { Action, ThunkAction, configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import signInReducer from "./slices/signInSlice";
import firstLoginReducer from "./slices/firstLoginSlice";
import { useDispatch } from "react-redux";


const rootReducer = combineReducers({
    signIn: signInReducer,
    firstLogin: firstLoginReducer,
});
  
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
  
export const store = configureStore({
    reducer: {
    signIn: signInReducer,
    firstLogin: firstLoginReducer,
    },
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;