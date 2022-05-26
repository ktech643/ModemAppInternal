import { FETCH_CITIES_EVENTS_REQUEST_SENT,RELOADDATA, FETCH_CITIES_EVENTS_SUCCESSFUL, FETCH_CITIES_EVENTS_FAILURE, FETCH_FASHION_WEEK_SHOWS_REQUEST_SENT, FETCH_FASHION_WEEK_SHOWS_SUCCESSFUL, FETCH_FASHION_WEEK_SHOWS_FAILURE, FETCH_FAHSION_SHOWS_BY_ALPHA_REQUEST_SENT, FETCH_FAHSION_SHOWS_BY_ALPHA_SUCCESSFUL, FETCH_FAHSION_SHOWS_BY_FAILURE, FETCH_PRESS_CONTACTS_REQUEST_SENT, FETCH_PRESS_CONTACTS_SUCCESSFUL, FETCH_PRESS_CONTACTS_FAILURE, FETCH_MULTILABEL_SHOWROOMS_REQUEST_SENT, FETCH_MULTILABEL_SHOWROOMS_SUCCESSFUL, FETCH_MULTILABEL_SHOWROOMS_FAILURE, FETCH_BRAND_SHOWROOMS_REQUEST_SENT, FETCH_BRAND_SHOWROOMS_SUCCESSFUL, FETCH_BRAND_SHOWROOMS_FAILURE, FETCH_BRAND_EVENTS_REQUEST_SENT, FETCH_BRAND_EVENTS_SUCCESSFUL, FETCH_BRAND_EVENTS_FAILURE, FETCH_RESTURANTS_REQUEST_SENT, FETCH_RESTURANTS_REQUEST_SUCCESSFUL, FETCH_RESTURANTS_REQUEST_FAILURE, FETCH_HOTELS_REQUEST_SENT, FETCH_HOTELS_REQUEST_SUCCESSFUL, FETCH_HOTELS_REQUEST_FAILURE, FETCH_MULTILABEL_STORES_REQUEST_SENT, FETCH_MULTILABEL_STORES_FAILURE, FETCH_MULTILABEL_STORES_SUCCESSFUL, FETCH_BEAUTY_SALOONS_FAILURE, FETCH_BEAUTY_SALOONS_SUCCESSFUL, FETCH_BEAUTY_SALOONS_REQUEST_SENT, FETCH_TRADE_SHOWS_REQUEST_SENT, FETCH_TRADE_SHOWS_SUCCESSFUL, FETCH_TRADE_SHOWS_FAILURE,FETCH_MULTILABEL_SHOWROOMS_BYBRANDS_SUCCESSFUL } from '../type'
import axios from 'axios'
import { BASEURL } from '../../utils/constants'
// import { getAuthToken } from '../../utils/helpers'

export const fetchCitiesEvents = () => async dispatch => {
  dispatch({
    type: FETCH_CITIES_EVENTS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/cities_events_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_CITIES_EVENTS_SUCCESSFUL,
      citiesEvents: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_CITIES_EVENTS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const reload = (data) => async dispatch => {
  console.log('aaass')
    dispatch({
      type: RELOADDATA,
      reload: data
    })
  
}

export const fetchFashionWeekShows = id => async dispatch => {
  dispatch({
    type: FETCH_FASHION_WEEK_SHOWS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_shows_api.php?id=${id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_FASHION_WEEK_SHOWS_SUCCESSFUL,
      fashionShows: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_FASHION_WEEK_SHOWS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchFashionShowsByAlpha = id => async dispatch => {
  console.log('idd',id)
  dispatch({
    type: FETCH_FAHSION_SHOWS_BY_ALPHA_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_shows_by_alpha_api.php?id=${id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_FAHSION_SHOWS_BY_ALPHA_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_FAHSION_SHOWS_BY_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchMultiLabelStores = (id, cityName) => async dispatch => {
  dispatch({
    type: FETCH_MULTILABEL_STORES_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_multilabel_stores_api.php?id=${id}${cityName ? `&city=${cityName}` : ''}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_MULTILABEL_STORES_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_MULTILABEL_STORES_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchPressContacts = (type, id) => async dispatch => {
  dispatch({
    type: FETCH_PRESS_CONTACTS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_press_contacts_api.php?id=${id}&type=${type}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_PRESS_CONTACTS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_PRESS_CONTACTS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchMultiLabelShowrooms = (id) => async dispatch => {
  dispatch({
    type: FETCH_MULTILABEL_SHOWROOMS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(id ? `${BASEURL}/fashion_weeks_multilabel_showrooms_api.php?id=${id}` : `${BASEURL}/sales_campaigns_showrooms_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    if(id){
    const res = await axios.get(`${BASEURL}/fashion_weeks_multilabel_showrooms_brands_api.php?id=${id?id:'1144'}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_MULTILABEL_SHOWROOMS_BYBRANDS_SUCCESSFUL,
      payload: res.data
    })
  }
  else{
    const ress = await axios.get(`${BASEURL}/sales_campaigns_showrooms_brands_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_MULTILABEL_SHOWROOMS_BYBRANDS_SUCCESSFUL,
      payload: ress.data
    })
  }
    
    dispatch({
      type: FETCH_MULTILABEL_SHOWROOMS_SUCCESSFUL,
      payload: resp.data
    })
    
  } catch(err) {
    dispatch({
      type: FETCH_MULTILABEL_SHOWROOMS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchBrandShowroom = (id) => async dispatch => {
  dispatch({
    type: FETCH_BRAND_SHOWROOMS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(id ? `${BASEURL}/fashion_weeks_designer_showrooms_api.php?id=${id}` : `${BASEURL}/sales_campaigns_brands_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_BRAND_SHOWROOMS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_BRAND_SHOWROOMS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchTradeShows = (id) => async dispatch => {
  dispatch({
    type: FETCH_TRADE_SHOWS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(id ? `${BASEURL}/fashion_weeks_tradeshows_api.php?id=${id}` : `${BASEURL}/sales_campaigns_tradeshows_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_TRADE_SHOWS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_TRADE_SHOWS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchBrandEvents= (id) => async dispatch => {
  dispatch({
    type: FETCH_BRAND_EVENTS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_events_api.php?id=${id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_BRAND_EVENTS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_BRAND_EVENTS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}
export const fetchCitiesResturants= (id) => async dispatch => {
  
  dispatch({
    type: FETCH_RESTURANTS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_restaurants_api.php?id=${id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    // if(Array)
    dispatch({
      type: FETCH_RESTURANTS_REQUEST_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_RESTURANTS_REQUEST_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchCitiesHotels = (id) => async dispatch => {
  dispatch({
    type: FETCH_HOTELS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_hotels_api.php?id=${id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_HOTELS_REQUEST_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_HOTELS_REQUEST_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchBeautySaloons = (id) => async dispatch => {
  dispatch({
    type: FETCH_BEAUTY_SALOONS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/fashion_weeks_beauty_api.php?id=${id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_BEAUTY_SALOONS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_BEAUTY_SALOONS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}
