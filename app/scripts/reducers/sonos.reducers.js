import _ from 'lodash'

import {
  REQUEST_SONOSES, RECEIVE_SONOSES, UPDATE_SONOS
} from '../actions/sonos.actions'

function sonoses(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case RECEIVE_SONOSES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.sonoses,
        lastUpdated: action.receivedAt
      })
    case REQUEST_SONOSES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_SONOS:
      return Object.assign({}, state, {
        items: state.items.map(sonos => {
          if (sonos.id === action.sonos.id) {
            return Object.assign({}, sonos, action.sonos);
          }

          return sonos;
        })
      })
    default:
      return state
  }
}

export default sonoses