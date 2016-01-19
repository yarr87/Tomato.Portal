var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var sceneStore = require('stores/sceneStore');
var SceneListItem = require('components/scenes/sceneListItem');
var actions = require('actions/actions');
var classNames = require('classnames');

var SceneDashboard = React.createClass({
    mixins: [Reflux.connect(sceneStore)],

    getInitialState: function() {
        return { scenes: [] };
    },

    componentWillMount: function() {
        actions.loadScenes();
    },

    handleSceneClick: function(scene) {
        actions.triggerScene(scene);
    },

    render: function () {

        var markup = this.state.scenes.map((item, index) => {

            var classObj = {
                'block-grid-item': true,
                'scene': true
            };

            classObj['device-block-' + (index + 1)] = true;

            var deviceClasses = classNames(classObj);

            return (
                <div key={item.id} className={deviceClasses} onClick={this.handleSceneClick.bind(this, item)}>
                    <div>{ item.name }</div>
                </div>
            );
        });

        return (
            <div>
                <div className="scene-edit">
                    <Link to="/scenes/list">Edit Scenes</Link>&nbsp;&nbsp;
                    <Link to="/scenes/triggers">Triggers</Link>
                </div>
                <div className="devices-dashboard block-grid-md-3 block-grid-sm-2 block-grid-xs-2">
                   {markup}
                </div>
            </div>
        );
    }
});

module.exports = SceneDashboard;