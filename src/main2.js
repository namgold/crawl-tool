const fetch = require("node-fetch");
const cheerio = require('cheerio')

fetch("http://bkenglish.edu.vn/tin-tuc.html/p-1").then(res => console.log(res))
