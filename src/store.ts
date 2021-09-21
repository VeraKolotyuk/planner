import thunk, {ThunkAction} from 'redux-thunk';
import userReducer from './reducers/userReducer';

import { configureStore } from '@reduxjs/toolkit';
import {AnyAction} from 'redux';

export const store = configureStore({
    reducer: {userReducer},
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;