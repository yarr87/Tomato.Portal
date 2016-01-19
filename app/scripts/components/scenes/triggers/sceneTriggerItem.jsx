var React = require('react');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');
var Picker = require('components/picker/picker');
var _ = require('lodash');

var SceneTriggerItem = React.createClass({
    
    handleNameChange: function(e) {
        var trigger = this.props.sceneTrigger;

        trigger.name = e.target.value;

        this.sendUpdate(trigger);
    },

    handleInternalNameChange: function(e) {
        var trigger = this.props.sceneTrigger;

        trigger.triggerInternalName = e.target.value;

        this.sendUpdate(trigger);
    },

    handleSceneChange: function(newSceneId) {
        var trigger = this.props.sceneTrigger;

        trigger.sceneId = newSceneId;

        this.sendUpdate(trigger);
    },

    sendUpdate: function(trigger) {
        this.props.onUpdate(trigger, this.props.index);
    },

    render: function () {

        var trigger = this.props.sceneTrigger;

        var scenes = (this.props.scenes || []).map((scene) => {
            return { value: scene.id, label: scene.name };
        });

        return (
            <div>
                <div>
                    Name: 
                    <input className="form-control" type="text" ref="name" value={trigger.name} onChange={this.handleNameChange} required />
                </div>
                <div>
                    Internal Name: 
                    <input className="form-control" type="text" ref="internalName" value={trigger.triggerInternalName} onChange={this.handleInternalNameChange} required />
                </div>
                <div>
                    Scene:
                    <Picker options={scenes} selectedValue={trigger.sceneId} onChange={this.handleSceneChange} />
                </div>
            </div>
        );
    }
});

module.exports = SceneTriggerItem;