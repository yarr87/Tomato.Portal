var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var _ = require('lodash');

var Layout = React.createClass({

  mixins: [Router.State],

  getMenuLinkClass: function(routeName) {

    var x = Router;
    var routes = this.props.routes;
    var route = routes[routes.length - 1];
    var isActive = route.path === routeName || (!route.path && !routeName);// this.isActive(routeName);
    return isActive ? 'active' : '';
  },

  navItems: [
    {
      name: 'Lights',
      icon: 'fa-lightbulb-o',
      path: '',
      isMain: true
    },
    {
      name: 'Temp',
      icon: 'fa-fire',
      path: '/thermostats',
      isMain: true
    },
    {
      name: 'Music',
      icon: 'fa-music',
      path: '/sonos',
      isMain: true
    },
    {
      name: 'Rules',
      icon: 'fa-list',
      path: '/rules',
      isMain: true
    },
    {
      name: 'Scenes',
      path: '/scenes'
    },
    {
      name: 'Devices',
      path: '/devices'
    },
    {
      name: 'Tags',
      path: '/tags'
    },
    {
      name: 'Users',
      path: '/users'
    }
  ],

  getMenuItem: function(nav) {
    var cn = 'nav-icon fa fa-3x ' + nav.icon;

      var path = nav.path ? nav.path.substring(1) : '';

      var liClass = this.getMenuLinkClass(path);

      if (!nav.isMain) {
        liClass += ' secondary-nav';
      }

      return (<li className={liClass}>
                <Link to={nav.path}>
                  <i className={cn}></i>
                  <span className='nav-text'>{nav.name}</span>
                </Link>
              </li>
      );
  },

  render: function() {

    var mainNav = this.navItems.map(this.getMenuItem);
    var secondaryNav = _.chain(this.navItems)
                        .filter((nav) => { return !nav.isMain; })
                        .map(this.getMenuItem)
                        .value();

    // <li className={ this.getMenuLinkClass('') }><Link to="/"><i className="fa fa-2x fa-lightbulb-o"></i></Link></li>
    //             <li className={ this.getMenuLinkClass('thermostats') }><Link to="/thermostats">Temp</Link></li>
    //             <li className={ this.getMenuLinkClass('sonos') }><Link to="/sonos">Music</Link></li>
    //             <li className={ this.getMenuLinkClass('scenes') }><Link to="/scenes">Scenes</Link></li>
    //             <li className={ this.getMenuLinkClass('devices') }><Link to="/devices">Devices</Link></li>
    //             <li className={ this.getMenuLinkClass('tags') }><Link to="/tags">Tags</Link></li>
    //             <li className={ this.getMenuLinkClass('users') }><Link to="/users">Users</Link></li>
    //             <li className={ this.getMenuLinkClass('rules') }><Link to="/rules">Rules</Link></li>

    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
               <ul className="nav nav-tabs">
                {mainNav}
              </ul>
            </div>
             <div className="collapse navbar-collapse" id="main-nav">
              <ul className="nav navbar-nav">
                {secondaryNav}
              </ul>
            </div>
          </div>
        </nav>
         <div className="container main-content">
	        {this.props.children}
	     </div>
      </div>
    );
  }
});

module.exports = Layout;
