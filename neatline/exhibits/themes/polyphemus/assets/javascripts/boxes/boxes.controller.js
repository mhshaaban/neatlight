
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.module('Boxes', function(Boxes) {


  Boxes.Controller = Neatline.Shared.Controller.extend({


    slug: 'BOXES',

    events: [
      'highlight',
      'unhighlight',
      'select',
      'unselect'
    ],


    /**
     * TODO|dev
     */
    init: function() {
      console.log('boxes');
    },


    /**
     * Box -> word highlights.
     */
    highlight: function() {
      console.log('highlight');
    },


    /**
     * Box -> word unhighlights.
     */
    unhighlight: function() {
      console.log('unhighlight');
    },


    /**
     * Box -> word selects.
     */
    select: function() {
      console.log('select');
    },


    /**
     * Box -> word unselects.
     */
    unselect: function() {
      console.log('unselect');
    },


  });


});
