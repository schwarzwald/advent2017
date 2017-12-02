const fs = require('fs');

const execute = (filename, processor) => {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(processor(data));
  });
}

module.exports.execute = execute;