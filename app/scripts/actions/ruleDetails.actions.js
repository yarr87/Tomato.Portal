import ruleRepository from '../repositories/RuleRepository'
import _ from 'lodash'
import promise from 'bluebird'

// Actions related to editing a single rule's actions and triggers

export const ADD_RULE_DEFINITION = 'ADD_RULE_DEFINITION'
export const DELETE_RULE_DEFINITION = 'DELETE_RULE_DEFINITION'
export const EDIT_RULE_DEFINITION = 'EDIT_RULE_DEFINITION'
export const ADD_RULE_ACTION = 'ADD_RULE_ACTION'
export const DELETE_RULE_ACTION = 'DELETE_RULE_ACTION'
export const EDIT_RULE_ACTION = 'EDIT_RULE_ACTION'
export const INITIALIZE_RULE_DETAILS = 'INITIALIZE_RULE_DETAILS'

export function initializeRuleDetails(ruleId) {
  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.rules.items.length) {
      return dispatch({
        type: INITIALIZE_RULE_DETAILS,
        ruleDetails: _.find(state.rules.items, { id: ruleId })
      });
    }

    // Bit of a hack, if the rules aren't loaded yet force them to load here then initialize again...
    return ruleRepository.getRules()
      .then(() => dispatch(initializeRuleDetails(ruleId)));
  }

  
}

export function addRuleAction(action) {
  return {
    type: ADD_RULE_ACTION,
    action
  }
}

export function deleteRuleAction(index) {
  return {
    type: DELETE_RULE_ACTION,
    index
  }
}

export function editRuleAction(action, index) {
  return {
    type: EDIT_RULE_ACTION,
    action,
    index
  }
}

export function addRuleDefinition(ruleDefinition) {
  return {
    type: ADD_RULE_DEFINITION,
    ruleDefinition
  }
}

export function deleteRuleDefinition(index) {
  return {
    type: DELETE_RULE_DEFINITION,
    index
  }
}

export function editRuleDefinition(ruleDefinition, index) {
  return {
    type: EDIT_RULE_DEFINITION,
    ruleDefinition,
    index
  }
}