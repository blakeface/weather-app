module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        presets: ['es2015']
      },
      dist: {
        files: {
          'src/app.es5.js': 'src/app.js'
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      },
      build: {
        src: 'src/app.es5.js',
        dest: 'dist/app.min.js',
      },
    },
    jshint: {
      files: ['Gruntfile.js', 'src/app.js'],
      options: {
        esversion: 6,
        globals: {
          jQuery: true,
          console: true,
          module: true,
        },
      },
    },
    cssmin: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        },
        files: {
          'dist/style.min.css': ['src/*.css'],
        },
      },
    },
    watch: {
      files: ['<%= jshint.files %>', 'src/*.css'],
      tasks: ['jshint', 'babel', 'uglify', 'cssmin'],
      options: { livereload: true },
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'dist',
          keepalive: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint', 'babel', 'uglify', 'cssmin', 'connect']);
};
