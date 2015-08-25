'use strict';

module.exports = function(grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    settings: grunt.file.readJSON('paths.json'),
    watch: {
      css: {
        files: '<%= settings.src %>/styles/partials/*.scss',
        tasks: ['sass','postcss'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['<%= settings.src %>/index.html','<%= settings.src %>/views/*.html'],
        tasks: ['copy:index','copy:views']
      },
      gruntfile: {
        files: ['gruntfile.js']
      },
      scripts: {
        files: '<%= settings.src %>/**/*.js',
        tasks: ['rig','copy:scripts']
      }
    },
    sass: {
      dist: {
        files: {
          '<%= settings.dist %>/styles/styles.css' : '<%= settings.src %>/styles/styles.scss'
        }
      }
    },
    rig: {
        compile: {        
            files: {
                '<%= settings.dist %>/js/plugins.js': ['<%= settings.src %>/js/plugins.js']
            }
        }
    },
    browserSync: {
        bsFiles: {
            src : [
              '<%= settings.dist %>/styles/*.css',
              '<%= settings.dist %>/views/*.html',
              '<%= settings.dist %>/index.html'
          ]
        },
        options: {
            server: {
                baseDir: "./dist"
            },
            watchTask: true
        }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      dist: {
        src: '<%= settings.dist %>/styles/*.css'
      }
    },
    copy: {
      images: {
        expand: true,
        src: ['<%= settings.src %>/assets/images/**'],
        dest: '<%= settings.dist %>/assets/images/',
        filter: 'isFile',
        flatten: true
      },
      fonts: {
        expand: true,
        src: ['<%= settings.src %>/assets/fonts/**'],
        dest: '<%= settings.dist %>/assets/fonts/',
        filter: 'isFile',
        flatten: true
      },
      index: {
        expand: true,
        src: ['<%= settings.src %>/index.html'],
        dest: 'dist/',
        flatten: true
      },
      views: {
        expand: true,
        src: ['<%= settings.src %>/views/*.html'],
        dest: '<%= settings.dist %>/views',
        flatten: true
      },
      scripts: {
        expand: true,
        src: ['<%= settings.src %>/js/app.js','<%= settings.src %>/js/main.js'],
        dest: '<%= settings.dist %>/js/',
        filter: 'isFile',
        flatten: true
      },
      scriptLibs: {
        expand: true,
        src: ['<%= settings.src %>/js/vendor/**'],
        dest: '<%= settings.dist %>/js/vendor',
        filter: 'isFile',
        flatten: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-rigger');
  grunt.registerTask('default',['browserSync','watch']);
  grunt.registerTask('build',['copy']);
}