var React = require('react');
var Link = require('globals').Router.Link;

var DeviceListItem = React.createClass({
    
    getInitialState: function() {
        return {search: ''};
    },

    render: function () {

        return (
            <tr>
                <td>{this.props.device.name}
                </td>
                <td>{this.props.device.type}</td>
                <td><Link to="editDevice" params={this.props.device}>Edit</Link></td>
            </tr>
        );
    }
});

module.exports = DeviceListItem;