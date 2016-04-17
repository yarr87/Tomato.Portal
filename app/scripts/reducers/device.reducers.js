import _ from 'lodash'

import {
  REQUEST_DEVICES, RECEIVE_DEVICES, DEVICE_STATE_SET, DEVICE_STATE_SET_MULTIPLE, DELETE_DEVICE, UPDATE_DEVICE
} from '../actions/device.actions'

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
      });
    case DELETE_DEVICE:
      return Object.assign({}, state, {
        items: state.items.filter(device => device.id !== action.device.id)
      });
    case UPDATE_DEVICE:
      var updatedState = Object.assign({}, state, {
        items: state.items.map(device => {
          if (device.id === action.device.id) {
            return Object.assign({}, device, action.device);
          }

          return device;
        })
      });

      // Add new device
      if (!_.some(updatedState.items, { id: action.device.id })) {
        updatedState.items.push(action.device);
      }

      return updatedState;
    default:
      return state
  }
}

export default devices