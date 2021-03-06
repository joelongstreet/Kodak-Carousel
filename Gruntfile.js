var path = require('path');

module.exports = function(grunt) {
  var outputPath = 'public';
  var vendorPath = 'public/bower_components';

  grunt.initConfig({

    concat : {
      vendorJS : {
        src : [
          path.join(vendorPath, 'handlebars/handlebars.js'),
          path.join(vendorPath, 'jquery/jquery.js'),
          path.join(vendorPath, 'underscore/underscore.js'),
          path.join(vendorPath, 'backbone/backbone.js'),
          path.join(vendorPath, 'marionette/lib/backbone.marionette.js')
        ],
        dest : path.join(outputPath, 'vendor.js')
      }
    },


    browserify: {
      dist: {
        src: 'client-app/app.js',
        dest: path.join(outputPath, 'app.js')
      }
    },


    handlebars: {
      concat: {
        options: {
          namespace: 'templates',
          processName: function(filename) {
            return filename.replace(/^client-app\/templates\//, '')
                  .replace(/\.hbs$/, '');
          }
        },
        src: 'client-app/templates/*',
        dest: 'public/templates.js'
      }
    },


    stylus: {
      compile: {
        files: {
          'public/app.css' : 'client-app/styles/index.styl'
        }
      }
    },


    watch: {
      files: ['client-app/**/*'],
      tasks: ['compile']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [
    'watch',
  ]);

  grunt.registerTask('compile', [
    'concat',
    'handlebars',
    'browserify',
    'stylus'
  ]);
};