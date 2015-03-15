var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var sceneStore = require('stores/sceneStore');
var actions = require('actions/actions');
var _ = require('lodash');

var SceneList = React.createClass({
    mixins: [Reflux.connect(sceneStore, 'scenes')],

    getInitialState: function() {
        return {
            scenes: []
        };
    },

    componentWillMount: function() {
        actions.loadScenes();
    },

    // onTagSelect: function(selectedTags) {
    //     this.setState({selectedTags: selectedTags});
    // },

    render: function () {

        // var markup = this.state.scenes.map(function(item) {
        //     return 'blah';
        // });

        var markup = this.state.scenes.map(function(scene) {
            return (
                <div className="block-grid-item">
                    <div className="scene">
                        <div className="scene-name"><h3>{scene.name}</h3></div>
                        <div className="scene-description"><h5>{scene.description}</h5></div>
                        <div className="scene-edit">
                            <Link to="editScene" params={scene}>
                                <i className="fa fa-cog fa-2x"></i>
                             </Link>
                        </div>
                    </div>
                </div>
            );  
        });

        return (
            <div>
                <div className="block-grid-md-3 block-grid-sm-2 block-grid-xs-1">
                    {markup}
                </div>
            </div>
        );
    }
});

module.exports = SceneList;
