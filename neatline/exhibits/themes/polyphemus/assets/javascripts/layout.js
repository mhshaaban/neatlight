
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.on('start', function() {

  var exhibit = $('#neatline-map');
  var slider = $('#slider-container');

  var position = function() {
    exhibit.add(slider).outerHeight($(window).height());
    Neatline.execute('MAP:updateSize');
  };

  $(window).resize(position);
  position();

});
