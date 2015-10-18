var React = require('react');
var Reflux = require('reflux');
var deviceStore = require('stores/deviceStore');
var Device = require('components/devices/device');
var TagSearch = require('components/tags/tagSearch');
var actions = require('actions/actions');
var _ = require('lodash');

// Filter the given list of devices to those that contain any of the given selected tags
var getSelectedDevices = function(devices, selectedTags) {

    if (selectedTags.length == 0) {
        return devices;
    }

    return _.filter(devices, (device) => {
        return _.any(device.tags, (tag) => {
            return _.any(selectedTags, { id: tag.id });
        });
    });
}

var Main = React.createClass({
    mixins: [Reflux.connect(deviceStore, 'devices')],

    getInitialState: function() {
        return {
            devices: [],
            selectedTags: []
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
    },

    onTagSelect: function(selectedTags) {
        this.setState({selectedTags: selectedTags});
    },

    onAllClick: function(state) {
        var selectedDevices = getSelectedDevices(this.state.devices, this.state.selectedTags);
        actions.setMultipleDeviceStates(selectedDevices, state);
    },

    render: function () {

        var tags = this.state.selectedTags;

        var selectedDevices = getSelectedDevices(this.state.devices, tags);

        var markup = selectedDevices.map(function(item) {
            return (
                <div key={item.id} className="block-grid-item">
                    <Device item={item} />
                </div>
            );
        });

        return (
            <div>
                <div className="row">
                    <div className="col-sm-8 col-md-9">
                        <TagSearch onTagSelect={this.onTagSelect} />
                    </div>
                    <div className="col-sm-4 col-md-3 on-off-buttons clearfix">
                        <button className="btn on-button" onClick={this.onAllClick.bind(this, 'ON')}>
                            <i className="fa fa-circle"></i>
                            <span>On</span>
                        </button>
                        <button className="btn off-button" onClick={this.onAllClick.bind(this, 'OFF')}>
                            <i className="fa fa-circle-o"></i>
                            <span>Off</span>
                        </button>
                    </div>
                </div>
                <div className="block-grid-md-3 block-grid-sm-2 block-grid-xs-1">
                   {markup}
                </div>
            </div>
        );
    }
});

module.exports = Main;
