import _ from 'lodash'

import {
  REQUEST_RULES, RECEIVE_RULES, UPDATE_RULE, DELETE_RULE
} from '../actions/rule.actions'

function rules(state = { isFetching: false, items: [] }, action) {
  switch (action.type) {
    case RECEIVE_RULES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.rules,
        lastUpdated: action.receivedAt
      })
    case REQUEST_RULES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_RULE:
      var updatedState = Object.assign({}, state, {
        items: state.items.map(rule => {
          if (rule.id === action.rule.id) {
            return Object.assign({}, rule, action.rule);
          }

          return rule;
        })
      });

      // Add new rule
      if (!_.some(updatedState.items, { id: action.rule.id })) {
        updatedState.items.push(action.rule);
      }

      return updatedState;
    case DELETE_RULE:
      return Object.assign({}, state, {
        items: state.items.filter(rule => rule.id !== action.rule.id)
      });
    default:
      return state
  }
}

export default rules