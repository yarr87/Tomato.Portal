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
            })
    ],


    getInitialState: function() {
        return {
            tag: {
                id: 0,
                name: ''
            }
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

    handleClick: function(e) {
        e.preventDefault();

        var tag = {
            id: this.state.tag.id,
            name: this.refs.name.getDOMNode().value.trim()
        };

        actions.saveTag(tag);
        this.transitionTo('tags');
    },

    handleCancel: function(e) {
        e.preventDefault();
        this.transitionTo('tags');
    },

    render: function () {

        return (
            <div className="row">
            <div className="col-md-6">
            <form>
                <div className="form-group">
                    <label>Name
                    <input className="form-control" type="text" ref="name" value={this.state.tag.name} onChange={this.handleNameChange} required />
                    </label>
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