import { FETCH_HOME_DATA_REQUEST_SENT, FETCH_HOME_DATA_SUCCESSFUL, FETCH_HOME_DATA_FAILURE, FETCH_ARTICLE_REQUEST_SENT, FETCH_ARTICLE_SUCCESSFUL, FETCH_ARTICLE_FAILURE } from '../type'
const initialState = {
  loading: false,
  message: null,
  homeData: [],
  articleData: null
}

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_DATA_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_HOME_DATA_SUCCESSFUL:
      return {
        ...state,
        loading:false,
        homeData: action.payload
      }
    case FETCH_HOME_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case FETCH_ARTICLE_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_ARTICLE_SUCCESSFUL:
      return {
        ...state,
        loading:false,
        articleData: action.payload
      }
    case FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message
      }  
    default:
      return state
  }
}

export default homeReducer