var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Picker = require('components/picker/picker');

// Edit a single sonos action for a rule
var EditSonosAction = React.createClass({

    availablePlayTypes: [
        { value: 'Favorite', label: 'favorite' },
        { value: 'Playlist', label: 'playlist' }
    ],

    handleSonosChange: function(newSonosName) {
        var ruleAction = this.props.ruleAction;

        ruleAction.name = newSonosName;
        this.props.onUpdate(ruleAction);
    },

    handleCommandChange: function(newCommandType) {
        var ruleAction = this.props.ruleAction;

        ruleAction.commandType = newCommandType;

        this.props.onUpdate(ruleAction);
    },

    handleParameterChange: function(newParameter) {
        var ruleAction = this.props.ruleAction;

        ruleAction.parameter = newParameter;

        this.props.onUpdate(ruleAction);
    },


    render: function () {

        var selectedSonosName = this.props.ruleAction.name;
        var selectedCommand = this.props.ruleAction.commandType;
        var selectedParameter = this.props.ruleAction.parameter;

        var selectedSonos = _.find(this.props.sonoses || [], { name: selectedSonosName }) || {};

        var sonosOptions = (this.props.sonoses || []).map((sonos) => {
            return { value: sonos.name, label: sonos.name };
        });

        var playOptions = this.availablePlayTypes;

        var parameterList;

        if (selectedCommand === 'Favorite') {
            parameterList = selectedSonos.favorites;
        }
        else if (selectedCommand === 'Playlist') {
            parameterList = selectedSonos.playlists;
        }

        var parameterOptions = (parameterList || []).map((param) => {
            return { value: param, label: param };
        });

        return (
            <div className="row">
                <div className="col-xs-12 form-inline">
                    On 
                    <Picker options={sonosOptions} selectedValue={selectedSonosName} onChange={this.handleSonosChange} />
                    play
                    <Picker options={playOptions} selectedValue={selectedCommand} onChange={this.handleCommandChange} />
                    named
                    <Picker options={parameterOptions} selectedValue={selectedParameter} onChange={this.handleParameterChange} />
                </div>
            </div>
        );  
    }
});

module.exports = EditSonosAction;