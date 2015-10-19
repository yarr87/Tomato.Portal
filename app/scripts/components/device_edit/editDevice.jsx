var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var RadioGroup = require('vendor/react-radiogroup');
var deviceStore = require('stores/deviceStore');
var tagStore = require('stores/tagStore');
var actions = require('actions/actions');
var _ = require('lodash');
var selectize = require('selectize');
var $ = require('jquery');

var EditDevice = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.History,
             Reflux.connectFilter(deviceStore, "device", function(devices) {

                var device = _.find(devices, { id: this.props.params.id });

                return device || this.getInitialState().device;
            }),
             Reflux.listenTo(tagStore, 'onTagsLoaded')
    ],


    getInitialState: function() {
        return {
            device: {
                name: '',
                internalName: '',
                type: 'LightSwitch',
                id: '',
                nodeId: '',
                tags: []
            },
            tags: []
        };
    },

    componentWillMount: function() {
        actions.loadDevices();
        actions.loadTags();
    },

    componentWillUnmount: function() {
        // TODO: this is broken after react 0.14
        //$("#select-tags")[0].selectize.destroy();
    },

    onTagsLoaded: function(tagObj) {
        this.state.tags = tagObj.tags;
        this.setState({tags: this.state.tags});
        setTimeout(function() {
            $('#select-tags').selectize({
                maxItems: 1000, // no max, really
                //options: this.state.tags,
                //items: this.state.device.tags,
                labelField: 'name',
                valueField: 'id',
                searchField: 'name'
            });
        }.bind(this), 0);
    },

    // This totally sucks, because once you bind a value react forces it to always be that value and ignores input.  The way to update
    // the textbox is to catch the change event and update the underlying data.
    // Tried just setting defaultValue, but that gets set before the data is loaded and then doesn't update again.
    handleNameChange: function(e) {
        this.state.device.name = e.target.value;
        this.setState({device: this.state.device});
    },

    handleInternalNameChange: function(e) {
        this.state.device.internalName = e.target.value;
        this.setState({device: this.state.device});
    },

    handleIdChange: function(e) {
        this.state.device.nodeId = e.target.value;
        this.setState({device: this.state.device});
    },

    handleTypeChange: function(e) {
        this.state.device.type = e.target.value;
        this.setState({device: this.state.device });
    },

    handleClick: function(e) {
        e.preventDefault();

        // Control gives an array of ids, convert to full objects using the full tag list we already have
        var tags = $("#select-tags")[0].selectize.getValue().map(function(tagId) {
            return _.find(this.state.tags, { id: tagId });
        }.bind(this));

        var device = {
            id: this.state.device.id,
            nodeId: this.refs.nodeId.getDOMNode().value.trim(),
            name: this.refs.name.getDOMNode().value.trim(),
            internalName: this.refs.internalName.getDOMNode().value.trim(),
            type: this.refs.type.getCheckedValue(),
            tags: tags
        };

        actions.saveDevice(device);
        this.history.pushState(null, '/devices');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/devices');
    },

    render: function () {

        var tagSelectMarkup = '';

        // Want to render the tag select only after tags and device are loaded, so we can use defaultValue for initializing it.
        // I want this select to be uncontrolled so I don't have to deal with change events, but defaultValue can only be called once.
        if (this.state.tags.length && (this.state.device.id || this.props.params.id === undefined)) {

            // Options for the tag select
            var tagOptions = this.state.tags.map(function(tag) {
                return (
                    <option key={tag.id} value={tag.id}>{tag.name}</option>
                );
            }.bind(this));

            // Default value is the device's tags
            var directTags = _.filter(this.state.device.tags, function(tag) { return tag.isDirect; });
            var selectedTagIds = directTags.map(function(tag) { return tag.id; });

            tagSelectMarkup = (
                <select className="form-control" id="select-tags" multiple={true} defaultValue={selectedTagIds}>
                    {tagOptions}
                </select>
            );      
        }

        // TODO: radiogroup not working!
        // <RadioGroup ref="type">
        //                 <div className="radio">
        //                     <label><input name="lightSwitch" type="radio" value="LightSwitch" checked={this.state.device.type === 'LightSwitch'} onChange={this.handleTypeChange} />Light Switch</label>
        //                 </div>
        //                 <div className="radio">
        //                     <label><input name="dimmer" type="radio" value="Dimmer" checked={this.state.device.type === 'Dimmer'} onChange={this.handleTypeChange} />Dimmer</label>
        //                 </div>
        //             </RadioGroup>

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.device.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                   <div className="form-group">
                    <label>Internal Name
                    <input className="form-control" type="text" ref="internalName"  value={this.state.device.internalName} onChange={this.handleInternalNameChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Node Id
                    <input className="form-control" type="text" ref="nodeId"  value={this.state.device.nodeId} onChange={this.handleIdChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Type
                    
                    </label>
                </div>
                <div className="form-group">
                    <label>Tags</label> 
                    {tagSelectMarkup}
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleClick}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditDevice;
