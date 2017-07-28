import ruleRepository from '../repositories/ruleRepository'
import _ from 'lodash'
import promise from 'bluebird'

// Actions related to editing a single rule's actions and triggers

export const ADD_RULE_DEFINITION = 'ADD_RULE_DEFINITION'
export const DELETE_RULE_DEFINITION = 'DELETE_RULE_DEFINITION'
export const EDIT_RULE_DEFINITION = 'EDIT_RULE_DEFINITION'
export const INITIALIZE_RULE_DETAILS = 'INITIALIZE_RULE_DETAILS'

export function initializeRuleDetails(ruleId) {
  return (dispatch, getState) => {

    var state = getState();

    // Already loaded, don't reload
    if (state.rules.items.length) {

      var ruleDetails;

      // Add
      if (!ruleId) {
        ruleDetails = {
          name: '',
          description: '',
          isDisabled: false,
          ruleDefinitions: [],
          actions: []
        };
      }
      else {
        ruleDetails = _.find(state.rules.items, { id: ruleId });
      }

      return dispatch({
        type: INITIALIZE_RULE_DETAILS,
        ruleDetails: ruleDetails
      });
    }

    // Bit of a hack, if the rules aren't loaded yet force them to load here then initialize again...
    return ruleRepository.getRules()
      .then(() => dispatch(initializeRuleDetails(ruleId)));
  }

  
}

// TODO: got rid of the action version by just using redux-form (see editRuleActionList).  Could do the same here.

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
