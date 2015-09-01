module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      uses_defaults: {}
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

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['connect','watch']);
};
