/* jshint camelcase: false */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-eslint');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        eslint: {
            main: {
                src: ['bin/*', 'lib/**/*.js' ]
            },
            test: {
                src: ['test/**/*.js'],
            }
        },
        mochaTest: {
            options: {
            },
            any: {
                src: ['test/**/*.js']
            }
        },
        clean: {
            dist: [ 'node_modules' ]
        }
    });

    grunt.registerTask('default', ['eslint','mochaTest']);
};
