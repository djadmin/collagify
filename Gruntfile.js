module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower_concat: {
            all: {
                dest: 'public/vendor/_bower.js',
                cssDest: 'public/vendor/_bower.css',
            }
        },

        concat: {
            main: {
                src: [
                    'public/vendor/_bower.js',
                    'public/scripts/*.js'
                ],
                dest: 'public/dist/production.js'
            }
        },

        uglify: {
            build: {
                src: 'public/dist/production.js',
                dest: 'public/dist/production.min.js'
            }
        },

        cssmin: {
          minify: {
            src: 'public/css/*.css',
            dest: 'public/dist/production.min.css'
          }
        }

    });



    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [
        'bower_concat',
        'concat',
        'uglify',
        'cssmin'
    ]);
};
