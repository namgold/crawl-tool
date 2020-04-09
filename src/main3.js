const fetch = require("node-fetch");
var jsdom = require("jsdom").JSDOM;

const has = (obj, key) => obj.hasOwnProperty(key)

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

populateUrl(
    {
        "url": {
            "url": "https://fb.com",
            "selector": "h3 > a",
            "seletorToValue": "href"
        }
    },
    null).then(data => console.log(data))
