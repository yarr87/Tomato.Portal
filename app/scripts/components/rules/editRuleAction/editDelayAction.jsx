import React, { Component } from 'react'
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit a delay action for a rule
export default class EditDelayAction extends Component {

    constructor(props) {
        super(props);

        this.handleTimeTypeChange = this.handleTimeTypeChange.bind(this);
        this.handleTimeInputChange = this.handleTimeInputChange.bind(this);

        this.timeTypes = [{ value: 'hours', label: 'hours' }, { value: 'minutes', label: 'minutes' }, { value: 'seconds', label: 'seconds' }];
    }

    handleTimeTypeChange(newTimeType) {
        var ruleAction = this.props.ruleAction;

        var current = this.getTimeObjects(ruleAction.delay);

        ruleAction.delay = this.getTimeSpan(current.time, newTimeType);

        this.props.onUpdate(ruleAction);
    }

    handleTimeInputChange(e) {
        var ruleAction = this.props.ruleAction;

        var input = parseInt(e.target.value, 10);

        if (input > 0) {

            var current = this.getTimeObjects(ruleAction.delay);

            ruleAction.delay = this.getTimeSpan(input, current.timeType);

            this.props.onUpdate(ruleAction);
        }

    }

    // Given something like "1 hour", convert to timespan string like 01:00:00
    getTimeSpan(input, timeType) {
        if (timeType === 'hours') {
            return `${input}:00:00`;
        }
        else if (timeType === 'minutes') {
            return `00:${input}:00`;
        }
        else {// seconds
            return `00:00:${input}`;
        }
    }

    // Given a timespan like "01:00:00", return the number and time type components (ie, 1 hour)
    getTimeObjects(delay) {
        var parts = delay.split(':');

        if (parseInt(parts[0], 10) > 0) {
            return { time: parseInt(parts[0], 10), timeType: 'hours' };
        }
        else if (parseInt(parts[1], 10) > 0) {
            return { time: parseInt(parts[1], 10), timeType: 'minutes' };
        }
        else if (parseInt(parts[2], 10) > 0) {
            return { time: parseInt(parts[2], 10), timeType: 'seconds' };
        }
        else {
            return { time: 0, timeType: 'seconds' };
        }
    }

    render () {

        var currentValues = this.getTimeObjects(this.props.ruleAction.delay);

        // TODO: the numeric input is super annoying on mobile since you can't backspace a single character.  Maybe try auto-selecting
        // on focus, or just changing to text input.

        return (
            <div className="row">
                <div className="col-xs-12 form-inline">
                    Wait <input className="action-number-input" type="tel" value={currentValues.time} onChange={this.handleTimeInputChange} />
                    <Picker options={this.timeTypes} selectedValue={currentValues.timeType} onChange={this.handleTimeTypeChange} />
                    and then
                </div>
            </div>
            );
    }
}