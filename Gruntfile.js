module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower_concat: {
        	all: {
        		dest: 'client/vendor/_bower.js',
        		cssDest: 'client/vendor/_bower.css',
        	}
        },

        concat: {
            main: {
                src: [
                    'client/vendor/_bower.js',
                    'client/scripts/*.js'
                ],
                dest: 'client/scripts/production.js'
            }
        },

        uglify: {
            build: {
                src: 'client/scripts/production.js',
                dest: 'client/scripts/production.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['bower_concat', 'concat', 'uglify']);
};
