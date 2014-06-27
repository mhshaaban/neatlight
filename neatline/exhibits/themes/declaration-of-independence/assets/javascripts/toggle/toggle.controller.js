
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Toggle', function(Toggle) {


  Toggle.Controller = Neatline.Shared.Controller.extend({


    slug: 'TOGGLE',

    events: [
      'highlight',
      'unhighlight'
    ],


    /**
     * Highlight a signer.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {
      console.log(args);
      // TODO
    },


    /**
     * Unhighlight a signer.
     *
     * @param {Object} args: Event arguments.
     */
    unhighlight: function(args) {
      console.log(args);
      // TODO
    },


  });


});
