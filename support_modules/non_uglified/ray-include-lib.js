const fs = require('ray-fs');
const flags = require('ray-flags');
const {sucide} = require('sucide');
const path = require('path');

function parseIncludeDirectives(content) {
  const fileContents = content;
  const includeRegex = new RegExp(/^ *#include <[\w\.\/]+>/);

  const compiledFile = fileContents.map(line => {
    if (includeRegex.test(line)) {
      const includedFileURI = line
		      .split('<')[1]
	              .split('>')[0];
      // return modified content
      return fs.readArray(includedFileURI).value.join('\n');
    }
    else {
      return line;
    }
  }).join('');;

  return compiledFile;
}

module.exports = {
  parseIncludeDirectives: parseIncludeDirectives,
}

