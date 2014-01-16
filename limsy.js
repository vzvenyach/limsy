var fs = require('fs');
var limsscrape = require("./limsscrape.js");

limsscrape.get(process.argv[2], function(err, res) {
	fs.writeFileSync('./out.json', JSON.stringify(res));
});