
/**
 * @package     omeka
 * @subpackage  neatline-Neatlight
 * @copyright   2014 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = {

  dist: {
    files: {
      'script.js': [

        // Vendor
        'bower_components/react/react.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/nprogress/nprogress.js',

        // Source
        'assets/javascripts/**/*.jsx',
        'assets/javascripts/**/*.js'

      ]
    }
  }

};
