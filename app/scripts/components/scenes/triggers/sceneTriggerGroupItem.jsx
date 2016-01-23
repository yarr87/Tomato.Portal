var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');
var Picker = require('components/picker/picker');
var _ = require('lodash');

// A collection of scene triggers that share the same GroupId.
// Ex: all the buttons in a minimote
var SceneTriggerGroupItem = React.createClass({
    
    handleNameChange: function(e) {
        var trigger = this.props.trigger;

        trigger.name = e.target.value;

        this.sendUpdate(trigger);
    },

    // TODO: adding items doesn't update locally until page refresh

    handleInternalNameChange: function(e) {
        var trigger = this.props.trigger;

        trigger.triggerInternalName = e.target.value;

        this.sendUpdate(trigger);
    },

    handleSceneChange: function(newSceneId) {
        var trigger = this.props.trigger;

        trigger.sceneId = newSceneId;

        this.sendUpdate(trigger);
    },

    sendUpdate: function(trigger) {
        this.props.onUpdate(trigger, this.props.index);
    },

    render: function () {

        var scenes = (this.props.scenes || []).map((scene) => {
            return { value: scene.id, label: scene.name };
        });

        var trigger = this.props.trigger;

        var nameMarkup;

        if (this.props.isNameEditable) {
            nameMarkup = (
                <span>Name:
                    <input className="form-control" type="text" ref="name" value={trigger.name} onChange={this.handleNameChange} required />
                </span> 
            );
        }
        else {
            nameMarkup = (
                <span>{ trigger.name }</span>
            );
        }
        
        return (
            <div className="row">
                <div className="col-xs-4">
                    {nameMarkup}
                </div>
                { this.props.isNameEditable ? 
                <div className="col-xs-4">
                    Internal Name: 
                    <input className="form-control" type="text" ref="internalName" value={trigger.triggerInternalName} onChange={this.handleInternalNameChange} required />
                </div>
                : '' }
                <div className="col-xs-4">
                    <Picker options={scenes} selectedValue={trigger.sceneId} onChange={this.handleSceneChange} />
                </div>
            </div>
        );
    }
});

module.exports = SceneTriggerGroupItem;