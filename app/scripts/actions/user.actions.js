import userRepository from '../repositories/UserRepository'
import _ from 'lodash'
import promise from 'bluebird'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER = 'UPDATE_USER'

function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users: users,
    receivedAt: Date.now()
  }
}

export function updateUser(user) {
  return dispatch => {

    return userRepository.saveUser(user)
      .then(updatedUser => {
        dispatch({
          type: UPDATE_USER,
          user: updatedUser
        });
      });
  }
}

export function fetchUsers() {
  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.users.items.length) {
      return promise.resolve(); 
    }

    dispatch(requestUsers())
    return userRepository.getUsers()
      .then(users => dispatch(receiveUsers(users)));
  }
}