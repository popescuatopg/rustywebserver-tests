const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/page.html',
    agent: false,
    headers:{},
    }, (res) => {
        util.compareHeaders({"connection": "close", "content-type":"text/html; charset=utf-8"}, res.headers);
        res.on("data", (data) => {
            util.compareFile (util.filename("/page.html"), data);
        });
});
