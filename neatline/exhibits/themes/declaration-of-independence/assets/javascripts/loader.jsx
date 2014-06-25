
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Loader', function(Lines) {


  var Loader = React.createClass({

    /**
     * Render the spinner.
     */
    render: function() {
      return (<i className="fa fa-cog fa-spin" />); // TODO
    }

  });


  // Render the component.
  Neatline.on('start', function() {
    React.renderComponent(<Loader />, $('#loader').get(0));
  });


});
