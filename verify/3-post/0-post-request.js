
const http = require ('http');
const util = require("./../util.js");

let req = http.request({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/print_method.sh',
    agent: false,
    method: "POST",
    headers:{},
    }, (res) => {
        console.log (res.statusCode);
        console.log (res.statusMessage);
        util.compareHeaders({"content-type": "text/plain"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "POST") {
                console.error("Wrong message");
            }
        });
});

req.write("text");
req.end();