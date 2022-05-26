import { store } from '../redux/store'
import axios from 'axios'

export const getAuthToken = () => {
  return 'Bearer ' + store.getState().app?.token
}

export const getImage = async (url) => {
  if(!url) return null
  try {
    let { data } = await axios.get(url)
    return data
  } catch(err) {
    console.log(err)
    return null
  }
}