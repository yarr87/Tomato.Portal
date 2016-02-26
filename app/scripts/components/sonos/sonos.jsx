var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');
var classNames = require('classnames');

// View a specific sonos and interact with it
var Sonos = React.createClass({

    getInitialState: function() {
        return {
        };
    },

    handlePlay: function() {
        actions.playSonos(this.props.sonos);
    },

    handlePause: function() {
        actions.pauseSonos(this.props.sonos);
    },
    
    render: function () {

        var sonos = this.props.sonos;

        return (
            <div className="sonos">
                <button className="btn btn-primary btn-lg sonos-play" onClick={this.handlePlay}>
                    <i className="fa fa-play fa-3x" />
                </button>
                <button className="btn btn-primary btn-lg sonos-pause" onClick={this.handlePause}>
                    <i className="fa fa-pause fa-3x" />
                </button>
            </div>
        );
    }
});

module.exports = Sonos;