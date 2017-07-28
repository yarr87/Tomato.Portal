import _ from 'lodash'

import {
  REQUEST_SCENES, RECEIVE_SCENES, DELETE_SCENE, UPDATE_SCENE
} from '../actions/scene.actions'

function scenes(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case RECEIVE_SCENES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.scenes,
        lastUpdated: action.receivedAt
      });
    case REQUEST_SCENES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_SCENE:
      return Object.assign({}, state, {
        items: state.items.filter(scene => scene.id !== action.scene.id)
      });
    case UPDATE_SCENE:
      var updatedState = Object.assign({}, state, {
        items: state.items.map(scene => {
          if (scene.id === action.scene.id) {
            return Object.assign({}, scene, action.scene);
          }

          return scene;
        })
      });

      // Add new scene
      if (!_.some(updatedState.items, { id: action.scene.id })) {
        updatedState.items.push(action.scene);
      }

      return updatedState;
    default:
      return state
  }
}

export default scenes