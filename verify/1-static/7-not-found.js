const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/ghost',
    agent: false,
    headers:{},
    }, (res) => {
        util.compareHeaders({"connection": "close"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "<html>403 Forbidden</html>") {
                console.error("Wrong message");
            }
        })
});