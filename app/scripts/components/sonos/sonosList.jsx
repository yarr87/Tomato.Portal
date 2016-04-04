var Link = require('globals').Router.Link;
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import classNames from 'classnames'
import { fetchSonoses } from '../../actions/sonos.actions'
import Sonos from './sonos'

class SonosList extends Component {

    constructor(props) {
        super(props);

        this.handleSonosClick = this.handleSonosClick.bind(this);

        this.state = {
            selectedSonos: null
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchSonoses());
    }

    handleSonosClick(sonos) {
        this.setState( { selectedSonos: sonos });
    }

    render() {

        var selected = this.state.selectedSonos || (this.props.sonoses && this.props.sonoses[0]);

        var list = (this.props.sonoses || []).map(function(sonos) {
            var cn = "block-grid-item sonos";
            if (selected === sonos) {
                cn += " active";
            }
            else {
                cn += "";
            }

            return (
                <div key={sonos.id} className={cn} onClick={this.handleSonosClick.bind(this, sonos)}>
                    <a>{sonos.name}</a>
                </div>
            );
        }.bind(this));

        return (
            <div>
                <Link to="/sonos/add">Add Sonos</Link>
                <div className="sonos-list block-grid-lg-10 block-grid-sm-5 block-grid-md-7 block-grid-xs-3">
                    {list}
                </div>
                <Sonos sonos={selected} />
            </div>
        );
    }
}

function mapStateToProps(state) {
  const sonoses = state.sonoses;
  return {
    isFetching: sonoses.isFetching,
    sonoses: sonoses.items
  }
}

export default connect(mapStateToProps)(SonosList)