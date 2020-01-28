var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var fs = require("fs")
var dns = require("dns")
var url = require("url")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

    
app.get("/", (req, res) => {
    res.send("hi")
})

app.get("/api/shorturl/:num", (req, res) => {
    if (!req.params.num){
        return res.json({"error":"no url specified"})
    }
    var rawData = fs.readFileSync('./urls.json');
    var json = JSON.parse(rawData);
    var url = json.list[req.params.num]
    if (req.params.num > json.list.length - 1 || req.params.num < 0){
        return res.json({"error":"specified shortened URL is not valid"})
    }
    console.log(url)
    res.redirect(url);
})

app.post(
    "/api/shorturl/new", 
    (req, res) => { // check json file for matching url
        if (!req.body.url){
            console.log(err);
            return res.json({error: "invalid URL"})
        }
        var parsedURL = url.parse(req.body.url)
        console.log(parsedURL);
        if (parsedURL.protocol == null){
            return res.json({"error": "invalid URL"})
        }
        dns.lookup(parsedURL.host, (error, address, family) => {
            console.log(address, family)
            if (error){
                return res.json({"error": "invalid URL"})
            }
        })

        var rawData = fs.readFileSync('./urls.json');
        var json = JSON.parse(rawData);
        var index = json.list.indexOf(parsedURL.href)
        if (index > -1){
            console.log("have this url")
            return res.json({
                orignal_url:parsedURL.href,
                short_url: index
            })
        } else {
            json.list.push(parsedURL.href)
            fs.writeFile('urls.json', JSON.stringify(json), 'utf8', (err)=>{
                if (err){
                    return res.json({"error":"no idea what went wrong"})
                }
                res.json({
                    orignal_url:req.body.url,
                    short_url:json.list.length - 1
                });
            })
        }
    }
)

module.exports = app