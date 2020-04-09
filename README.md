
# Crawl tool
This is the static-website crawl tool. You can describe the website in JSON file and the tool will run and crawl the data.
Example:

#### **`input.json`**
```javascript
{
    "data": [
        {
            "key": "news",
            "url": {
                "link": "http://bkenglish.edu.vn/tin-tuc.html/p-{1..15}"
            },
            "url2": "http://bkenglish.edu.vn/tin-tuc.html/p-{1..15}",
            "selector": ".news",
            "isSelectAll": true,
            "data": [
                {
                    "key": "title",
                    "seletor": "h3"
                },
                {
                    "key": "description",
                    "seletor": ".tomtat",
                    "seletorToValue": "innerText"
                },
                {
                    "url": {
                        "selector": "h3 a",
                        "seletorToValue": "href"
                    },
                    "seletor": ".news-content",
                    "data": [
                        {
                            "key": "content",
                            "selector": "div ~ div"
                        },
                        {
                            "key": "createdDate",
                            "selector": "div"
                        }
                    ]
                }
            ]
        }
    ]
}
```

#### **`output.json`**
```javascript
{
    "news": [
        {
            "title": "Khai giang chuong trinh online toeic",
            "description": "Neu ban muon nhanh chong thi de ra truong thi nhanh tay dang ky chuong trinh hoc huu ich",
            "image": "https://...",
            "views": "1234",
            "date": "03/04/2020",
            "content": "<div><p>...</p></div>"
        },
        {
            "title": "Khai giang chuong trinh online toeic 2",
            "description": "Neu ban muon nhanh chong thi de ra truong thi nhanh tay dang ky chuong trinh hoc huu ich",
            "image": "https://...",
            "views": "1234",
            "content": "<div><p>...</p></div>"
        },
        {
            "title": "Khai giang chuong trinh online toeic 3",
            "description": "Neu ban muon nhanh chong thi de ra truong thi nhanh tay dang ky chuong trinh hoc huu ich",
            "image": "https://...",
            "views": "1234",
            "content": "<div><p>...</p></div>"
        },
        {
            "title": "Khai giang chuong trinh online toeic",
            "description": "Neu ban muon nhanh chong thi de ra truong thi nhanh tay dang ky chuong trinh hoc huu ich",
            "image": "https://...",
            "views": "1234",
            "content": "<div><p>...</p></div>"
        },
        
        {
            "title": "Khai giang chuong trinh online toeic 2",
            "description": "Neu ban muon nhanh chong thi de ra truong thi nhanh tay dang ky chuong trinh hoc huu ich",
            "image": "https://...",
            "views": "1234",
            "content": "<div><p>...</p></div>"
        },
        {
            "title": "Khai giang chuong trinh online toeic 3",
            "description": "Neu ban muon nhanh chong thi de ra truong thi nhanh tay dang ky chuong trinh hoc huu ich",
            "image": "https://...",
            "views": "1234",
            "content": "<div><p>...</p></div>"
        }
    ]
}
```

# JSON configuration

<details>
<summary><h3 style="display: inline">key</h3></summary>
Type: String
<p>
Specific key name for the output.
Example:

#### **`input.json`**
```javascript
{
	"key": "title",
    ...
}
```
#### **`output.json`**
```javascript
{
	"title": "..."
}
```
</p>
</details>
