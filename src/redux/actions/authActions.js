import { REQUEST_SENT, REQUEST_FAILED, LOGIN_SUCESS, REGISTER_USER_REQUEST_SENT, REGISTER_USER_REQUEST_SUCCESSFULL, REGISTER_USER_REQUEST_FAILURE, PRESIGNED_URL_REQUEST_SUCCESSFUL, PRESIGNED_URL_REQUEST_SENT, PRESIGNED_URL_REQUEST_FAILURE, UPLOADING_FILE, UPLOADING_FILE_SUCCESSFUL, UPLOADING_FILE_FAILURE, CLEARALL } from '../type'
import axios from 'axios'
import { BASEURL } from '../../utils/constants'

export const login = ({ email, password }) => async dispatch => {
  dispatch({
    type: REQUEST_SENT
  })

  try {
    const resp = await axios.post(`${BASEURL}/login`, {
      email, password
    }, {
      headers: {
        'content-type': 'application/json'
      }
    })

    dispatch({
      type: LOGIN_SUCESS,
      user: resp.data.user,
      token: resp.data.token
    })
  } catch(err) {
    dispatch({
      type: REQUEST_FAILED,
      error: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const register = (payload) => async dispatch => {
  dispatch({
    type: REGISTER_USER_REQUEST_SENT
  })
  try {
    const resp = await axios.post(`${BASEURL}/register`, payload, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    dispatch({
      type: REGISTER_USER_REQUEST_SUCCESSFULL,
      user: resp.data.user,
      token: resp.data.token
    })
  } catch(err) {
    dispatch({
      type: REGISTER_USER_REQUEST_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const getPresignedURL = (payload) => async dispatch => {
  dispatch({
    type: PRESIGNED_URL_REQUEST_SENT
  })

  console.log('Fetching urll........')

  try {
    const { data } = await axios.post(`${BASEURL}/get-presigned-url`, payload, {
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log(data)

    dispatch({
      type: PRESIGNED_URL_REQUEST_SUCCESSFUL,
      url: data.url
    })
  } catch(err) {
    console.log(err.response.data, err.response.status)
    dispatch({
      type: PRESIGNED_URL_REQUEST_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const uploadFile = (url, image, contentType) => async dispatch => {
  dispatch({
    type: UPLOADING_FILE
  })

  try {
    const { data } = await axios.put(url, `data:image/${contentType},${image}`, {
      headers: {
        'Host': 'volunteen-app.s3.amazonaws.com',
        'Content-Type': contentType,
        'Content-Length': image.length
      }
    });
    dispatch({
      type: UPLOADING_FILE_SUCCESSFUL,
      url: data.url
    })
  } catch(err) {
    console.log(err.response.data, err.response.status)
    dispatch({
      type: UPLOADING_FILE_FAILURE,
      message: (err.response && err.response.data.message) ? err.response.data.message : err.message
    })
  }
}

export const clearAll = () => dispatch => {
  dispatch({
    type: CLEARALL
  })
}