
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

      var groups = new vis.DataSet([
        {id: 1, content: 'Group 1'},
        {id: 2, content: 'Group 2'},
        {id: 3, content: 'Group 3'},
      ]);

      var items = new vis.DataSet([
        {id: 1, group: 1, content: 'Item 1', start: '2014-07-01'},
        {id: 2, group: 1, content: 'Item 2', start: '2014-07-02'},
        {id: 3, group: 1, content: 'Item 3', start: '2014-07-03'},
        {id: 4, group: 1, content: 'Item 4', start: '2014-07-04'},
        {id: 5, group: 1, content: 'Item 5', start: '2014-07-05'},
        {id: 6, group: 2, content: 'Item 6', start: '2014-07-06'},
        {id: 7, group: 2, content: 'Item 7', start: '2014-07-07'},
        {id: 8, group: 2, content: 'Item 8', start: '2014-07-08'},
        {id: 9, group: 2, content: 'Item 9', start: '2014-07-09'},
        {id: 10, group: 2, content: 'Item 10', start: '2014-07-10'},
        {id: 11, group: 3, content: 'Item 11', start: '2014-07-11'},
        {id: 12, group: 3, content: 'Item 12', start: '2014-07-12'},
        {id: 13, group: 3, content: 'Item 13', start: '2014-07-13'},
        {id: 14, group: 3, content: 'Item 14', start: '2014-07-14'},
        {id: 15, group: 3, content: 'Item 15', start: '2014-07-15'},
      ]);

      this.timeline = new vis.Timeline(this.el, items);
      this.timeline.setGroups(groups);

    }


  });


});
