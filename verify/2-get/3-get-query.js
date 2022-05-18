const http = require ('http');
const util = require("./../util.js");

http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/scripts/print_query_string.sh?subject=server&value=this+is+a+text',
    agent: false,
    headers:{},
    }, (res) => {
        let correct = true;
        correct = correct & util.compareStatus(res, 200, "OK");
        correct = correct & util.compareHeaders({"content-type": "text/plain"}, res.headers);
        res.on ('data', (data) => {
            if (data.toString().trim() !== "Query_value=this+is+a+text\nQuery_subject=server") {
                console.error("Wrong message");
            }
            else
            {
                correct = false;
            }
        });
        res.on("end", () => {
            if (!correct) {
                process.exit(1);
            }
        });
});