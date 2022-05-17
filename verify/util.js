let fs = require("fs");
let path = require("path");

function toLowerKeys(obj) {
    return Object.keys(obj).reduce((accumulator, key) => {
        accumulator[key.toLowerCase()] = obj[key];
        return accumulator;
    }, {});
}

function compareFile(filename, data) {
    let file_data = fs.readFileSync(filename);
    if (!file_data.equals(data)) {
        console.error(`Downloaded file ${filename} is different from original`);
        return false;
    }
    return true;
}

function compareHeaders(headers, data) {
    let dataheaders = toLowerKeys(data);
    for (let header in headers) {
        if (headers[header] !== dataheaders[header.toLocaleLowerCase()]) {
            console.error(`Header ${header} differs: Yours: "${dataheaders[header.toLocaleLowerCase()]}", correct: "${headers[header]}"`);
            return false;
        }
    }
    return true;
}

function filename(filename) {
    return path.join("public", filename);
}

module.exports.compareFile = compareFile;
module.exports.compareHeaders = compareHeaders;
module.exports.filename = filename;
