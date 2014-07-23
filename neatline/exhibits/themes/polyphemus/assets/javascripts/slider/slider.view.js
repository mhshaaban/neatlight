
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Slider', function(Slider) {


  Slider.View = Backbone.View.extend({


    /**
     * Initialize the slider.
     */
    initialize: function() {
      this.$el.ranger();
    }


  });


});
