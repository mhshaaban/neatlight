
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle', function(Toggle) {


  Toggle.Controller = Neatline.Shared.Controller.extend({


    slug: 'TOGGLE',

    events: [
      'highlight',
      'unhighlight',
      'select',
      'unselect'
    ],


    /**
     * Render the top-level component.
     */
    init: function() {
      this.toggle = React.renderComponent(
        Toggle.Widget(), $('#toggle').get(0)
      );
    },


    /**
     * Highlight a signer.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {

      // Get all signers associated with a record.
      var signers = this._getSignersBySlug(args.model.get('slug'));

      // Render the signer, if just one match.
      if (signers.length === 1) {
        this.toggle.highlight(signers[0]);
      }

    },


    /**
     * Unhighlight a signer.
     */
    unhighlight: function() {
      this.toggle.unhighlight();
    },


    /**
     * Select a signer.
     *
     * @param {Object} args: Event arguments.
     */
    select: function(args) {

      // Get all signers associated with a record.
      var signers = this._getSignersBySlug(args.model.get('slug'));

      // Render the signer, if just one match.
      if (signers.length === 1) {
        this.toggle.select(signers[0]);
      }

    },


    /**
     * Unselect a signer.
     *
     * @param {Object} args: Event arguments.
     */
    unselect: function(args) {
      this.toggle.unselect();
    },


    /**
     * Given a text/painting/map slug, get an array of one or more signers
     * that are associated with the record.
     *
     * @param {String} slug: An instance slug.
     */
    _getSignersBySlug: function(slug) {
      return _.filter(Toggle.signers, function(signer) {
        return _.contains(_.values(signer.records), slug);
      });
    }


  });


});
