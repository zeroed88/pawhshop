import {
  APP_REQUEST,
  APP_FAIL,
  APP_SUCCESS,
  APP_ON_MODAL,
  APP_OFF_MODAL,
  MODAL_REGISTRATION,
  MODAL_LOGIN
} from '../constants/App'

import {parseJSON} from '../utilis/fetchJSON'

export function appRequest(){
  return {
    type: APP_REQUEST
  }
}

export function appSuccess(){
  return {
    type: APP_SUCCESS
  }
}

export function appFail(payload){
  return {
    type: APP_FAIL,
    payload: {
      errorMsg: payload.errorMsg
    }
  }
}

export function showLoginWindow(){
  return {
    type: APP_ON_MODAL,
    payload: {
      type: MODAL_LOGIN
    }
  }
}

export function showRegistrationWindow(){
  return {
    type: APP_ON_MODAL,
    payload: {
      type: MODAL_REGISTRATION
    }
  }
}

export function hideLoginWindow(){
  return {
    type: APP_OFF_MODAL
  }
}

export const errorDispatcher = dispatch => error => {
  if(typeof(error) !== 'object') {
      dispatch(appFail({errorMsg: error}))
      return
    }
  if (error.constructor.name === 'SubmissionError'){
      dispatch(appFail({errorMsg: error.errors._error}))
      return
  }

  parseJSON(error.response)
  .then(er => {
    dispatch(appFail({errorMsg: JSON.stringify(er)}))
  })
}

