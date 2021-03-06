#!/usr/bin/env node

const fs = require('ray-fs');
const chalk = require('chalk');
const flags = require('ray-flags');
const {sucide} = require('sucide');
const path = require('path');
const { parseIncludeDirectives } = require('./support_modules/uglified/ray-include-lib.min.js');
const {rangeOfChara, capitalizeFirstChar} = require('ironberry').string;
const {sucideIfNoValidSourceFileIsProvided, lineStatus, transpileAllConstants,
       transpileKeyword} = require('./support_modules/uglified/built-in-methods.min.js');
//const {constFinderRegex, /*constNamesFinderRegex,*/ emptyLineRegex,
//	commentOnlyLineRegex} = require('./support_modules/uglified/ray-script-regex-collection.min.js');
const lineStatusCodes = require('./support_modules/uglified/line-status-codes.min.js');

// custom prototypes
String.prototype.removeSpaces = function() {return this.valueOf().split(' ').join('')}
String.prototype.prepend = function(arg) {return arg + this.valueOf()}
String.prototype.append = function(arg) {return this.valueOf()+arg}
String.prototype.recurcivelyReplace = function(callback) {return callback(this.valueOf())}
String.prototype.testRegex = function(regex) {return regex.test(this.valueOf())}

if (flags.v) sucide('v0.0.4');
const fileURI = flags.f;
if (flags.f === undefined) sucide("No file name was given!"); 
sucideIfNoValidSourceFileIsProvided(fileURI);

const fileContents = fs.readArray(fileURI).value;

function debugLog1(arg1, arg2) {/*console.log(arg1, arg2)*/}
function debugLog2(arg1, arg2) {/*console.log(arg1, arg2)*/}

// testing each line for RayScript Syntax Validity
const compiledFileContents = [];
for (let line of fileContents) {
//  if (line.includes("console.log") {line.replace("console.log")}
  line = transpileKeyword(line, "log.o", "console.log");
// here: add code to support #include <fileName.h>
  debugLog1(lineStatus(line), line);
  switch(lineStatus(line)) {
    case lineStatusCodes.includeCode:
      compiledFileContents.push(line); // will be parsed later
      break;

    case lineStatusCodes.constCode:
      compiledFileContents.push(writeAsConstant(line));
      break;

    case lineStatusCodes.emptyCode:
      compiledFileContents.push(line);
      break;

    case lineStatusCodes.commentOnlyCode:
      compiledFileContents.push(line);
      break;

    case lineStatusCodes.notFoundCode: // Written as is! Just parse for namespaces
      const newLine = line.recurcivelyReplace(transpileAllConstants);
      compiledFileContents.push(newLine.append('//::BAD RayScript LINE'));
      break;

    default:
      sucide('There is an un-acceptable error on the followin line:', line);
  }
}

const newFileContents = compiledFileContents.join('\n');
debugLog2(newFileContents);

const newFileName = path.basename(fileURI, '.rs')+'.js';

const parsedIncludeFileContents = parseIncludeDirectives(newFileContents.split('\n'));
fs.write(newFileName, parsedIncludeFileContents);
//fs.write(newFileName, newFileContents);

function writeAsConstant(line) {
  const leadingSpaces = line.match(/[A-Z]/i).index;
  const nameOfConstant = line
            .removeSpaces()
            .split('=')[0]
	    .split('-')
            .map(word => word.toLowerCase())
            .map((word, index) => (index>0? capitalizeFirstChar(word) : word))
            .join('')
	    .removeSpaces();

  const value = line.split('=')[1];
  const newLine = `const ${nameOfConstant} = ${value}`.prepend(rangeOfChara(" ", leadingSpaces));
//  console.log("old Line:", line);
//  console.log("new Line:", newLine);
  return newLine;
}

function initializeRayScriptMethods() {
  // add new methods in RayScript here, write them where the #include Methods is shown in the user's js file
}

