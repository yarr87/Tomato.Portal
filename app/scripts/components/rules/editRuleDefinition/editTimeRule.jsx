import React, { Component } from 'react'
var _ = require('lodash');
var Picker = require('components/picker/picker');
var TimePicker = require('components/picker/timePicker');

// Edit a single time rule definition
export default class EditTimeRule extends Component {

    constructor(props) {
        super(props);

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);

        this.availableTypes = [
            { type: "PointInTime", name: 'At', showStart: true, showEnd: false },
            { type: "Before", name: 'Before', showStart: false, showEnd: true },
            { type: "After", name: 'After', showStart: true, showEnd: false },
            { type: "Between", name: 'Between', showStart: true, showEnd: true }
        ];

        this.specialTimeTypes = ['Sunrise', 'Sunset'];
    }

    handleTypeChange(newType) {
        var timeRule = this.props.timeRule;

        timeRule.timeRuleType = newType;

        this.props.onUpdate(timeRule);
    }

    handleStartChange(startTime, specialTimeType) {
        var timeRule = this.props.timeRule;

        timeRule.start = startTime;
        timeRule.specialStart = specialTimeType;

        this.props.onUpdate(timeRule);
    }

    handleEndChange(end, specialTimeType) {
        var timeRule = this.props.timeRule;

        timeRule.end = end;
        timeRule.specialEnd = specialTimeType;

        this.props.onUpdate(timeRule);
    }

    render () {

        var timeRule = this.props.timeRule;
        var type = _.find(this.availableTypes, { type: timeRule.timeRuleType });

        var typeOptions = this.availableTypes.map((availableType) => {
            return { value: availableType.type, label: availableType.name };
        });

        return (
            <div className="row">
                <div className="col-xs-12">
                    <Picker options={typeOptions} selectedValue={timeRule.timeRuleType} onChange={this.handleTypeChange} />
                    {type.showStart ? <TimePicker time={timeRule.start} specialTime={timeRule.specialStart} specialTimeTypes={this.specialTimeTypes} onChange={this.handleStartChange} /> : ''}
                    {type.showStart && type.showEnd ? ' and ' : '' }
                    {type.showEnd ? <TimePicker time={timeRule.end} specialTime={timeRule.specialEnd} specialTimeTypes={this.specialTimeTypes} onChange={this.handleEndChange} /> : ''}
                </div>
            </div>
        );
    }
}