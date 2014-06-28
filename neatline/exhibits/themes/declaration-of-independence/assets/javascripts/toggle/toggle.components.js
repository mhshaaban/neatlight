
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Toggle', function(Toggle) {


  Toggle.Widget = React.createClass({

    /**
     * Render the top-level markup.
     */
    render: function() {
      return (
        <ul className="toggle">

          <li>The (Digital) Declaration of Independence</li>

          <li className="rotate">Text</li>
          <li className="rotate">Painting</li>
          <li className="rotate">Map</li>

          <li className="rotate">
            <i className="fa fa-rotate-right" />
          </li>

        </ul>
      );
    }

  });


});
