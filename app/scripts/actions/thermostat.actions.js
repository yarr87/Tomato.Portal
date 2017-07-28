import thermostatRepository from '../repositories/thermostatRepository'
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

export function setThermostatTemperature(thermostatId, temperature) {
  return dispatch => {
    thermostatRepository.setThermostatTemp(thermostatId, temperature);

    // Not dispatching a real action, mostly out of laziness.  The thermostat component just updates its own local state.
  }
}

export function fetchThermostats() {
  return dispatch => {
    dispatch(requestThermostats())
    return thermostatRepository.getThermostats()
      .then(thermostats => dispatch(receiveThermostats(thermostats)))
  }
}