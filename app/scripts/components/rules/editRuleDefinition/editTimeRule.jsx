var React = require('react');
var _ = require('lodash');
var Picker = require('components/picker/picker');
var TimePicker = require('components/picker/timePicker');

// Edit a single time rule definition
var EditTimeRule = React.createClass({

    availableTypes: [
        { type: "PointInTime", name: 'At', showStart: true, showEnd: false },
        { type: "Before", name: 'Before', showStart: false, showEnd: true },
        { type: "After", name: 'After', showStart: true, showEnd: false },
        { type: "Between", name: 'Between', showStart: true, showEnd: true }
    ],

    handleTypeChange: function(newType) {
        var timeRule = this.props.timeRule;

        timeRule.timeRuleType = newType;

        this.props.onUpdate(timeRule);
    },

    handleStartChange: function(start) {
        var timeRule = this.props.timeRule;

        timeRule.start = start;

        this.props.onUpdate(timeRule);
    },

    handleEndChange: function(end) {
        var timeRule = this.props.timeRule;

        timeRule.end = end;

        this.props.onUpdate(timeRule);
    },

    render: function () {

        var timeRule = this.props.timeRule;
        var type = _.find(this.availableTypes, { type: timeRule.timeRuleType });

        var typeOptions = this.availableTypes.map((availableType) => {
            return { value: availableType.type, label: availableType.name };
        });

        return (
            <div className="row">
                <div className="col-xs-12">
                    <Picker options={typeOptions} selectedValue={timeRule.timeRuleType} onChange={this.handleTypeChange} />
                    {type.showStart ? <TimePicker time={timeRule.start} onChange={this.handleStartChange} /> : ''}
                    {type.showStart && type.showEnd ? ' and ' : '' }
                    {type.showEnd ? <TimePicker time={timeRule.end} onChange={this.handleEndChange} /> : ''}
                </div>
            </div>
        );
    }
});

module.exports = EditTimeRule;