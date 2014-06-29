
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle', function(Toggle) {


  Toggle.Widget = React.createClass({

    /**
     * Render the top-level markup.
     */
    getInitialState: function() {
      return {
        signer: null,
        model: null,
        selected: false
      };
    },

    /**
     * Render the top-level markup.
     */
    render: function() {

      return (
        <ul className="toggle">

          <CurrentSigner signer={this.state.signer} />

          <TargetButton
            model={this.state.model}
            name="Text"
            icon="list-alt" />

          <TargetButton
            model={this.state.model}
            name="Painting"
            icon="user" />

          <TargetButton
            model={this.state.model}
            name="Map"
            icon="globe" />

        </ul>
      );

    },

    /**
     * Highlight a signer.
     *
     * @param {Object} signer
     * @param {Object} model
     */
    highlight: function(signer, model) {
      if (!this.state.selected) {
        this.setState({
          signer: signer,
          model: model
        });
      }
    },

    /**
     * Unhighlight the current signer.
     */
    unhighlight: function() {
      if (!this.state.selected) {
        this.setState({
          signer: null,
          model: null
        });
      }
    },

    /**
     * Select a signer.
     *
     * @param {Object} signer
     * @param {Object} model
     */
    select: function(signer, model) {
      this.setState({
        signer: signer,
        model: model,
        selected: true
      });
    },

    /**
     * Unselect a signer.
     */
    unselect: function() {
      this.setState({
        signer: null,
        model: null,
        selected: false
      });
    }

  });


  var CurrentSigner = React.createClass({

    /**
     * Render the name of the current signer.
     */
    render: function() {

      // If a signer is defined, display the name.
      if (this.props.signer) {
        return (
          <li className="name">
            <span>{this.props.signer.name}</span>
          </li>
        );
      }

      // Otherwise, display the exhibit title.
      else {
        return (
          <li className="name">
            <span>The Declaration of Independence</span>
          </li>
        );
      }

    }

  });


  var TargetButton = React.createClass({

    /**
     * Render the target button.
     */
    render: function() {

      var classes = { glyphicon: true };

      // Construct the icon class.
      var icon = 'glyphicon-'+this.props.icon;
      classes[icon] = true;

      return (
        <li className="target">
          <span className={React.addons.classSet(classes)} />
          <span className="name">{this.props.name}</span>
        </li>
      );

    }

  });


});
