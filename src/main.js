const fs = require("fs");
const fetch = require("node-fetch");
const cheerio = require('cheerio')

const has = (obj, key) => obj.hasOwnProperty(key)

const process = data => {
    const returnObj = {};
    if (!has(data, "seletorToValue")) data.seletorToValue = 'innerText';
    if (!has(data, "isSelectAll")) data.isSelectAll = false;

    let dataField = null;
    if (has(data, "selector")) {
        if (has(data, "url")) {
            fetch(data.url).then(res)
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