import _ from 'lodash'

import {
  REQUEST_SCENE_TRIGGERS, RECEIVE_SCENE_TRIGGERS, UPDATE_SCENE_TRIGGERS,
  LOCAL_SCENE_TRIGGERS_UPDATE, LOCAL_SCENE_TRIGGERS_INIT
} from '../actions/sceneTrigger.actions'

function sceneTriggers(state = { isFetching: false, items: [], local: [] }, action) {
  switch (action.type) {
    case RECEIVE_SCENE_TRIGGERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.sceneTriggers,
        lastUpdated: action.receivedAt
      });
    case REQUEST_SCENE_TRIGGERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case UPDATE_SCENE_TRIGGERS:
      var updatedState = Object.assign({}, state, {
        items: action.sceneTriggers
      });

      return updatedState;
    case LOCAL_SCENE_TRIGGERS_UPDATE:
      return Object.assign({}, state, {
        local: action.sceneTriggers
      });
    case LOCAL_SCENE_TRIGGERS_INIT: {
      return Object.assign({}, state, {
        local: action.sceneTriggers
      });
    }
    default:
      return state
  }
}

export default sceneTriggers