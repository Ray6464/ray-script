#!/usr/bin/env node

const fs = require('ray-fs');
const chalk = require('chalk');
const flags = require('ray-flags');
const {sucide} = require('sucide');
const path = require('path');
const {rangeOfChara, capitalizeFirstChar} = require('ironberry').string;
const {sucideIfNoValidSourceFileIsProvided,
       transpiledConstantName,
       transpileKeyword} = require('./support_modules/uglified/built-in-methods.min.js');
const {constFinderRegex, constNamesFinderRegex, emptyLineRegex,
	commentOnlyLineRegex} = require('./support_modules/uglified/ray-script-regex-collection.min.js');

// custom prototypes
String.prototype.removeSpaces = function() {return this.valueOf().split(' ').join('')}
String.prototype.prepend = function(arg) {return arg + this.valueOf()}
String.prototype.append = function(arg) {return this.valueOf()+arg}
String.prototype.recurcivelyReplace = function(callback) {return callback(this.valueOf())}

if (flags.v) sucide('v0.0.4');
const fileURI = flags.f;
if (flags.f === undefined) sucide("No file name was given!"); 
sucideIfNoValidSourceFileIsProvided(fileURI);

const fileContents = fs.readArray(fileURI).value;

function debugLog1(arg1, arg2) {/*console.log(arg1, arg2)*/}
function debugLog2(arg1, arg2) {/*console.log(arg1, arg2)*/}

/*function transpileKeyword(line, rsKey, jsKey) {
  if (line.includes(rsKey)) { line = line.replace(rsKey, jsKey)}
  return line;
}*/

// testing each line for RayScript Syntax Validity
const compiledFileContents = [];
for (let line of fileContents) {
//  if (line.includes("console.log") {line.replace("console.log")}
  line = transpileKeyword(line, "log.o", "console.log");
// add code to support include
  if (constFinderRegex.test(line)) {
    debugLog1("qualifiedLine: <CONST>", line);
    compiledFileContents.push(writeAsConstant(line));
  }
  else if (emptyLineRegex.test(line)) {
    debugLog1("qualifiedLine: <EMPTY>", line);
    compiledFileContents.push(line);
  }
  else if (commentOnlyLineRegex.test(line)) {
    debugLog1("qualifiedLine: <COMMENT-ONLY>", line);
    compiledFileContents.push(line);
  }
  else {
    // Unqualified Lines are written as is since they may be JavaScript code
    debugLog1("unqualifiedLine:", line);
    const newLine = line.recurcivelyReplace((line) => {
      for (let constant of getNameOfConstant(line)) {
	line = line.replace(constant, transpiledConstantName(constant));
      }
      return line;
    });
    compiledFileContents.push(newLine.append('//::BAD RayScript LINE'));
    //sucide("Invalid Ray-Script Syntax:", line);
  }
}

const newFileContents = compiledFileContents.join('\n');
debugLog2(newFileContents);

const newFileName = path.basename(fileURI, '.rs')+'.js';
fs.write(newFileName, newFileContents);

function getNameOfConstant(line) {
  const constantsPresent = line.match(constNamesFinderRegex);
  //console.log('Constant Names:', constantsPresent);
  return constantsPresent;
}

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

//console.log(fileURI, fileContents);

/*
  switch(line) {
    case x:
      //do something
    case y:
      //do something
    default:
     //do default something
  }
  */

