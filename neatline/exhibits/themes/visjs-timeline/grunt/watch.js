
/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2014 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = {

  options: {
    livereload: true
  },

  dist: {
    files: ['assets/**/*', '*.php'],
    tasks: 'compile:min'
  }

};
