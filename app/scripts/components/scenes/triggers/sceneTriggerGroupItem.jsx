import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
var Picker = require('components/picker/picker');
var _ = require('lodash');

// A collection of scene triggers that share the same GroupId.
// Ex: all the buttons in a minimote
export default class SceneTriggerGroupItem extends Component {

    constructor(props) {
        super(props);

        this.handleSceneChange = this.handleSceneChange.bind(this);
    }
    //
    //handleNameChange: function(e) {
    //    var trigger = this.props.trigger;
    //
    //    trigger.name = e.target.value;
    //
    //    this.sendUpdate(trigger);
    //},
    //
    //handleInternalNameChange: function(e) {
    //    var trigger = this.props.trigger;
    //
    //    trigger.triggerInternalName = e.target.value;
    //
    //    this.sendUpdate(trigger);
    //},
    //
    handleSceneChange(newSceneId) {
        var trigger = this.props.trigger;

        trigger.sceneId = newSceneId;

        this.sendUpdate(trigger);
    }

    sendUpdate(trigger) {
        this.props.onUpdate(trigger, this.props.index);
    }

    render () {

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
}