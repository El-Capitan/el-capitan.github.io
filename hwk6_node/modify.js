var fs = require('fs');

fs.appendFile('content.txt', '\r\n' + 'Added via modify.js in Homework #6' + '\r\n', function (err) {
    if (err) throw err;
    console.log('content.txt modified');
});