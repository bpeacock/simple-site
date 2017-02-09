#!/usr/bin/env node

var program = require('commander'),
    ncp     = require('ncp').ncp,
    fs      = require('fs'),
    replace = require('stream-replace');

ncp.limit = 16; // Limit Threads

program
  .arguments('<projectName>')
  .action(function(projectName) {
    var projectLocation = process.cwd() + '/' + projectName,
        codeLocation = __dirname;

    ncp(codeLocation + '/template', projectLocation, function (error) {
      if(error) {
        return console.error(error);
      }

      // File Replacements
      fs.createReadStream(codeLocation + '/template/package.json')
        .pipe(replace('<PROJECT NAME>', projectName))
        .pipe(fs.createWriteStream(projectLocation + '/package.json'));

      fs.createReadStream(codeLocation + '/template/README.md')
        .pipe(replace('PROJECTNAME', projectName))
        .pipe(fs.createWriteStream(projectLocation + '/README.md'));

      fs.createReadStream(codeLocation + '/template/gitignore')
        .pipe(fs.createWriteStream(projectLocation + '/.gitignore'));

      // Mark Completion
      console.log('New project "' + projectName + '" created at ' + projectLocation);
    });
  })
  .parse(process.argv);
