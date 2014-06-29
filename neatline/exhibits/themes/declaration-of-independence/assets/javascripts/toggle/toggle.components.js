
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
      return (
        <h1>Toggle</h1>
      );
    },

    /**
     * Highlight a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The highlighted record.
     */
    highlight: function(signers, model) {
      console.log(signers, model);
    },

    /**
     * Unhighlight the current signer(s).
     */
    unhighlight: function(signers, model) {
      console.log(signers, model);
    },

    /**
     * Select a signer (or signers).
     *
     * @param {Object} signers: The signers associated with the record.
     * @param {model} model: The selected record.
     */
    select: function(signers, model) {
      console.log(signers, model);
    },

    /**
     * Unselect the current signer(s).
     */
    unselect: function(signers, model) {
      console.log(signers, model);
    }

  });


});
