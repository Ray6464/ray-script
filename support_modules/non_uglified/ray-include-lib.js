const fs = require('ray-fs');
const flags = require('ray-flags');
const {sucide} = require('sucide');
const path = require('path');
const {includeRegex} = require('./ray-script-regex-collection.min.js');

function parseIncludeDirectives(content) {
  const fileContents = content;

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
  }).join('\n');;

  return compiledFile;
}

module.exports = {
  parseIncludeDirectives: parseIncludeDirectives,
}

