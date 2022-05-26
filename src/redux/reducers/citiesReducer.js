import {
  FETCH_CITIES_EVENTS_REQUEST_SENT,
  FETCH_CITIES_EVENTS_SUCCESSFUL,
  FETCH_CITIES_EVENTS_FAILURE,
  FETCH_FASHION_WEEK_SHOWS_REQUEST_SENT,
  FETCH_FASHION_WEEK_SHOWS_SUCCESSFUL,
  FETCH_FASHION_WEEK_SHOWS_FAILURE,
  FETCH_FAHSION_SHOWS_BY_ALPHA_REQUEST_SENT,
  FETCH_FAHSION_SHOWS_BY_ALPHA_SUCCESSFUL,
  FETCH_FAHSION_SHOWS_BY_FAILURE,
  FETCH_PRESS_CONTACTS_REQUEST_SENT,
  FETCH_PRESS_CONTACTS_SUCCESSFUL,
  FETCH_PRESS_CONTACTS_FAILURE,
  FETCH_MULTILABEL_SHOWROOMS_REQUEST_SENT,
  FETCH_MULTILABEL_SHOWROOMS_SUCCESSFUL,
  FETCH_MULTILABEL_SHOWROOMS_BYBRANDS_SUCCESSFUL,
  FETCH_MULTILABEL_SHOWROOMS_FAILURE,
  FETCH_BRAND_SHOWROOMS_REQUEST_SENT,
  FETCH_BRAND_SHOWROOMS_SUCCESSFUL,
  FETCH_BRAND_SHOWROOMS_FAILURE,
  FETCH_BRAND_EVENTS_REQUEST_SENT,
  FETCH_BRAND_EVENTS_SUCCESSFUL,
  FETCH_BRAND_EVENTS_FAILURE,
  FETCH_RESTURANTS_REQUEST_SENT,
  FETCH_RESTURANTS_REQUEST_SUCCESSFUL,
  FETCH_RESTURANTS_REQUEST_FAILURE,
  FETCH_HOTELS_REQUEST_SENT,
  FETCH_HOTELS_REQUEST_SUCCESSFUL,
  FETCH_HOTELS_REQUEST_FAILURE,
  FETCH_BEAUTY_SALOONS_REQUEST_SENT,
  FETCH_BEAUTY_SALOONS_SUCCESSFUL,
  FETCH_BEAUTY_SALOONS_FAILURE,
  FETCH_MULTILABEL_STORES_SUCCESSFUL,
  FETCH_MULTILABEL_STORES_REQUEST_SENT,
  FETCH_MULTILABEL_STORES_FAILURE,
  FETCH_TRADE_SHOWS_REQUEST_SENT,
  FETCH_TRADE_SHOWS_SUCCESSFUL,
  FETCH_TRADE_SHOWS_FAILURE,
} from "../type";

const initialState = {
  loading: false,
  message: null,
  citiesEvents: [],
  multiLabelShowrooms: [],
  multiLabelShowroomsbybrands: [],
  tradeShows: [],
  multiLabelStores: [],
  beautySaloons: [],
  fashionShows: null,
  citiesEventsByAlpha: [],
  pressContacts: null,
  brandShowroomData: [],
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_EVENTS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_CITIES_EVENTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        citiesEvents: action.citiesEvents,
      };
    case FETCH_CITIES_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_FASHION_WEEK_SHOWS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_FASHION_WEEK_SHOWS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        fashionShows: { ...action.fashionShows },
      };
    case FETCH_FASHION_WEEK_SHOWS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_FAHSION_SHOWS_BY_ALPHA_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_FAHSION_SHOWS_BY_ALPHA_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        citiesEventsByAlpha: { ...action.payload },
      };
    case FETCH_FAHSION_SHOWS_BY_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_PRESS_CONTACTS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_PRESS_CONTACTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        pressContacts: action.payload,
      };
    case FETCH_PRESS_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        messgae: action.message,
      };
    case FETCH_MULTILABEL_SHOWROOMS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_MULTILABEL_SHOWROOMS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        multiLabelShowrooms: action.payload,
      };
    case FETCH_MULTILABEL_SHOWROOMS_BYBRANDS_SUCCESSFUL:
      console.log("payload", action.payload);
      return {
        ...state,
        loading: false,
        multiLabelShowroomsbybrands: action.payload,
      };
    case FETCH_MULTILABEL_SHOWROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_TRADE_SHOWS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_TRADE_SHOWS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        tradeShows: action.payload,
      };
    case FETCH_TRADE_SHOWS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_MULTILABEL_STORES_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_MULTILABEL_STORES_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        multiLabelStores: action.payload,
      };
    case FETCH_MULTILABEL_STORES_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_BRAND_SHOWROOMS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_BRAND_SHOWROOMS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        brandShowroomData: action.payload, //need to change multilabelshowrooms to the desired data
      };
    case FETCH_BRAND_SHOWROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_BRAND_EVENTS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_BRAND_EVENTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        brandEventsData: action.payload, //need to change multilabelshowrooms to the desired data
      };
    case FETCH_BRAND_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_RESTURANTS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_RESTURANTS_REQUEST_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        citiesresturant: action.payload, //need to change multilabelshowrooms to the desired data
      };
    case FETCH_RESTURANTS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_HOTELS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_BEAUTY_SALOONS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_BEAUTY_SALOONS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        beautySaloons: action.payload,
      };
    case FETCH_BEAUTY_SALOONS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case FETCH_HOTELS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null,
      };
    case FETCH_HOTELS_REQUEST_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        citieshotel: action.payload, //need to change multilabelshowrooms to the desired data
      };
    case FETCH_HOTELS_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default citiesReducer;
