import _ from 'lodash'

import {
  REQUEST_TAGS, RECEIVE_TAGS, UPDATE_TAG, DELETE_TAG
} from '../actions/tag.actions'

function tags(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case RECEIVE_TAGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.tags,
        lastUpdated: action.receivedAt
      })
    case REQUEST_TAGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_TAG:
      var updatedState = Object.assign({}, state, {
        items: state.items.map(tag => {
          if (tag.id === action.tag.id) {
            return Object.assign({}, tag, action.tag);
          }

          return tag;
        })
      });

      // Add new tag
      if (!_.some(updatedState.items, { id: action.tag.id })) {
        updatedState.items.push(action.tag);
      }

      return updatedState;
    case DELETE_TAG:
      return Object.assign({}, state, {
        items: state.items.filter(tag => tag.id !== action.tag.id)
      });
    default:
      return state
  }
}

export default tags