import deviceRepository from '../repositories/deviceRepository'
import _ from 'lodash'
import promise from 'bluebird'

export const REQUEST_DEVICES = 'REQUEST_DEVICES'
export const RECEIVE_DEVICES = 'RECEIVE_DEVICES'
export const DEVICE_STATE_SET = 'DEVICE_STATE_SET';
export const DEVICE_STATE_SET_MULTIPLE = 'DEVICE_STATE_SET_MULTIPLE';
export const DELETE_DEVICE = 'DELETE_DEVICE';
export const UPDATE_DEVICE = 'UPDATE_DEVICE';

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

export function deviceStateSet(deviceInternalName, deviceState) {
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

  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.devices.items.length) {
      return promise.resolve();
    }

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

export function updateDevice(device) {
  return dispatch => {

    return deviceRepository.addDevice(device)
      .then(updatedDevice => {
        dispatch({
          type: UPDATE_DEVICE,
          device: updatedDevice
        });
      });
  }
}

// Exposing globally for signalR
//window._deviceStateSet = deviceStateSet;