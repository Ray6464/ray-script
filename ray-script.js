const fs = require('ray-fs');
const chalk = require('chalk');
const flags = require('ray-flags');
const {sucide} = require('sucide');
const path = require('path');

// custom prototypes
String.prototype.removeSpaces = function() {return this.valueOf().split(' ').join('')}
String.prototype.prepend = function(arg) {return arg + this.valueOf()}
String.prototype.append = function(arg) {return this.valueOf()+arg}

const fileURI = flags.f;
if (flags.f === undefined) sucide("No file name was given!"); 
if (path.extname(flags.f) != '.rs') sucide("Invalid file format! Use a .rs file."); 

const fileContents = fs.readArray(fileURI).value;

// RayScript syntax using regex
const constFinderRegex = new RegExp(/^ *[A-Z\-]+ *=/);
  // A constant assignment is defined in ray-script as a line with:
  // A string that begins with any number of spaces,
  // followed by Capital Alphabets and dashes \-
  // followed by any number of spaces
  // followed by an equal-to symbol

const emptyLineRegex = new RegExp(/^ *$/);
  // emptyLine is a line that starts and ends with whitespace
const commentOnlyLineRegex = new RegExp(/^ *\/\//);
  // commpentOnlyLine is a line that starts with any numbers of spaces, followed by two froward slashes

function debugLog1(arg1, arg2) {/*console.log(arg1, arg2)*/}
function debugLog2(arg1, arg2) {console.log(arg1, arg2)}


// testing each line for RayScript Syntax Validity
const compiledFileContents = [];
for (let line of fileContents) {
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
    debugLog1("unqualifiedLine:", line)
    compiledFileContents.push(line.append('//::BAD RayScript LINE'));
    //sucide("Invalid Ray-Script Syntax:", line);
  }
}

const newFileContents = compiledFileContents.join('\n');
debugLog2(newFileContents);

const newFileName = path.basename(fileURI, '.rs')+'.js';
fs.write(newFileName, newFileContents);

function camelify(word) {
  const newWord = word.split('').map((alphabet, index) => (index>0? alphabet: alphabet.toUpperCase())).join('');
  return newWord;
}

function rangeOfChara(chara, range) {
  let str = "";
  for (let i = 0; i < range; i++) { str += chara }
  return str;
}

function writeAsConstant(line) {
  String.prototype.removeSpaces = function() {return this.valueOf().split(' ').join('')}
  String.prototype.prepend = function(arg) {return arg + this.valueOf()}

  const leadingSpaces = line.match(/[A-Z]/i).index;
  const nameOfConstant = line
            .removeSpaces()
            .split('=')[0]
	    .split('-')
            .map(word => word.toLowerCase())
            .map((word, index) => (index>0? camelify(word) : word))
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

