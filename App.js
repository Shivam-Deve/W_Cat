#!/usr/bin/env node
let fs = require("fs");
let path = require("path");
let args = process.argv.slice(2);
let n;
let b;
let s;
let filesPaths = [];
args.forEach(el => {
  if (el == "-n") {
    n = el.slice(1);
  } else if (el == "-b") {
    b = el.slice(1);
  } else if (el == "-s") {
    s = el.slice(1);
  } else if (fs.lstatSync(el).isFile()) {
    filesPaths.push(el);
  } else {
    return;
  }
});
if (n == "n" && b == "b") {
  console.log("-n and -b can't be used together");
  return;
}
if (n != undefined) {
  wCatEcho(filesPaths, n, s);
} else if (b != undefined) {
  wCatEcho(filesPaths, b, s);
} else {
  wCatEcho(filesPaths, undefined, s);
}
function wCatEcho(filesPaths, numbering, spaceTrim) {
  contentArr = [];
  filesPaths.forEach(el => {
    let txt = fs.readFileSync(el, "utf-8");
    if (spaceTrim == "s") {
      contentArr = trims(txt.split("\n"));
    } else {
      contentArr = txt.split("\n");
    }
    contentArr.forEach((e, i) => {
      if (numbering == "b") {
        if (e.trim() != "") {
          console.log(i + 1 + " " + e);
        } else {
          console.log(" " + e);
        }
      } else if (numbering == "n") {
        console.log(i + 1 + " " + e);
      } else {
        console.log(" " + e);
      }
    });
    console.log("");
  });
}

function trims(txt) {
  return txt.filter(e => e.trim() != "");
}
