var React = require('react');
var Reflux = require('reflux');
var actions = require('actions/actions');
var deviceStore = require('stores/deviceStore');
var EditLightRule = require('components/rules/editRuleDefinition/editLightRule');

// List of editable rule definitions for edit rule page
var EditRuleDefinitionList = React.createClass({
    
    mixins: [Reflux.listenTo(deviceStore, 'onDevicesLoaded')],

    getInitialState: function() {
        return {
            ruleDefinitions: []
        }
    },

    componentWillMount: function() {
        actions.loadDevices();
    },

    onDevicesLoaded: function(devices) {
        this.state.devices = devices;
        this.setState({ devices: this.state.devices });
    },

    addNew: function() {
        this.props.onAdd();
    },

    render: function () {

        var markup = this.props.ruleDefinitions.map((ruleDef) => {

            var def;

            if (ruleDef.ruleType === 'Light') {
                def = (<EditLightRule devices={this.state.devices} lightRule={ruleDef} />);
            }
            else {
                def = (<div>{ruleDef.ruleType}</div>);
            }

            return (
                <div className="rule-definition">
                    <div className="rule-definition-delete">
                        <a className="btn btn-link">X</a>
                    </div>
                    <div className="rule-definition-edit">
                        {def}
                    </div>
                </div>
            );
        });

        return (
            <div>
                <h3>Rule Definitions</h3>
                {markup}
                <a className="btn btn-link" onClick={this.addNew}>Add</a>
            </div>
            );
    }
});

module.exports = EditRuleDefinitionList;