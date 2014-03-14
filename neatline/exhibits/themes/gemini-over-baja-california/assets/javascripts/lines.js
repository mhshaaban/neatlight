
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Lines', function(Lines) {


  // VIEW
  // --------------------------------------------------------------------------


  Lines.View = Backbone.View.extend({


    id: 'word-line',


    /**
     * Construct the SVG container.
     */
    initialize: function() {
      this.svg = d3.select(this.el).append('svg:svg');
    },


    /**
     * Render the line.
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     */
    show: function(x1, y1, x2, y2) {

      var h = $(window).height();
      var w = $(window).width();

      // Inject/fit the containers.
      this.$el.appendTo($('body')).css({ width: w, height: h });
      this.svg.attr('width', w).attr('height', h);

      // Render the line.
      this.line = this.svg.append('svg:line').attr({
        x1: x1, y1: y1, x2: x1, y2: y1
      });

      // Animate the line length.
      this.line
        .transition()
        .attr('x2', x2)
        .attr('y2', y2)
        .each('end', _.bind(function() {
          // Place the dot at the end of the line.
          this.svg.append('svg:circle').attr({ cx: x2, cy: y2, r: 5 });
        }, this));

    },


    /**
     * Hide the line.
     */
    hide: function() {
      this.svg.selectAll('line, circle').remove();
      this.$el.detach();
    }


  });


  // CONTROLLER
  // --------------------------------------------------------------------------


  Lines.Controller = Neatline.Shared.Controller.extend({


    slug: 'WORDLINES',

    events: [

      'highlight',
      'unhighlight',

      { 'select':   'unhighlight' },
      { 'MAP:move': 'unhighlight' }

    ],


    /**
     * Create the view.
     */
    init: function() {
      this.view = new Neatline.Lines.View();
    },


    /**
     * Render line on `highlight`.
     *
     * @param {Object} args: Event arguments.
     */
    highlight: function(args) {

      // Did the event originate on the text?
      if (args.source == 'TEXT') {

        // Get the vector layer.
        var layer = Neatline.request('MAP:getVectorLayer', args.model);
        if (layer.features.length == 0) return;

        // Computer the map center.
        var lonlat = layer.getDataExtent().getCenterLonLat();
        var center = layer.getViewPortPxFromLonLat(lonlat);

        // Get the text span and offset.
        var span = Neatline.request('TEXT:getSpansByModel', args.model);
        if (span.length == 0) return;

        // Compute the text center.
        var offset = span.offset();
        var x = offset.left+span.width()/2;
        var y = offset.top+span.height()/2;

        // Render the line.
        this.view.show(x, y, center.x, center.y);

      }

    },


    /**
     * Render line on `highlight`.
     *
     * @param {Object} args: Event arguments.
     */
    unhighlight: function(args) {
      this.view.hide();
    }


  });


  // INITIALIZER
  // --------------------------------------------------------------------------


  Lines.addInitializer(function() {
    Lines.__controller = new Neatline.Lines.Controller();
  });


});
