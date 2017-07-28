import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import SceneTriggerGroupItem from './sceneTriggerGroupItem'

// A collection of scene triggers that share the same GroupId.
// Ex: all the buttons in a minimote
export default class SceneTriggerGroup extends Component {

    constructor(props) {
        super(props);

        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleItemUpdate = this.handleItemUpdate.bind(this);
    }
    
    handleGroupNameChange(e) {
        var triggers = this.props.triggers;
        var groupName = e.target.value;

        _.each(triggers, (trigger) => { 
            trigger.groupId = groupName;
            trigger.triggerInternalName = groupName + trigger.subId;
        });

        this.sendUpdate(groupName, triggers);
    }

    handleItemUpdate(trigger, index) {
        this.props.triggers[index] = trigger;
        this.sendUpdate(this.props.groupName, this.props.triggers);
    }

    sendUpdate(groupName, triggers) {
        this.props.onUpdate(groupName, triggers, this.props.index);
    }

    render () {

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
                <div>{triggers.length > 1 ? groupName : '' }</div>
                {items}                
            </div>
        );
    }
}