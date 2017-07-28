import _ from 'lodash'

import {
  REQUEST_THERMOSTATS, RECEIVE_THERMOSTATS, UPDATE_THERMOSTAT
} from '../actions/thermostat.actions'

function thermostats(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case RECEIVE_THERMOSTATS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.thermostats,
        lastUpdated: action.receivedAt
      })
    case REQUEST_THERMOSTATS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_THERMOSTAT:
      return Object.assign({}, state, {
        items: state.items.map(thermostat => {
          if (thermostat.id === action.thermostat.id) {
            // avoid overwriting state properties on save (temp, setc).
            // TODO: might be better of omitting properties than including specific ones, in case a new one is added
            return Object.assign({}, thermostat, { 
              name: action.thermostat.name,
              id: action.thermostat.id,
              internalNamePrefix: action.thermostat.internalNamePrefix
            });
          }

          return thermostat;
        })
      })
    default:
      return state
  }
}

export default thermostats