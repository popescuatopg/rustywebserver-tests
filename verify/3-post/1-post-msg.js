const http = require ('http');
const util = require("../util.js");

const text = 'super cool message';

const req = http.request({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/print_post.sh',
    agent: false,
    method: 'POST',
    headers:{
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-length': text.length,
        'ignore': 'header'
        }
    }, (res) => {
        console.log (res.statusCode);
        console.log (res.statusMessage);
        util.compareHeaders({"content-type": "text/plain"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== text) {
                console.error("Wrong message");
            }
        });
});
req.write (text);
req.end();