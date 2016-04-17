import _ from 'lodash'

import {
  REQUEST_USERS, RECEIVE_USERS, UPDATE_USER, DELETE_USER
} from '../actions/user.actions'

function users(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.users,
        lastUpdated: action.receivedAt
      })
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_USER:
      var updatedState = Object.assign({}, state, {
        items: state.items.map(user => {
          if (user.id === action.user.id) {
            return Object.assign({}, user, action.user);
          }

          return user;
        })
      });

      // Add new user
      if (!_.some(updatedState.items, { id: action.user.id })) {
        updatedState.items.push(action.user);
      }

      return updatedState;
    case DELETE_USER:
      return Object.assign({}, state, {
        items: state.items.filter(user => user.id !== action.user.id)
      });
    default:
      return state
  }
}

export default users