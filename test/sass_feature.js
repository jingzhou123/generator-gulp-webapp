/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('Gulp webapp generator: sass feature', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'sass'), function (err) {
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

  var assertFileExists = function (app, fileExt, features, done, stylePreprocessor) {
    var expected = [
      'app/styles/main.' + fileExt
    ];

    helpers.mockPrompt(app, {
      features: features,
      stylePreprocessor: stylePreprocessor
    });

    app.run(function () {
      assert.file(expected);
      done();
    });
  };

  it('should create scss file', function (done) {
    assertFileExists(this.webapp, 'scss', [], done, 'sass');
  });

  it('should create scss file', function (done) {
    assertFileExists(this.webapp, 'less', [], done, 'less');
  });

  it('should create css file', function (done) {
    assertFileExists(this.webapp, 'css', [], done, 'none');
  });
});
