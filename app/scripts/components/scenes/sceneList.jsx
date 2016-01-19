var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var sceneStore = require('stores/sceneStore');
var SceneListItem = require('components/scenes/sceneListItem');
var actions = require('actions/actions');

var SceneList = React.createClass({
    mixins: [Reflux.connect(sceneStore)],

    getInitialState: function() {
        return { scenes: [] };
    },

    componentWillMount: function() {
        actions.loadScenes();
    },

    render: function () {

        var items = this.state.scenes.map(function(item) {
            return (
                <SceneListItem scene={item} />
            );
        });

        return (
            <div>
                <Link to="/scenes/add">Add Scene</Link>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = SceneList;