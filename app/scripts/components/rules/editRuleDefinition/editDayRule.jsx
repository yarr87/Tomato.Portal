import React, { Component } from 'react'
var _ = require('lodash');

// Edit a single day  rule definition
export default class EditDayRule extends Component {

    constructor(props) {
        super(props);

        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange(e) {
        var checked = e.target.checked;
        var selectedDay = e.target.value;

        var dayRule = this.props.dayRule;

        if (!checked) {
            _.remove(dayRule.days, (day) => { return day === selectedDay });
        }
        else {
            dayRule.days.push(selectedDay);
        }

        this.props.onUpdate(dayRule);
    }

    render() {

        var allDays = [
            { label: 'Sat', value: 'Saturday' },
            { label: 'Sun', value: 'Sunday' },
            { label: 'Mon', value: 'Monday' },
            { label: 'Tue', value: 'Tuesday' },
            { label: 'Wed', value: 'Wednesday' },
            { label: 'Thu', value: 'Thursday' },
            { label: 'Fri', value: 'Friday' }
        ];

        var selectedDays = this.props.dayRule.days;

        var checksMarkup = _.map(allDays, (day) => {
            var isSelected = selectedDays.indexOf(day.value) >= 0;
            return (<label className="rule-day">
                        <input type="checkbox" checked={isSelected} value={day.value} onChange={this.handleCheckChange} />
                        <span>{day.label}</span>
                    </label>
                    );
        });

        return (
            <div className="row">
                <div className="col-xs-12">
                    {checksMarkup}
                </div>
            </div>
            );
    }
}