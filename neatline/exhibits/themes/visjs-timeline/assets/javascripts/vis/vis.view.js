
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
      var params = { hasDate: true };
      this.records.update(params, _.bind(this.ingest, this));
    },


    /**
     * Clear the timeline and render a new collection.
     *
     * @param {Object} records
     */
    ingest: function(records) {

      var events = new vis.DataSet();

      records.each(function(record) {

        // Pass if no start date.
        var start = record.get('start_date');
        if (!start) return;

        var event = {
          id:       record.id,
          content:  record.get('title'),
          start:    start
        };

        // If defined, add end date.
        var end = record.get('end_date');
        if (end) event['end'] = end;

        // Set the group.
        _.each(Vis.bands, function(band) {
          if (record.hasTag(band.tag)) {
            event['group'] = band.tag;
          }
        });

        events.add(event);

      });

      // Render the collection.
      this.timeline.setItems(events);

    }


  });


});
