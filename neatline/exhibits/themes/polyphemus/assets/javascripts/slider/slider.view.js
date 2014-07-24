
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

      // Spin up the slider.
      this.$el.noUiSlider({
        range: { min: 1, max: 94 },
        start: 1,
        connect: 'lower',
        step: 1
      });

      // Select words on slide.
      this.$el.on('slide', _.bind(function(event, val) {
        this.publish(parseInt(val));
      }, this));

    },


    /**
     * Zoom to a word.
     *
     * @param Number id
     */
    publish: function(id) {

      // Load the word record from the map.
      var record = Neatline.request('MAP:getRecords').findWhere({
        slug: 'w'+id
      });

      // Select the record.
      Neatline.vent.trigger('select', {
        model: record, source: 'SLIDER'
      });

    }


  });


});
