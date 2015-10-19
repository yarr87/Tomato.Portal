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
var SceneList = require('components/scenes/sceneList');
var EditScene = require('components/scenes/editScene');

var routes = (
  <Route path="/" component={Layout}>
    <Route path="/" component={Main} />

    <Route path="devices" component={DeviceList} />
    <Route path="devices/add" component={EditDevice} />
    <Route path="devices/edit/:id" component={EditDevice} />

    <Route path="tags" component={TagList} />
    <Route path="tags/add" component={EditTag} />
    <Route path="tags/edit/:id" component={EditTag} />

    <Route path="scenes" component={SceneList} />
    <Route path="scenes/edit/:id" component={EditScene} />

    <DefaultRoute component={Main}/>
  </Route>
);


exports.start = function() {

  React.render(<RRouter routes={routes}/>, document.getElementById('content'));

}
