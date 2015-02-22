var React = require('react');
var LightSwitch = require('components/lightSwitch');

var Device = React.createClass({
    render: function () {

        var device;

        if (this.props.item.type === 'LightSwitch') {
            device = (
                <LightSwitch item={this.props.item} />
            );
        }
        else {
            device = (
                <div className="device">Generic - {this.props.item.name}</div>
            );
        }

        return (
          <div>
            {device}
          </div>
        );
    }
});

module.exports = Device;