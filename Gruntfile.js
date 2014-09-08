module.exports = function(grunt) {

  grunt.initConfig({
//    pkg: grunt.file.readJSON('package.json'),
//    concat: {
//      options: {
//        separator: ';'
//      },
//      dist: {
//        src: ['src/**/*.js'],
//        dest: 'dist/<%= pkg.name %>.js'
//      }
//    },
    uglify: {
        options: {
            compress : {
                drop_console : true
            }
        },
        my_target: {
            files: [{
                expand : true,
                cwd: 'public/javascripts',
                src : '*.js',
                dest : 'public/build/js'
            }]
        }
    },
    cssmin: {
        my_target: {
            files: [{
                expand: true,
                cwd: 'public/stylesheets',
                src: ['*.css', '!*.min.css'],
                dest: 'public/build/css',
                ext: '.css'
            }]
        }
    },
    htmlmin: {                                     
        dist: {                                    
            options: {                                 
                removeComments: true,
                collapseWhitespace: true
            },
            files: [{
                expand : true,
                cwd : 'views',
                src : ['*.ejs'],
                dest : 'views/build',
                ext : '.ejs'
            }]
        }
    }
//    qunit: {
//      files: ['test/**/*.html']
//    },
//    jshint: {
//      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
//      options: {
//        // options here to override JSHint defaults
//        globals: {
//          jQuery: true,
//          console: true,
//          module: true,
//          document: true
//        }
//      }
//    },
//    watch: {
//      files: ['<%= jshint.files %>'],
//      tasks: ['jshint', 'qunit']
//    }

//     less: {
//         main: {
//             options: {
// //                banner: "/*! <%= grunt.template.today('dd-mm-yyyy') %> */\n"
//             },
//             files: [
//                 {
//                     expand: true,     // Enable dynamic expansion.
//                     cwd: 'static/css',      // Src matches are relative to this path.
//                     src: ['**/*.less'], // Actual pattern(s) to match.
//                     dest: 'static/build/css/',   // Destination path prefix.
//                     ext: '.css'   // Dest filepaths will have this extension.
//                 },
//             ]
//         }
//     }
//      less: {
//          main: {
//              options: {
//                  paths: ["static/css"]
//              },
//              files: {
//                  "static/build/css/main.css": "static/css/main.less",
//                  "static/build/css/blog.css": "static/css/blog.less"
//              }
//          }
//      }
  });

 grunt.loadNpmTasks('grunt-contrib-uglify');
 grunt.loadNpmTasks('grunt-contrib-cssmin');
 grunt.loadNpmTasks('grunt-contrib-htmlmin');
//  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-contrib-qunit');
//  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-contrib-concat');
//  grunt.loadNpmTasks('grunt-contrib-less');

//  grunt.registerTask('test', ['jshint', 'qunit']);
//
  grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin']);

};
