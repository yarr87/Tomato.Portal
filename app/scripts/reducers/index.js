import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import thermostats from './thermostat.reducers'
import sonoses from './sonos.reducers'
import rules from './rule.reducers'
import ruleDetails from './ruleDetails.reducers'
import users from './user.reducers'
import _ from 'lodash'

import {
  REQUEST_DEVICES, RECEIVE_DEVICES, DEVICE_STATE_SET, DEVICE_STATE_SET_MULTIPLE
} from '../actions'

function devices(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case RECEIVE_DEVICES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.devices,
        lastUpdated: action.receivedAt
      })
    case REQUEST_DEVICES:
      console.log('request devices!');
      return Object.assign({}, state, {
        isFetching: true
      })
    case DEVICE_STATE_SET:
      return Object.assign({}, state, {
          items: state.items.map((device, index) => {
            if (device.internalName === action.deviceInternalName) {
              return Object.assign({}, device, {
                state: action.deviceState
              })
            }
            return device
          })
        })
    case DEVICE_STATE_SET_MULTIPLE:
      return Object.assign({}, state, {
        items: state.items.map((device) => {

          if (_.some(action.devices, { internalName: device.internalName })) {
            return Object.assign({}, device, { 
              state: action.deviceState
            });
          }

          return device
        })
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  devices,
  thermostats,
  sonoses,
  rules,
  ruleDetails,
  users,
  routing,
  form: formReducer // from redux-form
})

export default rootReducer