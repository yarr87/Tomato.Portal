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
import EditDevice from './components/device_edit/editDevice'

import TagList from './components/tags/tag_list/tagList'
import EditTag from './components/tags/tag_edit/editTag'

import UserList from './components/users/userList/userList'
import EditUser from './components/users/userEdit/editUser'

import SceneDashboard from './components/scenes/sceneDashboard'
import SceneList from './components/scenes/sceneList'
import EditScene from './components/scenes/editScene'
import SceneTriggers from './components/scenes/triggers/sceneTriggers'

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
		<Route path="devices/add" component={EditDevice} />
		<Route path="devices/edit/:id" component={EditDevice} />

		<Route path="tags" component={TagList} />
		<Route path="tags/add" component={EditTag} />
		<Route path="tags/edit/:id" component={EditTag} />

		<Route path="users" component={UserList} />
		<Route path="users/add" component={EditUser} />
		<Route path="users/edit/:id" component={EditUser} />

		<Route path="scenes" component={SceneDashboard} />
		<Route path="scenes/list" component={SceneList} />
		<Route path="scenes/add" component={EditScene} />
		<Route path="scenes/edit/:id" component={EditScene} />
		<Route path="scenes/triggers" component={SceneTriggers} />
  </Route>
)