
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Vis', function(Vis) {


  Vis.View = Backbone.View.extend({


    /**
     * Initialize the timeline.
     */
    initialize: function() {

      // Register the bands.
      var groups = new vis.DataSet();
      _.each(Vis.bands, function(band) {
        groups.add({ id: band.tag, content: band.title });
      });

      // TODO|dev
      var items = new vis.DataSet();

      this.timeline = new vis.Timeline(this.el, items);
      this.timeline.setGroups(groups);

    }


  });


});
