var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');
var Picker = require('components/picker/picker');
var _ = require('lodash');
var SceneTriggerGroupItem = require('components/scenes/triggers/sceneTriggerGroupItem');

// A collection of scene triggers that share the same GroupId.
// Ex: all the buttons in a minimote
var SceneTriggerGroup = React.createClass({
    
    handleGroupNameChange: function(e) {
        var triggers = this.props.triggers;
        var groupName = e.target.value;

        _.each(triggers, (trigger) => { 
            trigger.groupId = groupName;
            trigger.triggerInternalName = groupName + trigger.subId;
        });

        this.sendUpdate(groupName, triggers);
    },

    handleItemUpdate: function(trigger, index) {
        this.props.triggers[index] = trigger;
        this.sendUpdate(this.props.groupName, this.props.triggers);
    },

    sendUpdate: function(groupName, triggers) {
        this.props.onUpdate(groupName, triggers, this.props.index);
    },

    render: function () {

        var triggers = this.props.triggers || [];

        // If part of a group, the names are predefined (ex: minimote).  Otherwise they can be edited.
        var isNameEditable = triggers.length === 1;

        var scenes = (this.props.scenes || []).map((scene) => {
            return { value: scene.id, label: scene.name };
        });

        var items = triggers.map((trigger, index) => {
            return (
                <SceneTriggerGroupItem index={index} trigger={trigger} isNameEditable={isNameEditable} scenes={this.props.scenes} onUpdate={this.handleItemUpdate} />
            );
        });

        var groupName = (<input className="form-control" type="text" ref="groupName" value={this.props.name} onChange={this.handleGroupNameChange} required />);

        return (
            <div className="scene-trigger-group">
                <div>{this.props.triggers.length > 1 ? groupName : '' }</div>
                {items}                
            </div>
        );
    }
});

module.exports = SceneTriggerGroup;