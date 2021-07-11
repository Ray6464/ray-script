# ray-script
A Programming Language that Transpiles to JavaScript. Focuses on Readability, Brevity (small files), Code Base Management, and Eliminating Bad Programming Practices. Has amazing features that we've all needed very much! Focuses on writing code for NodeJS.

# Installation & Usage
To Install use:
```
npm i -g ray-script
```

To check version use:
```
ray-script -v
```

To compine RayScript code to JavaScript code use:
```
ray-script -f fileName.rs
```
This will compile the RayScript file `fileName.rs` to a JavaScript file `fileName.js`.

# RayScript Syntax
## Const Declarations
To make a `const` declaration use all capital alphabets and hypens:

RayScript:
```javascript
HELLO-WORLD = "hello world";
```

Compiles to the following JavaScript:
```javascript
const helloWorld = "hello world";
```
## RayScript Comments
Make a comment similar to a JavaScript comment!

## Inline JavaScript Code
We can also write inline JavaScript Code, but it is not recommanded right now. JavaScript code blocks will be fully supported in a later version!

# Project Status (Under-development)
1. Supports Const declarations.
2. Support Commpent Only Lines.
3. Supports JavaScript Code.

# LICENSE
MIT License

Copyright (c) 2021 Ray Voice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

