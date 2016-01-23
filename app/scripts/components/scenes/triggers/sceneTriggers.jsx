var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('globals').Router;
var Link = require('globals').Router.Link;
var sceneStore = require('stores/sceneStore');
var sceneTriggerStore = require('stores/sceneTriggerStore');
var SceneTriggerGroup = require('components/scenes/triggers/sceneTriggerGroup');
var actions = require('actions/actions');
var _ = require('lodash');

var SceneTriggers = React.createClass({
    mixins: [ReactRouter.History,
             Reflux.listenTo(sceneStore, 'onScenesLoaded'),
             Reflux.listenTo(sceneTriggerStore, 'onSceneTriggersLoaded')],

    newTrigger: {
        id: '',
        name: '',
        groupId: '',
        subId: '',
        triggerInternalName: '',
        sceneId: ''
    },

    minimoteTemplate: {
        triggers: [
            {
                name: 'Button 1',
                subId: '_1'
            },
            {
                name: 'Button 1 Long',
                subId: '_1_long'
            },
            {
                name: 'Button 2',
                subId: '_2'
            }
        ]
    },  

    newGroupId: 1,

    getInitialState: function() {
        return { 
            scenes: [],
            triggers: [],
            groupedTriggers: []
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

        // Group by GroupId, or just Id for non-grouped triggers
        var grouped = _.groupBy(triggersObj.triggers, (trigger) => {
            return trigger.groupId || trigger.id;
        });

        var array = [];

        _.forOwn(grouped, (group, name) => {
            array.push({
                name: name,
                triggers: group
            });
        });

        this.setState({ 
            triggers: this.state.triggers,
            groupedTriggers: array
        });
    },

    addNew: function() {

        var newGroup = [];

        this.minimoteTemplate.triggers.forEach((trigger) => {
            var t = _.clone(this.newTrigger, true);
            newGroup.push( _.extend(t, trigger));
        });

        this.state.groupedTriggers.push({ name: 'New Trigger Group ' + this.newGroupId++, triggers: newGroup });

        this.setState({ groupedTriggers: this.state.groupedTriggers });
    },

    handleTriggerChange: function(groupName, triggers, index) {

        this.state.groupedTriggers[index].name = groupName;
        this.state.groupedTriggers[index].triggers = triggers;

        this.setState({ 
            groupedTriggers: this.state.groupedTriggers
        });
    },

    handleTriggerDelete: function(index) {
        this.state.groupedTriggers.splice(index, 1);
        this.setState({ groupedTriggers: this.state.groupedTriggers });
    },

    handleSave: function(e) {
        e.preventDefault();

        var allTriggers = _.reduce(this.state.groupedTriggers, (result, value) => {
            return result.concat(value.triggers);
        }, []);

        actions.saveSceneTriggers(allTriggers);
        this.history.pushState(null, '/scenes');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/scenes');
    },

    render: function () {

        var items = _.map(this.state.groupedTriggers || [], (group, index) => {
            return (
                <div key={index}>
                    <SceneTriggerGroup name={group.name} triggers={group.triggers} scenes={this.state.scenes} index={index} onUpdate={this.handleTriggerChange} />
                    <a className="btn btn-link" onClick={this.handleTriggerDelete.bind(this, index)}>
                        <i className="fa fa-times" /> Delete
                    </a>
                    <hr />
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