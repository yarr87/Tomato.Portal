import _ from 'lodash'

// The ruleDetails state tracks the edits for a single rule's actions and definitions

import {
  ADD_RULE_DEFINITION, DELETE_RULE_DEFINITION, EDIT_RULE_DEFINITION, 
  ADD_RULE_ACTION, DELETE_RULE_ACTION, EDIT_RULE_ACTION, INITIALIZE_RULE_DETAILS
} from '../actions/ruleDetails.actions'

function ruleDetails(state = { actions: [], ruleDefinitions: [] }, action) {
  switch (action.type) {
    case INITIALIZE_RULE_DETAILS:
      return Object.assign({}, state, {
        ruleDefinitions: action.ruleDetails.ruleDefinitions,
        actions: action.ruleDetails.actions
      });
    case ADD_RULE_DEFINITION:
      return Object.assign({}, state, {
        ruleDefinitions: [...state.ruleDefinitions, action.ruleDefinition]
      });
    case DELETE_RULE_DEFINITION:
      return Object.assign({}, state, {
        ruleDefinitions: state.ruleDefinitions.slice(0, action.index)
                                              .concat(state.ruleDefinitions.slice(action.index + 1))
      });
    case EDIT_RULE_DEFINITION: 
      return Object.assign({}, state, {
        ruleDefinitions: state.ruleDefinitions.slice(0, action.index)
                                              .concat([action.ruleDefinition])
                                              .concat(state.ruleDefinitions.slice(action.index + 1))
      });
    case ADD_RULE_ACTION:
      return Object.assign({}, state, {
        actions: [...state.actions, action.action]
      });
    case DELETE_RULE_ACTION:
      return Object.assign({}, state, {
        actions: state.actions.slice(0, action.index)
                              .concat(state.actions.slice(action.index + 1))
      });
    case EDIT_RULE_ACTION: 
      return Object.assign({}, state, {
        actions: state.actions.slice(0, action.index)
                              .concat([action.action])
                              .concat(state.actions.slice(action.index + 1))
      });
    default:
      return state
  }
}

export default ruleDetails