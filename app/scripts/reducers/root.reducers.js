import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as formReducer} from 'redux-form';
import devices from './device.reducers'
import thermostats from './thermostat.reducers'
import sonoses from './sonos.reducers'
import rules from './rule.reducers'
import ruleDetails from './ruleDetails.reducers'
import tags from './tag.reducers'
import users from './user.reducers'

const rootReducer = combineReducers({
  devices,
  thermostats,
  sonoses,
  rules,
  ruleDetails,
  tags,
  users,
  routing,
  form: formReducer // from redux-form
});

export default rootReducer