import { CLEARALL, FIRST_OPEN, LOGIN_SUCESS, REQUEST_FAILED, REQUEST_SENT, REGISTER_USER_REQUEST_SENT, REGISTER_USER_REQUEST_SUCCESSFULL, REGISTER_USER_REQUEST_FAILURE, LOGOUT, PRESIGNED_URL_REQUEST_SENT, PRESIGNED_URL_REQUEST_SUCCESSFUL, UPLOADING_FILE, UPLOADING_FILE_SUCCESSFUL, UPLOADING_FILE_FAILURE } from '../type'

const initialState = {
  loading: false,
  loggedIn: false,
  checked: false,
  me: {},
  token: null,
  message: null,
  userType: 0,
  presignedURL: null,
  uploadingFile: false,
  fileUploaded: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIRST_OPEN:
      return {
        ...state,
        checked: true
      }
    case REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case LOGIN_SUCESS:
      return {
        ...state,
        loading: false,
        me: action.user,
        token: action.token,
        loggedIn: true,
        userType: action.user.userType
      }
    case REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        message: action.error
      }
    case CLEARALL:
      return {
        ...state,
        loading: false,
        message: null
      }
    case REGISTER_USER_REQUEST_SENT: 
      return {
        ...state,
        loading: true,
        message: null
      }
    case REGISTER_USER_REQUEST_SUCCESSFULL: 
      return {
        ...state,
        loading: false,
        me: action.user,
        token: action.token,
        loggedIn: true,
        userType: action.user.userType
      }
    case REGISTER_USER_REQUEST_FAILURE: 
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case PRESIGNED_URL_REQUEST_SENT: 
      return {
        ...state,
        message: null
      }
    case PRESIGNED_URL_REQUEST_SUCCESSFUL:
      return {
        ...state,
        presignedURL: action.url
      }
    case REGISTER_USER_REQUEST_FAILURE: 
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case UPLOADING_FILE: 
      return {
        ...state,
        message: null,
        uploadingFile: true,
        fileUploaded: false
      }
    case UPLOADING_FILE_SUCCESSFUL:
      return {
        ...state,
        uploadingFile: false,
        fileUploaded: true
      }
    case UPLOADING_FILE_FAILURE: 
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case LOGOUT:
      return {
        ...initialState,
        checked: true
      }
    default:
      return state
  }
}

export default appReducer