var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var Link = require('globals').Router.Link;
var actions = require('actions/actions');
var classNames = require('classnames');
var Picker = require('components/picker/picker');

// View a specific sonos and interact with it
var Sonos = React.createClass({

    getInitialState: function() {
        return {
            selectedFavorite: ''
        };
    },

    handlePlay: function() {
        actions.playSonos(this.props.sonos);
    },

    handlePause: function() {
        actions.pauseSonos(this.props.sonos);
    },

    handleFavoritePlay: function(favorite) {
        actions.playSonosFavorite(this.props.sonos, favorite);
    },

    handleFavoriteChange: function(newFavorite) {
        this.setState({ selectedFavorite: newFavorite });
    },
    
    render: function () {

        var sonos = this.props.sonos || {};

        var favorites = (sonos.favorites || []).map((favorite) => {
            return { value: favorite, label: favorite }
        });

        var selectedFavorite = this.state.selectedFavorite || (sonos.favorites && sonos.favorites.length ? sonos.favorites[0] : '');

        return (
            <div className="sonos">
                <button className="btn btn-primary btn-lg sonos-play" onClick={this.handlePlay}>
                    <i className="fa fa-play fa-3x" />
                </button>
                <button className="btn btn-primary btn-lg sonos-pause" onClick={this.handlePause}>
                    <i className="fa fa-pause fa-3x" />
                </button>
                <div className="sonos-favorites">
                    <Picker options={favorites} selectedValue={selectedFavorite} onChange={this.handleFavoriteChange} />
                    <button className="btn btn-info sonos-play-favorite" onClick={this.handleFavoritePlay.bind(this, selectedFavorite)}>
                        <i className="fa fa-play fa-2x" />
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = Sonos;