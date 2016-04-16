import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Layout from './components/Layout'
import ThermostatList from './components/hvac/thermostatList'
import EditThermostat from './components/hvac/editThermostat'

import SonosList from './components/sonos/sonosList'
import EditSonos from './components/sonos/editSonos'

import RuleList from './components/rules/ruleList'
import EditRule from './components/rules/editRule'

import DeviceList from './components/device_list/deviceList'

export default (
  <Route path="/" component={Layout}>
  	<IndexRoute component={App} />

  	<Route path="thermostats" component={ThermostatList} />
  	<Route path="thermostats/add" component={EditThermostat} />
  	<Route path="thermostats/edit/:id" component={EditThermostat} />

  	<Route path="sonos" component={SonosList} />
  	<Route path="sonos/add" component={EditSonos} />
  	<Route path="sonos/edit/:id" component={EditSonos} />

  	<Route path="rules" component={RuleList} />
  	<Route path="rules/add" component={EditRule} />
  	<Route path="rules/edit/:id" component={EditRule} />

		<Route path="devices" component={DeviceList} />
  </Route>
)