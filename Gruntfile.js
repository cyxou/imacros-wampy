module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('google-closure-compiler').grunt(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            srcToDist: {
                files: {
                    'build/wampy.js': 'src/wampy.js'
                }
            }
        },
        'closure-compiler': {
          wampy: {
            files: {
              'build/wampy.js': ['src/wampy.js']
            },
            options: {
              compilation_level: 'SIMPLE',
              language_out: 'ECMASCRIPT5_STRICT',
              formatting: 'pretty_print'
            }
          }
        },
        replace: {
            dist: {
                src         : ['build/wampy.js'],
                overwrite   : true,
                replacements: [{
                    from: /\}\)\(undefined, function \(\) \{/,
                    to  : '})(this, function () {'
                }]
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                preserveComments: false,
                sourceMap: true
            },
            dist: {
                files: {
                    'build/wampy.min.js': ['build/wampy.js']
                }
            }
        },
        concat: {
            msgpackToWampy: {
                src: ['build/msgpack5.min.js', 'build/wampy.min.js'],
                dest: 'build/wampy-all.min.js'
            }
        },
        copy: {
            msgpackToDist: {
                files: [
                    {
                        src: ['node_modules/msgpack5/dist/msgpack5.min.js'],
                        dest: 'build/msgpack5.min.js'
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', ['closure-compiler', 'replace', 'copy', 'concat']);
};
