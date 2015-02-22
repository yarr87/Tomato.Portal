var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var deviceStore = require('stores/deviceStore');
var DeviceListItem = require('components/device_list/deviceListItem');
var DeviceListSearch = require('components/device_list/DeviceListSearch');
var actions = require('actions/actions');

var DeviceList = React.createClass({
    mixins: [Reflux.connect(deviceStore, 'devices')],

    getInitialState: function() {
        return {devices: []};
    },

    componentWillMount: function() {
        actions.loadDevices();
        // deviceStore.getDevices().then(function(devices) {
        //     this.setState({devices: devices })
        // }.bind(this));
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