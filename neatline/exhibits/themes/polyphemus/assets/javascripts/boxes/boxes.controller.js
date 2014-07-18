
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
      'unhighlight'
    ],


    /**
     * Box -> word highlights.
     *
     * @param {Object} args
     */
    highlight: function(args) {
      if (args.model.hasTag('bbox')) {
        Neatline.execute('MAP:renderHighlightIntent', args.model);
        // TODO
      }
    },


    /**
     * Box -> word unhighlights.
     *
     * @param {Object} args
     */
    unhighlight: function(args) {
      Neatline.execute('MAP:renderDefaultIntent', args.model);
    },


    /**
     * Given a bounding box record, get the corresponding word record.
     *
     * @param {Object} bboxRecord
     */
    getWordRecord: function(bboxRecord) {

      // Get the slug for the corresponding word.
      var wordSlug = 'w' + args.model.get('slug').slice(1);

      // Query for the model in the map collection.
      return Neatline.request('MAP:getRecords').findWhere({
        slug: wordSlug
      });

    }


  });


});
