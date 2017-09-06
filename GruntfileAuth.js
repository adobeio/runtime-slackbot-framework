/**
 * @author Esteban Posada <posada@adobe.com>
 * @copyright Adobe Systems Inc.
 * @version 1.0 - first release
 *
 * Grunt file to concadenate the respondWebpages.js and
 * authentication.js
 */

module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['./lib/authenticationLib.js', './src/respondWebPages.js'],
        dest: './lib/authentication.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};