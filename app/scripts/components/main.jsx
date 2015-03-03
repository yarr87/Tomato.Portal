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
            selectedTagIds: []
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
    },

    onTagSelect: function(selectedTagIds) {
        this.setState({selectedTagIds: selectedTagIds});
    },

    render: function () {

        var tagIds = this.state.selectedTagIds;

        var markup = this.state.devices.map(function(item) {

            if (tagIds.length == 0 || _.any(item.tags, function(tag) {
                return _.indexOf(tagIds, tag.id) >= 0;
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
                <div className="block-grid-md-3 block-grid-sm-2 block-grid-xs-2">
                   {markup}
                </div>
            </div>
        );
    }
});

module.exports = Main;
