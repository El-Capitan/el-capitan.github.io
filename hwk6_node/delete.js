var fs = require('fs');

fs.unlink('content.txt', function (err) {
    if (err) throw err;
    console.log('content.txt deleted');
});