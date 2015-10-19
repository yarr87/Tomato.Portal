var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');

var DeviceListItem = React.createClass({
    
    getInitialState: function() {
        return {search: ''};
    },

    handleDelete: function(e) {
        e.preventDefault();

        if (confirm('really delete?')) {
            actions.deleteDevice(this.props.device);
        }
    },

    render: function () {

        return (
            <tr>
                <td>{this.props.device.name}
                </td>
                <td>{this.props.device.internalName}</td>
                <td>{this.props.device.type}</td>
                <td><Link to={`/devices/edit/${this.props.device.id}`}>Edit</Link>&nbsp;&nbsp;&nbsp;
                    <a href="#" onClick={this.handleDelete}>Delete</a></td>
            </tr>
        );
    }
});

module.exports = DeviceListItem;