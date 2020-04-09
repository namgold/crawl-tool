const fs = require("fs");
const fetch = require("node-fetch");
var jsdom = require("jsdom").JSDOM;

const has = (obj, key) => obj.hasOwnProperty(key)

const process = data => {
    const handleKey = (data) => {
        
    }
    const handleUrl = (data) => {

    }
    const handleSelector = (data) => {

    }
    const handleIsSelectAll = (data) => {

    }
    const handleData = (data) => {

    }

    const populateUrl = (url, doc) => {
        return new Promise((resolve, reject) => {
            let returnUrls = [];
            if (typeof url === "string") {
                const regex = /(?:\{(\d+)\.\.(\d+)\})/;
                const a = regex.exec(url);
                if (a) {
                    let start = a[1], end = a[2];
                    if (isNaN(start) || isNaN(end)) reject("Invalid number");
                    start = parseInt(start);
                    end = parseInt(end);
                    for (let i = start; i <= end; i++)
                        returnUrls.push(url.replace(regex, i));
                }
                else returnUrls.push(url);
                resolve(returnUrls);
            }
            else {
                const seletorToValue = has(url, 'seletorToValue') ? url.seletorToValue : 'href';
                const selectOne = has(url, 'selectOne') ? url.selectOne : false;
                if (has(url, 'url')) {
                    populateUrl(url.url, doc).then(subUrls => {
                        if (has(url, 'selector')) {
                            const urlPromises = subUrls.map(subUrl => new Promise((resolve, reject) => {
                                fetch(subUrl).then(i => i.text()).then(text => {
                                    let dom = new jsdom(text).window.document;
                                    let tempUrl = Object.assign({}, url);
                                    delete tempUrl.url;
                                    populateUrl(tempUrl, dom).then(i => resolve(i));
                                })
                            }));
                            Promise.all(urlPromises).then(urls => {
                                const temp = [];
                                for (let i = 0; i < urls.length; i++)
                                    for (let j = 0; j < urls[i].length; j++)
                                        temp.push(urls[i][j])
                                resolve(temp)
                            });
                        }
                        else resolve(subUrls);
                    });
                }
                else {
                    if (has(url, 'selector')) {
                        if (selectOne)
                            returnUrls = [doc.querySelector(url.selector)[seletorToValue]];
                        else
                            returnUrls = [...doc.querySelectorAll(url.selector)].map(i => i[seletorToValue]);
                        resolve(returnUrls);
                    }
                    else reject("Url must have either 'url' or 'selector'!")
                }
            }
        })
    }

    if (has(data, "url")) {
        data.__urls = populateUrl(data.url, data.__doc).then(urls => {
            
        });
    }

    const returnObj = {};
    if (!has(data, "seletorToValue")) data.seletorToValue = 'innerText';
    if (!has(data, "isSelectAll")) data.isSelectAll = false;

    let dataField = null;
    if (has(data, "selector")) {
        if (has(data, "url")) {
            let url = data.url;
            
        }
        else {

        }
    }

    if (has(data, 'data')) {
        if (Array.isArray(data.data)) {
            if (has(data, 'isSelectAll')) {

            }
            else {
                const q = data.data.map(x => process(x));
                dataField = q;
            }
        }
        else throw "'data' field must be array";
    }

    if (data.hasOwnProperty('key')) {
        if (data.hasOwnProperty('data')) {
            returnObj[data.key] = dataField;
        }
        else {
            if (data.hasOwnProperty('url')) {
                returnObj[data.key] = null; //querySelector;

            }
        }
    }
    else if (data.hasOwnProperty('data')) {
        returnObj = dataField;
    }
    else throw "There must be at least 'data' or 'key' in object"
    return returnObj;
}

function run(fileName) {
    const data = require('../json/' + fileName);
    const output = process(data);
    fs.writeFile(fileName.slice(0, -11) + '.output.json', output, 'utf8');
}

fs.readdir("json", (error, files) => {
    if (error) console.log(error);
    else {
        files.forEach(item => {
            if (item.slice(-11) === '.input.json')
                run(item)
        })
    }
});