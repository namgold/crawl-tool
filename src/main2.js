const fetch = require("node-fetch");
var jsdom = require("jsdom").JSDOM;

fetch("http://bkenglish.edu.vn/tin-tuc.html/p-1").then(res => res.text()).then(text => {
    var document = new jsdom(text).window.document;
    const a = [...document.querySelectorAll(".news")];
    const b = a.map(i => [...i.querySelectorAll("div")]);


})


// var time = Date.now();
// console.log(doc.querySelectorAll('#t span', doc).length);
// console.log(doc.querySelectorAll('#t span', doc)[0].innerHTML);
// console.log(Date.now()-time);
// time = Date.now();
// console.log(querySelectorAll('#t span', doc).length);
// console.log(querySelectorAll('#t span', doc)[0].innerHTML);
// console.log(Date.now()-time);
