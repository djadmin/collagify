module.exports = function(grunt) {

    var publicDir = 'public';

    var globalConfig = {
        src: publicDir + '',
        dist: publicDir + '/dist',
        vendor: publicDir + '/vendor'
    };

    grunt.initConfig({

        globalConfig: globalConfig,

        bower: grunt.file.readJSON('./.bowerrc'),

        copy: {
            foo: {
                files: [{
                    expand: true,
                    dest: '<%= globalConfig.dist %>',
                    cwd: '<%= bower.directory %>/font-awesome',
                    src: [
                        'fonts/*'
                    ]
                }]
            }
        },

        bower_concat: {
            all: {
                dest: '<%= globalConfig.vendor %>/_bower.js',
                cssDest: '<%= globalConfig.vendor %>/_bower.css',
            }
        },

        concat: {
            main: {
                src: [
                    '<%= globalConfig.vendor %>/_bower.js',
                    '<%= globalConfig.src %>/scripts/app.js'
                ],
                dest: '<%= globalConfig.dist %>/js/production.js'
            }
        },

        uglify: {
            build: {
                src: '<%= globalConfig.dist %>/js/production.js',
                dest: '<%= globalConfig.dist %>/js/production.min.js'
            }
        },

        cssmin: {
            minify: {
                src: ['<%= globalConfig.vendor %>/_bower.css', 'public/css/*.css'],
                dest: '<%= globalConfig.dist %>/css/production.min.css'
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
