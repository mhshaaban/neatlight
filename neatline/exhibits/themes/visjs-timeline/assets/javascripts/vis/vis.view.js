
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

      // A collection for the events.
      this.records = new Neatline.Shared.Record.Collection();

      // Register the bands.
      var groups = new vis.DataSet();
      _.each(Vis.bands, function(band) {
        groups.add({ id: band.tag, content: band.title });
      });

      // Spin up the timeline.
      this.timeline = new vis.Timeline(this.el);
      this.timeline.setGroups(groups);

    },


    /**
     * Load records for the timeline.
     */
    load: function() {
      this.records.update({ hasDate: true }, function(records) {
        console.log(records);
      });
    }


  });


});
