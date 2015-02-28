var Globals = require('globals');
var React = Globals.React;
var Router = Globals.Router;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('components/layout');
var Home = require('components/home');
var Main = require('components/main');
var DeviceList = require('components/device_list/deviceList');
var EditDevice = require('components/device_edit/editDevice');
var TagList = require('components/tags/tag_list/tagList');
var EditTag = require('components/tags/tag_edit/editTag');

var routes = (
  <Route name="layout" path="/" handler={Layout}>
    <Route name="dashboard" path="/" handler={Main} />

    <Route name="devices" handler={DeviceList} />
    <Route name="addDevice" path="devices/add" handler={EditDevice} />
    <Route name="editDevice" path="devices/edit/:id" handler={EditDevice} />

    <Route name="tags" handler={TagList} />
    <Route name="addTag" path="tags/add" handler={EditTag} />
    <Route name="editTag" path="tags/edit/:id" handler={EditTag} />

    <DefaultRoute handler={Main}/>
  </Route>
);


exports.start = function() {
  
  Router.run(routes, function (Handler) {
		React.render(<Handler />, document.getElementById('content'));
	});
}
