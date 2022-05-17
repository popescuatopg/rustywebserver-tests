const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/env.sh',
    agent: false,
    headers:{
        msg: 'super message',
        usr: 'a super student'
    },
    }, (res) => {
        console.log (res.statusCode);
        console.log (res.statusMessage);
        util.compareHeaders({"content-type": "text/plain; charset=utf-8"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "Message super message received from a super student") {
                console.error("Wrong message");
            }
        });
});