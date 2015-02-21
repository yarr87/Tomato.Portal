var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Layout = React.createClass({

  render: function() {

    return (
      <div>
            <header>
              <ul>
                <li><Link to="layout">Dashboard</Link></li>
                <li><Link to="devices">Manage Devices</Link></li>
                { /*<li><Link to="inbox">Inbox</Link></li>
                    <li><Link to="calendar">Calendar</Link></li> */ }
              </ul>
            </header>

         <div className="container">
	        <RouteHandler/>
	     </div>
      </div>
    );
  }
});

module.exports = Layout;
