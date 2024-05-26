const http = require ('http');
const util = require("../util.js");

const text = 'super cool message';

const req = http.request({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/scripts/print_query_string_post.sh?subject=server',
    agent: false,
    method: 'POST',
    headers:{
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-length': text.length,
        }
    }, (res) => {
        let correct = true;
        correct = correct & util.compareStatus(res, 200, "OK");
        correct = correct & util.compareHeaders({"content-type": "text/plain"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim().split(/\r?\n/).sort().join("\n") !== "Query_subject=server\nsuper cool message") {
                console.error("Wrong message");
                correct = false;
            }
        });
        res.on("end", () => {
            if (!correct) {
                process.exit(1);
            }
        });
});
req.write (text);
req.end ();
