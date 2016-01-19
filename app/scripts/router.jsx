var Globals = require('globals');
var React = Globals.React;
var Router = Globals.Router;
var Route = Router.Route;
var DefaultRoute = Router.IndexRoute;
var RRouter = Router.Router;

var Layout = require('components/layout');
var Home = require('components/home');
var Main = require('components/main');
var DeviceList = require('components/device_list/deviceList');
var EditDevice = require('components/device_edit/editDevice');
var TagList = require('components/tags/tag_list/tagList');
var EditTag = require('components/tags/tag_edit/editTag');
var UserList = require('components/users/userList/userList');
var EditUser = require('components/users/userEdit/editUser');
var SceneList = require('components/scenes/sceneList');
var SceneDashboard = require('components/scenes/sceneDashboard');
var EditScene = require('components/scenes/editScene');
var SceneTriggers = require('components/scenes/triggers/sceneTriggers');
var RuleList = require('components/rules/ruleList');
var EditRule = require('components/rules/editRule');
var Thermostat = require('components/hvac/thermostat');

var routes = (
  <Route path="/" component={Layout}>
    <Route path="/" component={Main} />

    <Route path="devices" component={DeviceList} />
    <Route path="devices/add" component={EditDevice} />
    <Route path="devices/edit/:id" component={EditDevice} />

    <Route path="tags" component={TagList} />
    <Route path="tags/add" component={EditTag} />
    <Route path="tags/edit/:id" component={EditTag} />

    <Route path="users" component={UserList} />
    <Route path="users/add" component={EditUser} />
    <Route path="users/edit/:id" component={EditUser} />

    <Route path="rules" component={RuleList} />
    <Route path="rules/add" component={EditRule} />
    <Route path="rules/edit/:id" component={EditRule} />

    <Route path="scenes" component={SceneDashboard} />
    <Route path="scenes/list" component={SceneList} />
    <Route path="scenes/add" component={EditScene} />
    <Route path="scenes/edit/:id" component={EditScene} />
    <Route path="scenes/triggers" component={SceneTriggers} />

    <Route path="thermostat" component={Thermostat} />

    <DefaultRoute component={Main}/>
  </Route>
);


exports.start = function() {

  React.render(<RRouter routes={routes}/>, document.getElementById('content'));

}
