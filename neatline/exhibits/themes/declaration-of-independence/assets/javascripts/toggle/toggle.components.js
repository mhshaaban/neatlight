
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
    render: function() {

      // When no signer is selected, show the exhibit-wide spinner.
      if (this.state.signers.length === 0) {
        return (<Declaration />)
      }

      // If 1 signer is selected, show the spinner for that signer.
      else if (this.state.signers.length === 1) {
        return (<Signer />)
      }

      // If multiple signers are resolved, show a list of names.
      else if (this.state.signers.length > 1) {
        return (<Hometown />)
      }

    },

    /**
     * By default, no signers selected.
     */
    getInitialState: function() {
      return {
        signers: [],
        selected: false,
        model: null
      };
    },

    /**
     * Highlight a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The highlighted record.
     */
    highlight: function(signers, model) {
      if (!this.state.selected) {
        this.setState({
          signers: signers,
          model: model
        });
      }
    },

    /**
     * Unhighlight the current signer(s).
     */
    unhighlight: function(signers, model) {
      if (!this.state.selected) {
        this.replaceState(this.getInitialState());
      }
    },

    /**
     * Select a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The selected record.
     */
    select: function(signers, model) {
      this.setState({
        selected: true,
        signers: signers,
        model: model
      });
    },

    /**
     * Unselect the current signer(s).
     */
    unselect: function(signers, model) {
      this.replaceState(this.getInitialState());
    }

  });


  var Declaration = React.createClass({

    /**
     * When no signer is highlighted/selected.
     */
    render: function() {
      return (
        <h1>Declaration</h1>
      );
    }

  });


  var Signer = React.createClass({

    /**
     * When one signer is highlighted/selected.
     */
    render: function() {
      return (
        <h1>Signer</h1>
      );
    }

  });


  var Hometown = React.createClass({

    /**
     * When one hometown points to multiple signers.
     */
    render: function() {
      return (
        <h1>Hometown</h1>
      );
    }

  });


});
