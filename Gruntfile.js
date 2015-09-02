module.exports = function(grunt) {
  require('jit-grunt')(grunt, {});

  grunt.initConfig({
    connect: {
      options: {
        port: 8000
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
            dest : 'js/compiled.js'
        },
        options: {
          separator: '',
        },
    },
    uglify : {
        js: {
            files: {
                'js/compiled.min.js' : [ 'js/compiled.js' ]
            }
        }
    },
    
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/core.min.css": "css/core.less"
        }
      }
    },
    
    watch: {
      
      styles: {
        files: [
          'css/*.less',
        ],
        tasks: [
          'less'
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

  grunt.registerTask('default', ['connect','watch']);
};
