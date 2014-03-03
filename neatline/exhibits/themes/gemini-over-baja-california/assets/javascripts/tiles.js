
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

$(function() {
  Neatline.vent.on('MAP:ingest', function() {

    var layers = Neatline.request('MAP:getWmsLayers');

    _.each(layers, function(layer) {

      // When loading starts.
      layer.events.register('loadstart', layer, function() {
        console.log('start');
      });

      // When loading finishes.
      layer.events.register('loadend', layer, function() {

        // Are any layers loading?
        var loading = _.reduce(layers, function(memo, layer) {
          return memo || layer.loading;
        }, false);

        if (!loading) console.log('stop');

      });

    });

  });
});
