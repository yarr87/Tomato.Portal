var React = require('react');
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Renders 3 pickers for time - hour, minute and am/pm
var TimePicker = React.createClass({

    getInitialState: function() {
        return {
            isOpen: false
        }
    },    

    getHours: function() {
        var hours = [];

        for(var i = 1; i <= 12; i++) {
            hours.push({ value: i, label: i });
        }

        let special = (this.props.specialTimeTypes || []).map(type => ({ value: type, label: type }));

        return special.concat(hours);
    },

    getMinutes: function() {
        var minutes = [];

        for(var i = 0; i < 60; i += 15) {
            minutes.push({value: i, label: i === 0 ? '00' : i });
        }

        return minutes;
    },

    handleHourChange: function(val) {

        var time = this.parseCurrentTime();
        let specialTimeType;

        if (this.props.specialTimeTypes.indexOf(val) >= 0) {
          specialTimeType = val;
        }
        else {
          time.hour = val;    
        }

        this.props.onChange(this.timeToString(time), specialTimeType);

    },

    handleMinuteChange: function(val) {
        var time = this.parseCurrentTime();
        time.minute = val;

        this.props.onChange(this.timeToString(time));
    },

    handleAmPmChange: function(val) {
        var time = this.parseCurrentTime();
        time.amPm = val;

        this.props.onChange(this.timeToString(time));
    },

    parseCurrentTime: function() {

        var currentTime = this.props.time || '00:00:00';

        var timeParts = currentTime.split(':');

        var currentHour = Math.floor(timeParts[0]);
        var currentMinute = Math.floor(timeParts[1]);
        var currentAmPm = 'am';

        if (currentHour === 0) {
            currentHour = 12;
        }
        else if (currentHour >= 12) {
            currentAmPm = 'pm';
            currentHour -= 12;
        }

        return {
            hour: currentHour,
            minute: currentMinute,
            amPm: currentAmPm,
            specialTime: this.props.specialTime
        };
    },

    timeToString: function(time) {
        var hour = time.hour === 12 && time.amPm === 'am' ? 0 : time.hour;
        return (time.amPm === 'pm' ? hour + 12 : hour) + ':' + time.minute + ':00';
    },

    render: function () {

        var time = this.props.time || '00:00:00';

        var currentTime = this.parseCurrentTime();

        var hours = this.getHours();
        var minutes = this.getMinutes();
        var amPm = [
            { value: 'am', label: 'am' },
            { value: 'pm', label: 'pm' }
        ];

        let selectedHour = currentTime.specialTime || currentTime.hour;

        return (
            <span>
                <Picker options={hours} selectedValue={selectedHour} onChange={this.handleHourChange} />
                { currentTime.specialTime ? '' :
                    <Picker options={minutes} selectedValue={currentTime.minute} onChange={this.handleMinuteChange} />
                }
                { currentTime.specialTime ? '' :
                    <Picker options={amPm} selectedValue={currentTime.amPm} onChange={this.handleAmPmChange} />
                }
            </span>
        );
    }
});

module.exports = TimePicker;