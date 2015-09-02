module.exports = function(grunt) {
  require('jit-grunt')(grunt, {});

  grunt.initConfig({
      connect: {
          server: {
              options: {
                  port: 8000
              }
          }
      },

    concat: {
        js : {
            src : [
                'js/controllers/**/*.js',
                'js/models/*.js',
                'js/views/**/*.js',
                'js/main.js',
            ],
            dest: 'js/core.js'
        },
        options: {
          separator: '',
        },
    },
    uglify : {
        js: {
            files: {
                'js/core.js': ['js/core.js']
            }
        }
    },

      less: {
          compile: {
              files: {
                  'css/core.css': 'css/core.less'
              },
              options: {
                  sourcemap: true
              }

          }
      },

      postcss: {
          modify: {
              src: 'css/core.css',
              options: {
                  map: true,
                  processors: [
                      require('autoprefixer-core')({browsers: 'last 2 versions'}),
                      require('cssnano')()
                  ]
              }
          }
      },

    watch: {

      styles: {
        files: [
            'css/**/*.less',
        ],
        tasks: [
            'less',
            'postcss'
        ],
        options: {
          nospawn: true,
          debounceDelay: 250
        }
      },
      scripts: {
        files: [
          'js/main.js',
          'js/controllers/**/*.js',
          'js/models/*.js',
          'js/views/**/*.js'
        ],
        tasks: [
          'concat', 'uglify'
        ],
        options: {
          nospawn: true,
          debounceDelay: 250
        }
      }
    }
  });

    grunt.registerTask('build', [
        'less',
        'postcss',
        'concat',
        'uglify'
    ]);
    grunt.registerTask('default', [
        'build',
        'connect:server',
        'watch'
    ]);
};
