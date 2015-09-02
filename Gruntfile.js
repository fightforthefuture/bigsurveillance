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
                'js/core.min.js': ['js/core.js']
            }
        }
    },

      less: {
          files: {
              "css/core.min.css": "css/core.less"
          },
          production: {
              options: {
                  sourcemap: false
              }

          },
          development: {
              options: {
                  sourceMap: true
              }
          }
      },

      postcss: {
          src: 'css/core.min.css',
          options: {
                  processors: [
                      require('autoprefixer-core')({browsers: 'last 2 versions'})
                  ]
          },
          development: {
              options: {
                  map: true
              }
          },
          production: {
              options: {
                  map: false,
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
            'less:development',
            'postcss:development'
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
        'less:production',
        'postcss:production',
        'concat',
        'uglify'
    ]);
    grunt.registerTask('default', [
        'build',
        'connect:server',
        'watch'
    ]);
};
