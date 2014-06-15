
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.on('start', function() {

  var narrative = $('div.narrative');
  var exhibit   = $('div.exhibit');

  var position = function() {

    // Set exhibit width.
    exhibit.outerWidth($(window).width());

    // Set exhibit and narrative height.
    exhibit.add(narrative).outerHeight($(window).height());

    // Rerender the map.
    Neatline.execute('MAP:updateSize');

  };

  $(window).resize(position);
  position();

});
