const fs = require('fs');

const re = /[0-9]+-[a-z-]+/;

for (const folder of fs.readdirSync(__dirname)) {
  if (re.test(folder)) {
    console.log(folder + '\n');
    require(__dirname + '/' + folder);
    console.log();
  }
}
