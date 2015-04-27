module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            foo: {
                files: [{
                    expand: true,
                    dest: 'public/dist',
                    cwd: 'public/bower_components/font-awesome',
                    src: [
                        'fonts/*'
                    ]
                }]
            }
        },
        
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
                dest: 'public/dist/js/production.js'
            }
        },

        uglify: {
            build: {
                src: 'public/dist/js/production.js',
                dest: 'public/dist/js/production.min.js'
            }
        },

        cssmin: {
            minify: {
                src: ['public/vendor/_bower.css', 'public/css/*.css'],
                dest: 'public/dist/css/production.min.css'
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [
        'copy',
        'bower_concat',
        'concat',
        'uglify',
        'cssmin'
    ]);
};
