var React = require('react');
var Reflux = require('reflux');
var Link = require('globals').Router.Link;
var sonosStore = require('stores/sonosStore');
var actions = require('actions/actions');
var _ = require('lodash');
var Sonos = require('components/sonos/sonos');

var SonosList = React.createClass({
    mixins: [Reflux.connect(sonosStore)],

    getInitialState: function() {
        return {
            sonoses: [],
            selectedSonos: null
        };
    },

    componentWillMount: function() {
        actions.loadSonoses();
    },

    handleSonosClick: function(sonos) {

    },

    render: function () {

        var selected = this.state.selectedSonos || (this.state.sonoses && this.state.sonoses[0]);

        var list = (this.state.sonoses || []).map(function(sonos) {
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
});

module.exports = SonosList;