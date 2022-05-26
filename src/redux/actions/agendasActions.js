import { FETCH_FASHION_WEEKS_AGENDA_REQUEST_SENT, FETCH_FASHION_WEEKS_AGENDA_SUCCESSFUL, FETCH_FASHION_WEEKS_AGENDA_FAILURE, FETCH_SALES_COMPAIGNS_BRANDS_REQUEST_SENT, FETCH_SALES_COMPAIGNS_BRANDS_SUCCESSFUL, FETCH_SALES_COMPAIGNS_BRANDS_FAILURE, FETCH_SALES_COMPAIGNS_TRADESHOWS_REQUEST_SENT, FETCH_SALES_COMPAIGNS_TRADESHOWS_SUCCESSFUL, FETCH_SALES_COMPAIGNS_TRADESHOWS_FAILURE, FETCH_INTERNATION_AGENDA_SENT, FETCH_INTERNATION_AGENDA_SUCCESSFUL, FETCH_INTERNATION_AGENDA_FAILED, FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_REQUEST_SENT, FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_SUCCESSFUL, FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_FAILURE } from '../type'
import axios from 'axios';
import { BASEURL } from '../../utils/constants';

export const fetchFashionWeeksAgenda = (param) => async dispatch => {
  dispatch({
    type: FETCH_FASHION_WEEKS_AGENDA_REQUEST_SENT
  })
  try {
    console.log('params',param)
    console.log('params',`${BASEURL}/apilfashion_week_calendar_api.php?${param}`)
    let resp
    if(param==''){
    resp = await axios.get(`${BASEURL}/fashion_week_calendar_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }
  else{

    resp = await axios.get(param, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }
    dispatch({
      type: FETCH_FASHION_WEEKS_AGENDA_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_FASHION_WEEKS_AGENDA_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchSalesCompaignsBrands = () => async dispatch => {
  dispatch({
    type: FETCH_SALES_COMPAIGNS_BRANDS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/sales_campaigns_brands_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_SALES_COMPAIGNS_BRANDS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_SALES_COMPAIGNS_BRANDS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchSalesCompaignsMultiLabelShowrooms = () => async dispatch => {
  dispatch({
    type: FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/sales_campaigns_showrooms_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchSalesCompaignsTradeShows = () => async dispatch => {
  dispatch({
    type: FETCH_SALES_COMPAIGNS_TRADESHOWS_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/sales_campaigns_tradeshows_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_SALES_COMPAIGNS_TRADESHOWS_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_SALES_COMPAIGNS_TRADESHOWS_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchInternationAgenda = (param) =>  async dispatch => {
  try {
    dispatch({
      type: FETCH_INTERNATION_AGENDA_SENT
    })
    let resp=''
    if(param==''){
       resp = await axios.get(`${BASEURL}/tradeshows_calendar_api.php`, {
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
    }
    else{
       resp = await axios.get(`${BASEURL}/tradeshows_calendar_api.php?m=${param}`, {
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      console.log('resp2',resp)
    }
    dispatch({
      type: FETCH_INTERNATION_AGENDA_SUCCESSFUL,
      payload: resp.data
    })
  } catch (err) {
    dispatch({
      type: FETCH_INTERNATION_AGENDA_FAILED,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}
