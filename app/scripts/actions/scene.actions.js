import sceneRepository from '../repositories/sceneRepository'
import _ from 'lodash'
import promise from 'bluebird'

export const REQUEST_SCENES = 'REQUEST_SCENES';
export const RECEIVE_SCENES = 'RECEIVE_SCENES';
export const DELETE_SCENE = 'DELETE_SCENE';
export const UPDATE_SCENE = 'UPDATE_SCENE';
//export const TEST_SCENE = 'TEST_SCENE';
//export const TRIGGER_SCENE = 'TRIGGER_SCENE';


function requestScenes() {
  return {
    type: REQUEST_SCENES
  }
}

function receiveScenes(scenes) {
  return {
    type: RECEIVE_SCENES,
    scenes,
    receivedAt: Date.now()
  }
}

export function triggerScene(scene) {
  return dispatch => {
    sceneRepository.triggerScene(scene);
  }
}

export function testScene(scene) {
  return dispatch => {
    sceneRepository.testScene(scene);
  }
}

export function fetchScenes() {

  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.scenes.items.length) {
      return promise.resolve();
    }

    dispatch(requestScenes())
    return sceneRepository.getScenes()
      .then(scenes => dispatch(receiveScenes(scenes)))
  }
}

export function deleteScene(scene) {
  return dispatch => {
    dispatch({
      type: DELETE_SCENE,
      scene
    });
    return sceneRepository.deleteScene(scene);
  }
}

export function updateScene(scene) {
  return dispatch => {

    return sceneRepository.saveScene(scene)
      .then(updatedScene => {
        dispatch({
          type: UPDATE_SCENE,
          scene: updatedScene
        });
      });
  }
}