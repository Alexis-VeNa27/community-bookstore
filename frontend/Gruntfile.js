'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'web',
        dist: 'dist'
      };

    grunt.initConfig({
        yeoman: yeomanConfig,
        availabletasks: {           // task
            tasks: {
                options: {
                    filter: 'exclude',
                    tasks: ['availabletasks', 'tasks', 'connect', 'connect:server']
                }
            }               // target
        },
        concat: {
            dist: {
                src: [
                    yeomanConfig.app + '/vendor/bootstrap-sass/dist/js/bootstrap.js', // Bootstrap JS
                    yeomanConfig.app + '/js/*.js', // All JS in the libs folder
                    yeomanConfig.app + '/js/global.js'  // This specific file
                ],
                dest: yeomanConfig.app + '/js/dist/production.js',
            }
        },
        uglify: {
            build: {
                src: yeomanConfig.app + '/js/dist/production.js',
                dest: yeomanConfig.app + '/js/dist/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: yeomanConfig.app + '/images/src',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: yeomanConfig.app + '/images/dist/',
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: yeomanConfig.app + '/styles/sass',
                    cssDir: yeomanConfig.app + '/styles',
                    importPath: yeomanConfig.app + '/vendor',
                    imagesDir: yeomanConfig.app + '/images',
                    javascriptsDir: yeomanConfig.app + '/scripts',
                    fontsDir: yeomanConfig.app + '/styles/fonts',
                }
            },
        },
        watch: {
            scripts: {
                files: [
                        yeomanConfig.app + '/js/*.js',
                        yeomanConfig.app + '/scripts/*.js',
                        ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            css: {
                files: [yeomanConfig.app + '/styles/sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            all: {
                files: 'index.html',
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    yeomanConfig.app + '/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    yeomanConfig.app + '/images/{,*/}*'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        yeomanConfig.app
                    ]
                }
            },
        },
    });

    // // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'compass', 'watch', 'connect:livereload']);
    grunt.registerTask('tasks', ['availabletasks']);
    grunt.registerTask('server',[
        'concat',
        'uglify',
        'imagemin',
        'compass',
        'connect:livereload',
        'watch'
    ]);
};
