var React = require('react');
var _ = require('lodash');
var Select = require('react-select');

// A control that renders text, that when clicked on opens a dropdown of some sort.
// props.selections = an array of objects with name and value properties.
var Picker = React.createClass({

    getInitialState: function() {
        return {
            isOpen: false
        }
    },    

    handleChange: function(val) {

        if (val && this.props.onChange) {
            this.props.onChange(val.value);
        }

    },

    render: function () {

        // Specify isAction property to change the color from green to blue (minor hack)
        var spanClass = this.props.isAction ? 'action' : '';

        return (
            <span className={spanClass}>
                <Select name="test" value={this.props.selectedValue} options={this.props.options} onChange={this.handleChange} searchable={false} />
            </span>);
    }
});

module.exports = Picker;