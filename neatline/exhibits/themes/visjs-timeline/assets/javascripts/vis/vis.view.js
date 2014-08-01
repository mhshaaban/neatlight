
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Vis', function(Vis) {


  Vis.View = Backbone.View.extend({


    /**
     * Initialize the collection and timeline.
     */
    initialize: function(options) {

      this.slug = options.slug;

      // Spin up an empty records collection.
      this.records = new Neatline.Shared.Record.Collection();

      // Create timeline.
      this._initTimeline();
      this._initHighlight();
      this._initSelect();

    },


    /**
     * Initialize the timeline and groups.
     */
    _initTimeline: function() {

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
     * Listen for event highlights.
     */
    _initHighlight: function() {
      // TODO: Need to implement this in Vis.js.
    },


    /**
     * Listen for event selections.
     */
    _initSelect: function() {

      // When an event is selected.
      this.timeline.on('select', _.bind(function(args) {
        var model = this.records.get(args.items[0]);
        this.publish('select', model);
      }, this));

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
          start:    start,
          model:    record
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

    },


    /**
     * Broadcast a public event.
     *
     * @param {String} event
     * @param {Object} model
     */
    publish: function(event, model) {
      Neatline.vent.trigger(event, {
        model: model, source: this.slug
      });
    },


  });


});
