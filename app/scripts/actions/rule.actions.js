import ruleRepository from '../repositories/ruleRepository'
import _ from 'lodash'
import promise from 'bluebird'

export const REQUEST_RULES = 'REQUEST_RULES'
export const RECEIVE_RULES = 'RECEIVE_RULES'
export const UPDATE_RULE = 'UPDATE_RULE'
export const DELETE_RULE = 'DELETE_RULE'
export const TOGGLE_RULE = 'TOGGLE_RULE'

function requestRules() {
  return {
    type: REQUEST_RULES
  }
}

function receiveRules(rules) {
  return {
    type: RECEIVE_RULES,
    rules,
    receivedAt: Date.now()
  }
}

// Just a shortcut to updateRule that toggles the isDiabled flag
// TODO: might be worth to make this a real action that updates state immediately, in case
// the update call is slow (seems to be ~50ms in testing, so might not be a big deal)
export function toggleRule(rule) {
  return dispatch => {
    var updatedRule = Object.assign({}, rule, {
      isDisabled: !rule.isDisabled
    });

    return dispatch(updateRule(updatedRule));
  }
}

export function updateRule(rule) {
  return dispatch => {

    return ruleRepository.saveRule(rule)
      .then(updatedRule => {
        dispatch({
          type: UPDATE_RULE,
          rule: updatedRule
        });
      });
  }
}

export function deleteRule(rule) {
  return dispatch => {
    dispatch({
      type: DELETE_RULE,
      rule: rule
    });
    return ruleRepository.deleteRule(rule);
  }
}

export function fetchRules() {
  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.rules.items.length) {
      return promise.resolve(); 
    }

    dispatch(requestRules())
    return ruleRepository.getRules()
      .then(rules => dispatch(receiveRules(rules)))
  }
}