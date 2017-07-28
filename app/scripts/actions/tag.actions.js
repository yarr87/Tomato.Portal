import tagRepository from '../repositories/tagRepository'
import _ from 'lodash'
import promise from 'bluebird'

export const REQUEST_TAGS = 'REQUEST_TAGS'
export const RECEIVE_TAGS = 'RECEIVE_TAGS'
export const UPDATE_TAG = 'UPDATE_TAG'
export const DELETE_TAG = 'DELETE_TAG'

function requestTags() {
  return {
    type: REQUEST_TAGS
  }
}

function receiveTags(tags) {
  return {
    type: RECEIVE_TAGS,
    tags,
    receivedAt: Date.now()
  }
}

export function updateTag(tag) {
  return dispatch => {

    return tagRepository.addTag(tag)
      .then(updatedTag => {
        dispatch({
          type: UPDATE_TAG,
          tag: updatedTag
        });
      });
  }
}

export function deleteTag(tag) {
  return dispatch => {
    dispatch({
      type: DELETE_TAG,
      tag
    });
    return tagRepository.deleteTag(tag);
  }
}

export function fetchTags() {
  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.tags.items.length) {
      return promise.resolve();
    }

    dispatch(requestTags());
    return tagRepository.getTags()
      .then(tags => dispatch(receiveTags(tags)))
  }
}