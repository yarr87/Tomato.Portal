import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Layout from './components/Layout'
import ThermostatList from './components/hvac/thermostatList'
import EditThermostat from './components/hvac/editThermostat'

import SonosList from './components/sonos/sonosList'
import EditSonos from './components/sonos/editSonos'

export default (
  <Route path="/" component={Layout}>
  	<IndexRoute component={App} />

  	<Route path="thermostats" component={ThermostatList} />
  	<Route path="thermostats/add" component={EditThermostat} />
  	<Route path="thermostats/edit/:id" component={EditThermostat} />

  	<Route path="sonos" component={SonosList} />
  	<Route path="sonos/add" component={EditSonos} />
  	<Route path="sonos/edit/:id" component={EditSonos} />
  </Route>
)