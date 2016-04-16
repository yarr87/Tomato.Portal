import sonosRepository from '../repositories/sonosRepository'
import _ from 'lodash'

export const REQUEST_SONOSES = 'REQUEST_SONOSES'
export const RECEIVE_SONOSES = 'RECEIVE_SONOSES'
export const UPDATE_SONOS = 'UPDATE_SONOS'
export const PLAY_SONOS = 'PLAY_SONOS';
export const PAUSE_SONOS = 'PAUSE_SONOS';
export const PLAY_SONOS_FAVORITE = 'PLAY_SONOS_FAVORITE';

function requestSonoses() {
  return {
    type: REQUEST_SONOSES
  }
}

function receiveSonoses(sonoses) {
  return {
    type: RECEIVE_SONOSES,
    sonoses,
    receivedAt: Date.now()
  }
}

export function updateSonos(sonos) {
  return dispatch => {

    return sonosRepository.saveSonos(sonos)
      .then(updatedSonos => {
        dispatch({
          type: UPDATE_SONOS,
          sonos: updatedSonos
        });
      });
  }
}

export function fetchSonoses() {
  return dispatch => {
    dispatch(requestSonoses())
    return sonosRepository.getSonos()
      .then(sonoses => dispatch(receiveSonoses(sonoses)))
  }
}

export function playSonos(sonos) {
  // Not actually emitting an action, since there's no state involved with this
  return dispatch => {
    sonosRepository.play(sonos);
  }
}

export function pauseSonos(sonos) {
  // Not actually emitting an action, since there's no state involved with this
  return dispatch => {
    sonosRepository.pause(sonos);
  }
}

export function playSonosFavorite(sonos, favorite) {
  // Not actually emitting an action, since there's no state involved with this
  return dispatch => {
    sonosRepository.playFavorite(sonos, favorite);
  }
}