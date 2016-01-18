module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.initConfig({
    browserify: {
      dev: {
        files: {
          'build/bundle.js': ['main.js'],
          'dist/finput.js': ['src/finput.js']
        },
        options: {
          browserifyOptions: {
            debug: true,
            standalone: 'Finput'
          },
          transform: [
            ["babelify", {
              presets: ["es2015"],
              plugins: ["add-module-exports"]
            }]
          ]
        }
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js', 'main.js'],
        tasks: ['compile'],
        options: {
          // for grunt-contrib-watch v0.5.0+, 'nospawn: true' for lower versions.
          // Without this option specified express won't be reloaded
          spawn: false,
          livereload: true,
          atBegin: true
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : ['build/bundle.js', 'index.html']
        },
        options: {
          watchTask: true,
          server: {
              baseDir: "./"
          }
        }
      }
    },
    uglify: {
      main: {
        files: {
          'dist/finput.min.js': ['dist/finput.js']
        }
      }
    }
  });

  grunt.registerTask('compile', ['browserify:dev', 'uglify']);
  grunt.registerTask('serve', ['compile', 'browserSync', 'watch']);

  grunt.registerTask('default', 'serve');
};
