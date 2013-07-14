
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

$(function() {

  // Cache exhibit and text selections.
  var content   = $('div.narrative, div.exhibit');
  var narrative = $('div.narrative');
  var exhibit   = $('div.exhibit');

  // Cache the width of the text.
  var textWidth = narrative.outerWidth();

  var position = function() {

    // Fill horizontal width with exhibit.
    exhibit.outerWidth($(window).width() - textWidth);

    // Fill vertical height with content.
    content.outerHeight($(window).height());

    // Refresh OpenLayers.
    Neatline.execute('MAP:updateSize');

  };

  // Position on domready/resize.
  $(window).resize(function() { position(); });
  position();

});
