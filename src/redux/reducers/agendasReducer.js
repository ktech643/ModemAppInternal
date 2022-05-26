import { FETCH_FASHION_WEEKS_AGENDA_REQUEST_SENT, FETCH_FASHION_WEEKS_AGENDA_SUCCESSFUL, FETCH_FASHION_WEEKS_AGENDA_FAILURE, FETCH_SALES_COMPAIGNS_BRANDS_REQUEST_SENT, FETCH_SALES_COMPAIGNS_BRANDS_SUCCESSFUL, FETCH_SALES_COMPAIGNS_BRANDS_FAILURE, FETCH_SALES_COMPAIGNS_TRADESHOWS_REQUEST_SENT, FETCH_SALES_COMPAIGNS_TRADESHOWS_SUCCESSFUL, FETCH_SALES_COMPAIGNS_TRADESHOWS_FAILURE, FETCH_INTERNATION_AGENDA_SENT, FETCH_INTERNATION_AGENDA_SUCCESSFUL, FETCH_INTERNATION_AGENDA_FAILED, FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_REQUEST_SENT, FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_SUCCESSFUL, FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_FAILURE } from '../type'

const initialState = {
  loading: false,
  message: null,
  fashionWeeksAgendas: [],
  saleCompaignBrands: [],
  saleCompaignTradeShows: [],
  saleCompaignMultiLabelShowrooms: []
}

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FASHION_WEEKS_AGENDA_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_FASHION_WEEKS_AGENDA_SUCCESSFUL:
      return {
        ...state,
        loading:false,
        fashionWeeksAgendas: action.payload
      }
    case FETCH_FASHION_WEEKS_AGENDA_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case FETCH_SALES_COMPAIGNS_BRANDS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_SALES_COMPAIGNS_BRANDS_SUCCESSFUL:
      return {
        ...state,
        loading:false,
        saleCompaignBrands: action.payload
      }
    case FETCH_SALES_COMPAIGNS_BRANDS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_SUCCESSFUL:
      return {
        ...state,
        loading:false,
        saleCompaignMultiLabelShowrooms: action.payload
      }
    case FETCH_SALES_COMPAIGNS_MULTILABEL_SHOWROOMS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case FETCH_SALES_COMPAIGNS_TRADESHOWS_REQUEST_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_SALES_COMPAIGNS_TRADESHOWS_SUCCESSFUL:
      return {
        ...state,
        loading:false,
        saleCompaignTradeShows: action.payload
      }
    case FETCH_SALES_COMPAIGNS_TRADESHOWS_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    case FETCH_INTERNATION_AGENDA_SENT:
      return {
        ...state,
        loading: true,
        message: null
      }
    case FETCH_INTERNATION_AGENDA_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        internationAgenda: action.payload
      }
    case FETCH_INTERNATION_AGENDA_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    default:
      return state
  }
}

export default citiesReducer