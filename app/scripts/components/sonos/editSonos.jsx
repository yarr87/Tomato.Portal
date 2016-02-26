var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var sonosStore = require('stores/sonosStore');
var actions = require('actions/actions');
var _ = require('lodash');

var EditSonos = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.History,
             Reflux.connectFilter(sonosStore, "sonos", function(sonosObj) {

                var sonos = _.find(sonosObj.sonoses, { id: this.props.params.id });

                return _.clone(sonos, true) || this.getInitialState().sonos;
            })
    ],


    getInitialState: function() {
        return {
            sonos: {
                id: '',
                name: ''
            }
        };
    },

    componentWillMount: function() {
        actions.loadSonoses();
    },

    handleNameChange: function(e) {
        this.state.sonos.name = e.target.value;
        this.setState({sonos: this.state.sonos});
    },

    handleSave: function(e) {
        e.preventDefault();

        var sonos = {
            id: this.state.sonos.id,
            name: this.refs.name.value.trim()
        };

        actions.saveSonos(sonos);
        this.history.pushState(null, '/sonos');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/sonos');
    },

    render: function () {

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.sonos.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditSonos;
