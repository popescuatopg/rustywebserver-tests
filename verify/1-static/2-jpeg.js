const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/saturn.jpeg',
    agent: false,
    headers:{},
    }, (res) => {
        util.compareHeaders({"connection": "close", "content-type":"image/jpeg"}, res.headers);
        res.on ('data', (data) => {
            util.compareFile (util.filename("/saturn.jpeg"), data);
        })
});
