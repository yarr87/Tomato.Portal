import sceneTriggerRepository from '../repositories/sceneTriggerRepository'
import _ from 'lodash'
import promise from 'bluebird'

export const REQUEST_SCENE_TRIGGERS = 'REQUEST_SCENE_TRIGGERS';
export const RECEIVE_SCENE_TRIGGERS = 'RECEIVE_SCENE_TRIGGERS';
export const UPDATE_SCENE_TRIGGERS = 'UPDATE_SCENE_TRIGGERS';
export const LOCAL_SCENE_TRIGGERS_INIT = 'LOCAL_SCENE_TRIGGERS_INIT'
export const LOCAL_SCENE_TRIGGERS_UPDATE = 'LOCAL_SCENE_TRIGGERS_UPDATE'

function requestSceneTriggers() {
  return {
    type: REQUEST_SCENE_TRIGGERS
  }
}

function receiveSceneTriggers(sceneTriggers) {
  return {
    type: RECEIVE_SCENE_TRIGGERS,
    sceneTriggers,
    receivedAt: Date.now()
  }
}

export function fetchSceneTriggers() {

  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.sceneTriggers.items.length) {
      dispatch(initLocalSceneTriggers(state.sceneTriggers.items));
      return promise.resolve();
    }

    dispatch(requestSceneTriggers())
    return sceneTriggerRepository.getSceneTriggers()
      .then(sceneTriggers => {

        dispatch(initLocalSceneTriggers(sceneTriggers));

        return dispatch(receiveSceneTriggers(sceneTriggers));
      });
  }
}

export function updateSceneTriggers(sceneTriggers) {
  return dispatch => {

    return sceneTriggerRepository.saveSceneTriggers(sceneTriggers)
      .then(updatedSceneTriggers => {
        dispatch({
          type: UPDATE_SCENE_TRIGGERS,
          sceneTriggers: updatedSceneTriggers
        });
      });
  }
}

// local version before saving
function initLocalSceneTriggers(sceneTriggers) {
  return {
    type: LOCAL_SCENE_TRIGGERS_INIT,
    sceneTriggers
  }
}

export function updateLocalSceneTriggers(sceneTriggers) {
  return {
    type: LOCAL_SCENE_TRIGGERS_UPDATE,
    sceneTriggers
  }
}