var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Layout = React.createClass({

  mixins: [Router.State],

  getMenuLinkClass: function(routeName) {
    var routes = this.props.routes;
    var route = routes[routes.length - 1];
    var isActive = route.name === routeName;// this.isActive(routeName);
    return isActive ? 'active' : '';
  },

  render: function() {

    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Tomato</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className={ this.getMenuLinkClass('dashboard') }><Link to="/">Dashboard</Link></li>
                <li className={ this.getMenuLinkClass('thermostat') }><Link to="/thermostat">Temp</Link></li>
                <li className={ this.getMenuLinkClass('scenes') }><Link to="/scenes">Scenes</Link></li>
                <li className={ this.getMenuLinkClass('devices') }><Link to="/devices">Devices</Link></li>
                <li className={ this.getMenuLinkClass('tags') }><Link to="/tags">Tags</Link></li>
                <li className={ this.getMenuLinkClass('users') }><Link to="/users">Users</Link></li>
                <li className={ this.getMenuLinkClass('rules') }><Link to="/rules">Rules</Link></li>
              </ul>
            </div>
          </div>
        </nav>
         <div className="container">
	        {this.props.children}
	     </div>
      </div>
    );
  }
});

module.exports = Layout;
