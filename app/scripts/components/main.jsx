var React = require('react');
var Reflux = require('reflux');
var deviceStore = require('stores/deviceStore');
var Device = require('components/devices/device');
var TagSearch = require('components/tags/tagSearch');
var actions = require('actions/actions');
var classNames = require('classnames');
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

    getDevices: function() {
        // Filter out non-lights
        return _.filter(this.state.devices, (device) => {
            return device.type === 'LightSwitch' || device.type === 'Dimmer';
        });
    },

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
        var selectedDevices = getSelectedDevices(this.getDevices(), this.state.selectedTags);
        actions.setMultipleDeviceStates(selectedDevices, state);
    },

    render: function () {

        var tags = this.state.selectedTags;

        var selectedDevices = getSelectedDevices(this.getDevices(), tags);

        var markup = selectedDevices.map(function(item, index) {

            var classObj = {
                'block-grid-item': true
            };

            classObj['device-block-' + (index + 1)] = true;

            var deviceClasses = classNames(classObj);

            return (
                <div key={item.id} className={deviceClasses}>
                    <Device item={item} />
                </div>
            );
        });

        /* TODO: tag search might not be worth it.  If brought back, at least make it smaller */

        return (
            <div>
                <div className="row">                    
                    <div className="col-sm-8 col-md-9 clearfix" style={{display: 'none'}}>
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
                <div className="devices-dashboard block-grid-md-3 block-grid-sm-2 block-grid-xs-2">
                   {markup}
                </div>
            </div>
        );
    }
});

module.exports = Main;
