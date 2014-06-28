
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
          <TargetButton name="Text" />
          <TargetButton name="Painting" />
          <TargetButton name="Map" />
        </ul>
      );
    },

    /**
     * Highlight a signer.
     *
     * @param {Object} signer
     */
    highlight: function(signer) {
      if (!this.state.selected) {
        this.setState({
          signer: signer
        });
      }
    },

    /**
     * Unhighlight the current signer.
     */
    unhighlight: function() {
      if (!this.state.selected) {
        this.setState({
          signer: null
        });
      }
    },

    /**
     * Select a signer.
     *
     * @param {Object} signer
     */
    select: function(signer) {
      this.setState({
        signer: signer,
        selected: true
      });
    },

    /**
     * Unselect a signer.
     */
    unselect: function() {
      this.setState({
        signer: null,
        selected: false
      });
    },

  });


  var CurrentSigner = React.createClass({

    /**
     * Render the name of the current signer.
     */
    render: function() {

      // If a signer is defined, display the name.
      if (this.props.signer) {
        return (
          <li>{this.props.signer.name}</li>
        );
      }

      // Otherwise, display the exhibit title.
      else {
        return (
          <li>The Declaration of Independence</li>
        );
      }

    }

  });


  var TargetButton = React.createClass({

    /**
     * Render the target button.
     */
    render: function() {
      return (
        <li className="target">{this.props.name}</li>
      );
    }

  });


});
