import thunk, {ThunkAction} from 'redux-thunk';
import userReducer from './reducers/userReducer';
import balanceWheelReducer from './reducers/balanceWheelReducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { configureStore } from '@reduxjs/toolkit';
import {AnyAction} from 'redux';
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

export const store = configureStore({
    reducer: {userReducer, balanceWheelReducer, router: connectRouter(history),},
    middleware: [thunk, routerMiddleware(history)],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;