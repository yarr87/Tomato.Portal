import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { playSonos, pauseSonos, playSonosFavorite } from '../../actions/sonos.actions'
var Picker = require('components/picker/picker');

// View a specific sonos and interact with it
class Sonos extends Component {

    constructor(props) {
        super(props);

        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleFavoriteChange = this.handleFavoriteChange.bind(this);
        this.handleFavoritePlay = this.handleFavoritePlay.bind(this);

        this.state = {
            selectedFavorite: ''
        };
    }

    handlePlay() {
        this.props.playSonos(this.props.sonos);
    }

    handlePause() {
        this.props.pauseSonos(this.props.sonos);
    }

    handleFavoritePlay(favorite) {
        this.props.playSonosFavorite(this.props.sonos, favorite);
    }

    handleFavoriteChange(newFavorite) {
        this.setState({ selectedFavorite: newFavorite });
    }
    
    render() {

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
}

function mapStateToProps(state, ownProps) {
    return {
        sonos: ownProps.sonos
    };
}

export default connect(mapStateToProps, 
{
  playSonos, 
  pauseSonos, 
  playSonosFavorite
})(Sonos)
