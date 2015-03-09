var globals = require('globals');
var React = globals.React;
var ReactRouter = globals.Router;
var Reflux = require('reflux');
var tagStore = require('stores/tagStore');
var actions = require('actions/actions');
var _ = require('lodash');

var EditTag = React.createClass({
    mixins: [ReactRouter.State, ReactRouter.Navigation,
             Reflux.connectFilter(tagStore, 'tag', function(tagObj) {

                var tag = _.find(tagObj.tags, { id: parseInt(this.getParams().id) });

                return tag || this.getInitialState().tag;
            }),
             Reflux.listenTo(tagStore, 'onTagsLoaded')
    ],


    getInitialState: function() {
        return {
            tag: {
                id: 0,
                name: '',
                parentId: null
            },
            tags: []
        };
    },

    componentWillMount: function() {
        actions.loadTags();
    },

    // This totally sucks, because once you bind a value react forces it to always be that value and ignores input.  The way to update
    // the textbox is to catch the change event and update the underlying data.
    // Tried just setting defaultValue, but that gets set before the data is loaded and then doesn't update again.
    handleNameChange: function(e) {
        this.state.tag.name = e.target.value;
        this.setState({tag: this.state.tag});
    },

    handleParentTagChange: function(e) {
        this.state.tag.parentId = e.target.value;
        this.setState({tag: this.state.tag});
    },

    handleClick: function(e) {
        e.preventDefault();

        // var tag = {
        //     id: this.state.tag.id,
        //     name: this.refs.name.getDOMNode().value.trim(),

        // };

        actions.saveTag(this.state.tag);
        this.transitionTo('tags');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.transitionTo('tags');
    },

    onTagsLoaded: function(tagObj) {
        this.state.tags = tagObj.tags;
        this.setState({tags: this.state.tags});
    },

    render: function () {

        var tagOptions = this.state.tags.map(function(tag) {

            if (tag.id === this.state.tag.id) return;
            
            return (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
            );
        }.bind(this));

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.tag.name} onChange={this.handleNameChange} required />
                    </label>
                </div>
                 <div className="form-group">
                    <label>Parent</label>
                    <select className="form-control" value={this.state.tag.parentId} onChange={this.handleParentTagChange}>
                        <option />
                        {tagOptions}
                    </select>
                </div>
                <div className="form-group btn-toolbar">
                    <button className="btn btn-primary" onClick={this.handleClick}>Save</button>
                    <button className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
            </div>
            </div>
        );
    }

});

module.exports = EditTag;
