var React = require('react');
var deviceStore = require('repositories/deviceRepository');
var Device = require('components/devices/device');

var Main = React.createClass({
    getInitialState: function() {
        return {devices: []};
    },

    componentWillMount: function() {
        deviceStore.getDevices().then(function(devices) {
            this.setState({devices: devices });
        }.bind(this));
    },

    render: function () {

        var markup = this.state.devices.map(function(item) {
            return (
                <div className="block-grid-item">
                    <Device item={item} />
                </div>
            );
        });

        return (
            <div className="block-grid-md-3 block-grid-sm-2">
               {markup}
            </div>
        );
    }
});

module.exports = Main;
