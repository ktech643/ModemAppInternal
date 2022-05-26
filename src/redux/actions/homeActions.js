import { FETCH_HOME_DATA_REQUEST_SENT, FETCH_HOME_DATA_SUCCESSFUL, FETCH_HOME_DATA_FAILURE, FETCH_ARTICLE_REQUEST_SENT, FETCH_ARTICLE_SUCCESSFUL, FETCH_ARTICLE_FAILURE } from '../type'
import axios from 'axios'
import { BASEURL } from '../../utils/constants'

export const fetchHomeData = () => async dispatch => {
  dispatch({
    type: FETCH_HOME_DATA_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/homepage_api.php`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_HOME_DATA_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_HOME_DATA_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const fetchArticle = (id) => async dispatch => {
  dispatch({
    type: FETCH_ARTICLE_REQUEST_SENT
  })
  try {
    const resp = await axios.get(`${BASEURL}/article_api.php?id=${id}`, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    dispatch({
      type: FETCH_ARTICLE_SUCCESSFUL,
      payload: resp.data
    })
  } catch(err) {
    dispatch({
      type: FETCH_ARTICLE_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}