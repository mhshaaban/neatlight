
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

$(window).load(function() {

  var text = $('#neatline-narrative');

  var pos = function() {
    text.css('left', $(window).width()/2-text.width()/2);
    text.show();
  };

  //$(window).resize(pos);
  //pos();

});
