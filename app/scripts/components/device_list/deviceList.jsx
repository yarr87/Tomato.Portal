var React = require('react');
var Link = require('globals').Router.Link;
var deviceStore = require('stores/deviceStore');
var DeviceListItem = require('components/device_list/deviceListItem');
var DeviceListSearch = require('components/device_list/DeviceListSearch');

var DeviceList = React.createClass({
    getInitialState: function() {
        return {devices: []};
    },

    componentWillMount: function() {
        deviceStore.getDevices(function(devices) {
            this.setState({devices: devices })
        }.bind(this));
    },

    render: function () {

        var items = this.state.devices.map(function(item) {
            return (
                <DeviceListItem device={item} />
            );
        });

        return (
            <div>
                <Link to="addDevice">Add Device</Link>
                <DeviceListSearch />
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = DeviceList;