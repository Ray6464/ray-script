const {sucide} = require('sucide');
const path = require('path');
const {capitalizeFirstChar} = require('ironberry').string;
//const {constNamesFinderRegex} = require('./ray-script-regex-collection.min.js');
const {constFinderRegex, constNamesFinderRegex, emptyLineRegex, includeRegex,
	commentOnlyLineRegex} = require('./ray-script-regex-collection.min.js');
const lineStatusCodes = require('./line-status-codes.min.js');

function getNameOfConstant(line) {
    const constantsPresent = line.match(constNamesFinderRegex);
    return constantsPresent;
}

function transpiledConstantName(constant) {
    const newConstantName = constant
		.split('-')
                .map(word => word.toLowerCase())
                .map((word, index) => (index>0? capitalizeFirstChar(word) : word))
                .join('');
    return newConstantName;
}

module.exports = {
  sucideIfNoValidSourceFileIsProvided: (fileName) => {
    if (path.extname(fileName) != '.rs') {
      sucide("Invalid file format! Use a .rs file.")
    }
  },
  transpileKeyword: function(line, rsKey, jsKey) {
    if (line.includes(rsKey)) { line = line.replace(rsKey, jsKey) }
    return line;
  },
  lineStatus: function(line) {
    if (includeRegex.test(line)) return lineStatusCodes.includeCode;
    else if (constFinderRegex.test(line)) return lineStatusCodes.constCode;
    else if (emptyLineRegex.test(line)) return lineStatusCodes.emptyCode;
    else if (commentOnlyLineRegex.test(line)) return lineStatusCodes.commentOnlyCode;
    else return lineStatusCodes.notFoundCode;
  },
  transpileAllConstants: function(line) {
    for (let constant of getNameOfConstant(line)) {
      line = line.replace(constant, transpiledConstantName(constant));
    }
    return line;
  }
}
