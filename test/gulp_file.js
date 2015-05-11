/*global describe, beforeEach, it */
'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('Gulp Webapp generator: tasks', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'gulp-file'), function (err) {
      if (err) {
        done(err);
        return;
      }

      this.webapp = helpers.createGenerator('gulp-webapp:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.webapp.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  var assertTaskExists = function (generator, taskName, features, done, stylePreprocessor) {
    helpers.mockPrompt(generator, {
      features          : features,
      stylePreprocessor : stylePreprocessor
    });

    generator.run(function () {
      var gulpFile  = fs.readFileSync('gulpfile.js', 'utf8');
      var regexGulp = new RegExp('gulp.task\\(\'' + taskName + '\'');

      // whether include less or scss or css;
      var regexPreprocessor = 
        new RegExp(stylePreprocessor === 'less' ?
          '\$\.less' :
          (stylePreprocessor === 'sass' ?
             '\$\.sass' :
             'gulp\.src\(\'app\/styles\/\*\.css\'\)'));

      assert.ok(
        regexGulp.test(gulpFile),
        'gulpfile.js does not contain ' + taskName + ' task'
      );
      done();
    });
  };

  it('should contain styles task without Sass included', function (done) {
    assertTaskExists(this.webapp, 'styles', [], done);
  });

  it('should contain styles task with Sass included', function (done) {
    assertTaskExists(this.webapp, 'styles', [], done, 'sass');
  });

  it('should contain styles task with Less included', function (done) {
    assertTaskExists(this.webapp, 'styles', [], done, 'less');
  });


  it('should contain styles task with css included', function (done) {
    assertTaskExists(this.webapp, 'styles', [], done, 'none');
  });

  it('should contain jshint task', function (done) {
    assertTaskExists(this.webapp, 'jshint', [], done);
  });

  it('should contain html task', function (done) {
    assertTaskExists(this.webapp, 'html', [], done);
  });

  it('should contain images task', function (done) {
    assertTaskExists(this.webapp, 'images', [], done);
  });

  it('should contain fonts task', function (done) {
    assertTaskExists(this.webapp, 'fonts', [], done);
  });

  it('should contain clean task', function (done) {
    assertTaskExists(this.webapp, 'clean', [], done);
  });

  it('should contain build task', function (done) {
    assertTaskExists(this.webapp, 'build', [], done);
  });

  it('should contain wiredep task', function (done) {
    assertTaskExists(this.webapp, 'wiredep', [], done);
  });

  it('should contain default task', function (done) {
    assertTaskExists(this.webapp, 'default', [], done);
  });

  it('should contain default serve', function (done) {
    assertTaskExists(this.webapp, 'serve', [], done);
  });
});
