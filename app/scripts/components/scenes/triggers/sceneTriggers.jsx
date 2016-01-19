var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var sceneStore = require('stores/sceneStore');
var sceneTriggerStore = require('stores/sceneTriggerStore');
var SceneTriggerItem = require('components/scenes/triggers/sceneTriggerItem');
var actions = require('actions/actions');
var _ = require('lodash');

var SceneTriggers = React.createClass({
    mixins: [Reflux.listenTo(sceneStore, 'onScenesLoaded'),
             Reflux.listenTo(sceneTriggerStore, 'onSceneTriggersLoaded')],

    newTrigger: {
        id: '',
        name: '',
        triggerInternalName: '',
        sceneId: ''
    },

    getInitialState: function() {
        return { 
            scenes: [],
            triggers: [] 
        };
    },

    componentWillMount: function() {
        actions.loadScenes();
        actions.loadSceneTriggers();
    },

    onScenesLoaded: function(scenesObj) {
        this.state.scenes = scenesObj.scenes;
        this.newTrigger.sceneId = this.state.scenes[0].id;
        this.setState({ scenes: this.state.scenes });
    },

    onSceneTriggersLoaded: function(triggersObj) {
        this.state.triggers = triggersObj.triggers;
        this.setState({ triggers: this.state.triggers });
    },

    addNew: function() {
        this.state.triggers.push(_.clone(this.newTrigger, true));
        this.setState({ triggers: this.state.triggers });
    },

    handleTriggerChange: function(trigger, index) {
        this.state.triggers[index] = trigger;
        this.setState({ triggers: this.state.triggers });
    },

    handleTriggerDelete: function(index) {
        this.state.triggers.splice(index, 1);
        this.setState({ triggers: this.state.triggers });
    },

    handleSave: function(e) {
        e.preventDefault();

        actions.saveSceneTriggers(this.state.triggers);
        this.setState({ triggers: this.state.triggers });
        // this.history.pushState(null, '/');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/');
    },

    render: function () {

        var items = (this.state.triggers || []).map((item, index) => {
            return (
                <div>
                    <SceneTriggerItem sceneTrigger={item} scenes={this.state.scenes} index={index} onUpdate={this.handleTriggerChange} />
                    <a className="btn btn-link" onClick={this.handleTriggerDelete.bind(this, index)}>
                        <i className="fa fa-times" /> Delete
                    </a>
                </div>
            );
        });

        return (
            <div>
                {items}
                <div className="form-group btn-toolbar">
                    <button className="btn btn-info" onClick={this.addNew}>Add</button>
                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
});

module.exports = SceneTriggers;