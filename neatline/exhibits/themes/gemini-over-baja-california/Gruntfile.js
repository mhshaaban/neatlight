
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     omeka
 * @subpackage  neatline-NeatLight
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    concat: {
      dist: {
        src: [
          'bower_components/nprogress/nprogress.js',
          'assets/javascripts/*.js'
        ],
        dest: 'script.js'
      }
    },

    uglify: {
      dist: {
        src: '<%= concat.dist.src %>',
        dest: '<%= concat.dist.dest %>'
      }
    },

    stylus: {
      dist: {
        files: {
          'style.css': [
            'assets/stylesheets/style.styl',
            'assets/stylesheets/loader.styl'
          ]
        }
      },
      options: {
        paths: ['bower_components'],
        'include css': true
      }
    },

    cssmin: {
      dist: {
        files: {
          'style.css': 'style.css'
        }
      }
    },

    watch: {
      dist: {
        files: 'assets/**/*',
        tasks: 'compile'
      }
    }

  });

  grunt.registerTask('compile', ['stylus', 'cssmin', 'concat']);
  grunt.registerTask('compile:min', ['concat', 'uglify']);
  grunt.registerTask('default', 'compile:min');

};
