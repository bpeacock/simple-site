var fs = require('fs'),
    _  = require('underscore');

var mapDirectory = function(directory) {
  var response = {},
      path = directory.substring(6), // Remove "./site"
      files = fs.readdirSync(directory, function(error) {
        console.log(error);
      });

  _.each(files, function(name) {
    // Pug
    if(name.match(/^[^_].+\.pug$/) && name != 'index.pug') {
      name = name.replace(/\.pug$/, '');

      response[name] = {
        href: path + '/' + name
      };
    }
    // Markdown
    else if(name.match(/\.md$/ && name != 'index.md')) {
      name = name.replace(/\.md$/, '');

      var md = parseMdMeta(getFile(directory + '/' + name + '.md'));

      if(!md.meta.draft) {
        response[name] = {
          href: path + '/' + name,
          meta: md.meta,
          markdown: md.markdown
        };
      }
    }
    // Directory
    else if(!name.match(/\./)) {
      var md        = parseMdMeta(getFile(directory + '/' + name + '/index.md')),
          contents  = mapDirectory(directory + '/' + name),
          images    = _.map(_.filter(fs.readdirSync(directory + '/' + name, function(error) {console.log(error);
                        }), function(filename) {
                          return filename.match(/\.(jpg|png|gif)/);
                        }), function(filename) {
                          return path + '/' + name + '/' + filename;
                        });

      if(!md.meta.draft) {
        response[name] = {
          href: path + '/' + name + '/',
          meta: md.meta,
          markdown: md.markdown,
          images: images,
          contents: contents,
          contentsByDate: _.sortBy(contents, function(item) {
            return item.meta.date;
          }).reverse()
        };
      }
    }
  });

  return response;
};

var getFile = function(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : false;
};

var parseMdMeta = function(fileText) {
  var meta = {};

  if(fileText) {
    var mdParts = fileText.split('---\n');

    if(mdParts.length > 1) { // Has Meta Header
      _.each(mdParts[1].split('\n'), function(line) {
        var parts = line.split(':'),
            key = parts.shift();

        if(key) meta[key] = parts.join(':').trim();
      });
    }

    var markdown = mdParts[mdParts.length - 1];
  }

  return {
    meta: meta,
    markdown: markdown || ''
  };
};

module.exports = {
  generate: function() {
    return mapDirectory('./site');
  },
  parseMdMeta: parseMdMeta,
  getFile: getFile
};
