import { combineReducers } from 'redux';
import appReducer from './reducers/appReducer';
import citiesReducer from './reducers/citiesReducer';
import agendasReducer from './reducers/agendasReducer';
import homeReducer from './reducers/homeReducer';

const rootReducer = combineReducers({
  app: appReducer,
  cities: citiesReducer,
  agendas: agendasReducer,
  home: homeReducer
});

export default rootReducer;