
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.on('start', function() {

  var exhibit = $('div.exhibit');

  var position = function() {
    exhibit.outerWidth($(window).width());
    exhibit.outerHeight($(window).height());
    Neatline.execute('MAP:updateSize');
  };

  $(window).resize(position);
  position();

});
