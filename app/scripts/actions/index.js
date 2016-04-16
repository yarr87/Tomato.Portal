import deviceRepository from '../repositories/deviceRepository'
import _ from 'lodash'

export const REQUEST_DEVICES = 'REQUEST_DEVICES'
export const RECEIVE_DEVICES = 'RECEIVE_DEVICES'
export const DEVICE_STATE_SET = 'DEVICE_STATE_SET';
export const DEVICE_STATE_SET_MULTIPLE = 'DEVICE_STATE_SET_MULTIPLE';
export const DELETE_DEVICE = 'DELETE_DEVICE';

function requestDevices() {
  return {
    type: REQUEST_DEVICES
  }
}

function receiveDevices(devices) {
  return {
    type: RECEIVE_DEVICES,
    devices: devices,
    receivedAt: Date.now()
  }
}

function deviceStateSet(deviceInternalName, deviceState) {
  return {
    type: DEVICE_STATE_SET,
    deviceInternalName,
    deviceState
  } 
}

function deviceStateSetMultiple(devices, deviceState) {
  return {
    type: DEVICE_STATE_SET_MULTIPLE,
    devices,
    deviceState
  }
}

export function setDeviceState(deviceInternalName, deviceState, doNotBroadcast) {
  return dispatch => {
    // doNotBroadcast indicates we're setting the local device state but not updating via the api.  Used on dimmers to update
    // local state immediately even though the api call is debounced.
    if (!doNotBroadcast) {
      deviceRepository.sendCommand(deviceInternalName, deviceState);
    }
    dispatch(deviceStateSet(deviceInternalName, deviceState));
  }
}

export function setMultipleDeviceStates(devices, deviceState) {
  return dispatch => {

    _.each(devices, (device) => {
      deviceRepository.sendCommand(device.internalName, deviceState);
    })

    dispatch(deviceStateSetMultiple(devices, deviceState));
  }
}

export function fetchDevices() {
  return dispatch => {
    dispatch(requestDevices())
    return deviceRepository.getDevices()
      .then(devices => dispatch(receiveDevices(devices)))
  }
}

export function deleteDevice(device) {
  return dispatch => {
    dispatch({
      type: DELETE_DEVICE,
      device
    });
    return deviceRepository.deleteDevice(device);
  }
}

// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit))
//     }
//   }
// }