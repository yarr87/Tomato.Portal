import thermostatRepository from '../repositories/ThermostatRepository'
import _ from 'lodash'

export const REQUEST_THERMOSTATS = 'REQUEST_THERMOSTATS'
export const RECEIVE_THERMOSTATS = 'RECEIVE_THERMOSTATS'
export const UPDATE_THERMOSTAT = 'UPDATE_THERMOSTAT'

function requestThermostats() {
  return {
    type: REQUEST_THERMOSTATS
  }
}

function receiveThermostats(thermostats) {
  return {
    type: RECEIVE_THERMOSTATS,
    thermostats: thermostats,
    receivedAt: Date.now()
  }
}

export function updateThermostat(thermostat) {
  return dispatch => {

    return thermostatRepository.saveThermostat(thermostat)
      .then(updatedThermostat => {
        dispatch({
          type: UPDATE_THERMOSTAT,
          thermostat: updatedThermostat
        });
      });
  }
}

// function deviceStateSet(deviceInternalName, deviceState) {
//   return {
//     type: DEVICE_STATE_SET,
//     deviceInternalName,
//     deviceState
//   } 
// }

// export function setDeviceState(deviceInternalName, deviceState, doNotBroadcast) {
//   return dispatch => {
//     // doNotBroadcast indicates we're setting the local device state but not updating via the api.  Used on dimmers to update
//     // local state immediately even though the api call is debounced.
//     if (!doNotBroadcast) {
//       deviceRepository.sendCommand(deviceInternalName, deviceState);
//     }
//     dispatch(deviceStateSet(deviceInternalName, deviceState));
//   }
// }

export function fetchThermostats() {
  return dispatch => {
    dispatch(requestThermostats())
    return thermostatRepository.getThermostats()
      .then(thermostats => dispatch(receiveThermostats(thermostats)))
  }
}