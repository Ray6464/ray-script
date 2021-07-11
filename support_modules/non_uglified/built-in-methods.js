const {sucide} = require('sucide');
const path = require('path');
const {capitalizeFirstChar} = require('ironberry').string;
const {constNamesFinderRegex} = require('./ray-script-regex-collection.min.js');

module.exports = {
  sucideIfNoValidSourceFileIsProvided: (fileName) => {
    if (path.extname(fileName) != '.rs') {
      sucide("Invalid file format! Use a .rs file.")
    }
  },
  transpiledConstantName: function (constant) {
    const newConstantName = constant
		.split('-')
                .map(word => word.toLowerCase())
                .map((word, index) => (index>0? capitalizeFirstChar(word) : word))
                .join('');
    return newConstantName;
  },
  transpileKeyword: function(line, rsKey, jsKey) {
    if (line.includes(rsKey)) { line = line.replace(rsKey, jsKey) }
    return line;
  },
  getNameOfConstant: function(line) {
    const constantsPresent = line.match(constNamesFinderRegex);
    return constantsPresent;
  }
}
