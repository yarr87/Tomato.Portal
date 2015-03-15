var React = require('react');
var Reflux = require('reflux');
var deviceStore = require('stores/deviceStore');
var Device = require('components/devices/device');
var TagSearch = require('components/tags/tagSearch');
var actions = require('actions/actions');
var _ = require('lodash');

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

    render: function () {

        var tags = this.state.selectedTags;

        var markup = this.state.devices.map(function(item) {

            if (tags.length == 0 || _.any(item.tags, function(tag) {
                return _.any(tags, { id: tag.id });
            })) {
                
                return (
                    <div className="block-grid-item">
                        <Device item={item} />
                    </div>
                );
            }
            else {
                return '';
            }
        });

        return (
            <div>
                <TagSearch onTagSelect={this.onTagSelect} />
                <div className="block-grid-md-3 block-grid-sm-2 block-grid-xs-1">
                   {markup}
                </div>
            </div>
        );
    }
});

module.exports = Main;
