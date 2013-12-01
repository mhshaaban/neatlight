
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.initConfig({

    uglify: {
      dist: {
        files: {
          'script.js': [
            'assets/javascripts/*.js',
            'bower_components/nprogress/nprogress.js'
          ]
        }
      }
    },

    stylus: {
      dist: {
        files: {
          'style.css': [
            'bower_components/nprogress/nprogress.css',
            'assets/stylesheets/*.styl'
          ]
        }
      }
    },

    watch: {
      dist: {
        files: ['assets/**/*'],
        tasks: ['stylus', 'uglify']
      }
    }

  });

};
