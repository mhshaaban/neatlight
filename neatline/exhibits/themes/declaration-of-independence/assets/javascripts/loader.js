
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 * @jsx         React.DOM
 */

Neatline.module('Loader', function(Loader) {


  var Spinner = React.createClass({

    /**
     * Render the spinner.
     */
    render: function() {
      return (<i className="fa fa-cog fa-spin" />); // TODO
    }

  });


  Loader.addInitializer(function() {
    React.renderComponent(<Spinner />, $('#loader').get(0));
  });


});
