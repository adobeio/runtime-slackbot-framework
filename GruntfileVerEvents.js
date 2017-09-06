/**
 * @author Esteban Posada <posada@adobe.com>
 * @copyright Adobe Systems Inc.
 * @version 1.0 - first release
 *
 * Grunt file to concatenate the verifationLib with events.js
 */

module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['./lib/events.js', './lib/verificationLib.js'],
        dest: './lib/events.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};
