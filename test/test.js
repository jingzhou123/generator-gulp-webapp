/*global describe, beforeEach, it */
'use strict';
var fs      = require('fs');
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-assert');

describe('Gulp webapp generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
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

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  it('creates expected files', function (done) {
    var expected = [
      'bower.json',
      'package.json',
      'gulpfile.js',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/scripts/main.js'
    ];

    helpers.mockPrompt(this.webapp, {
      features: ['includeSass']
    });

    this.webapp.run(function () {
      assert.file(expected);
      done();
    });
  });

  it('should not contain build:js in index.html', function(done) {
    helpers.mockPrompt(this.webapp, {
      features: ['includeBootstrap', 'includeModernizr'],
      stylePreprocessor: 'less'
    });

    this.webapp.run(function() {
      var indexHtml = fs.readFileSync('app/index.html', 'utf8');
      var regexBuildJs = new RegExp('build:\s*js');
      assert.ok(
        !regexBuildJs.test(indexHtml),
        'index.html contains the wiredep task for build js');
      done();
    });
  });
});
