#!/usr/bin/env node

var program = require('commander'),
    ncp     = require('ncp').ncp,
    fs      = require('fs'),
    replace = require('stream-replace');

ncp.limit = 16; // Limit Threads

program
  .arguments('<projectName>')
  .action(function(projectName) {
    var location = process.cwd() + '/' + projectName;

    ncp('./template', location, function (err) {
      if (err) {
        return console.error(err);
      }

      // File Replacements
      fs.createReadStream('./template/package.json')
        .pipe(replace('<PROJECT NAME>', projectName))
        .pipe(fs.createWriteStream(location + '/package.json'));

      fs.createReadStream('./template/README.md')
        .pipe(replace('<PROJECT NAME>', projectName))
        .pipe(fs.createWriteStream(location + '/README.md'));

      // Mark Completion
      console.log('New project "' + projectName + '" created at ' + location);
    });
  })
  .parse(process.argv);
