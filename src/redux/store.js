import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import thunk from 'redux-thunk';
import storage from './storage';
import authReducer from './reducers/auth.slice';
import patientReducer from './reducers/patient.slice';
import footballReducer from './reducers/football.slice';
import tournamentSouthReducer from './reducers/tournamentSouth.slice';
import tournamentEastReducer from './reducers/tournamentEast.slice';
import tournamentWestReducer from './reducers/tournamentWest.slice';
import tournamentMidWestReducer from './reducers/tournamentMidWest.slice';



const reducers = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  football:footballReducer,
  tournamentSouth:tournamentSouthReducer,
  tournamentEast:tournamentEastReducer,
  tournamentWest:tournamentWestReducer,
  tournamentMidWest:tournamentMidWestReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['patient']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


export default store;
