var fs = require('fs');
var limsscrape = require("./limsscrape.js");

//Get all of the measures in the csv
var measures = fs.readFileSync('./limsrecords.csv',{encoding:"utf8"}).split(',');

for (var i = 0; i < measures.length; i++) {
		limsscrape.get(measures[i], function(err, res) {
			fs.open('./out.json', 'a', function (err, fd) {
			fs.write(fd, res + ',');
			fs.fsyncSync(fd);
		});

	});
}