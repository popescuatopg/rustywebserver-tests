const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/plain.txt',
    agent: false,
    headers: {},
    }, (res) => {
        let correct = true;
        correct = correct & util.compareStatus(res, 200, "OK");
        correct = correct & util.compareHeaders({"connection": "close", "content-type":"text/plain; charset=utf-8"}, res.headers);
        res.on("data", (data) => {
            correct = correct & util.compareFile (util.filename("/plain.txt"), data);
        });
        res.on("end", () => {
            if (!correct) {
                process.exit(1);
            }
        });
});
