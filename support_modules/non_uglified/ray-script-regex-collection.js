module.exports = {
  constFinderRegex: new RegExp(/^ *[A-Z\-]{3,} *=/), //const line finder
  constNamesFinderRegex: new RegExp(/[A-Z\-]{3,}/g), // const name finder
  // A constant assignment is defined in ray-script as a line with:
  // A string that begins with any number of spaces,
  // followed by Capital Alphabets and dashes \-
  // followed by any number of spaces
  // followed by an equal-to symbol

  emptyLineRegex: new RegExp(/^ *$/),
  // emptyLine is a line that starts and ends with whitespace
  commentOnlyLineRegex: new RegExp(/^ *\/\//),
  // commpentOnlyLine is a line that starts with any numbers of spaces, followed by two froward slashes



}
