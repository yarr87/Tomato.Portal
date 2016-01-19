var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var sceneStore = require('stores/sceneStore');
var actions = require('actions/actions');
var _ = require('lodash');
var EditRuleActionList = require('components/rules/editRuleAction/editRuleActionList');

var EditScene = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.History,
             Reflux.connectFilter(sceneStore, "scene", function(sceneObj) {

                var scene = _.find(sceneObj.scenes, { id: this.props.params.id });

                return _.clone(scene, true) || this.getInitialState().scene;
            })
    ],


    getInitialState: function() {
        return {
            scene: {
                id: '',
                name: '',
                description: '',
                actions: []
            }
        };
    },

    componentWillMount: function() {
        actions.loadScenes();
    },

    handleNameChange: function(e) {
        this.state.scene.name = e.target.value;
        this.setState({scene: this.state.scene});
    },

    handleDescriptionChange: function(e) {
        this.state.scene.description = e.target.value;
        this.setState({scene: this.state.scene});
    },

    handleSave: function(e) {
        e.preventDefault();

        var scene = {
            id: this.state.scene.id,
            name: this.refs.name.value.trim(),
            description: this.refs.description.value.trim(),
            actions: this.state.scene.actions
        };

        actions.saveScene(scene);
        this.history.pushState(null, '/scenes');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.history.pushState(null, '/scenes');
    },

    handleRuleActionUpdate: function(actions) {
        this.state.scene.actions = actions;
        this.setState({ scene: this.state.scene });
    },

    handleRuleActionAdd: function(newAction) {
        if (!this.state.scene.actions) this.state.scene.actions = [];
        this.state.scene.actions.push(newAction);
        this.setState({ scene: this.state.scene });
    },

    testScene: function(e) {
        e.preventDefault();

        var scene = {
            id: this.state.scene.id,
            name: this.refs.name.value.trim(),
            description: this.refs.description.value.trim(),
            actions: this.state.scene.actions
        };

        actions.testScene(scene);
    },

    render: function () {

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.scene.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                <div className="form-group">
                    <label>Description
                    <textarea className="form-control" type="text" ref="description"  value={this.state.scene.description} onChange={this.handleDescriptionChange} />
                    </label>
                </div>
                <div>
                    <EditRuleActionList ruleActions={this.state.scene.actions} onUpdate={this.handleRuleActionUpdate} onAdd={this.handleRuleActionAdd} />
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                    <button className="btn btn-info" onClick={this.testScene}>Test</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditScene;
