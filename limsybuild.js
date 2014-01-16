var fs = require('fs');
var limsscrape = require("./limsscrape.js");

//Get all of the measures in the csv
var measures = fs.readFileSync('./limsrecords.csv',{encoding:"utf8"}).split(',');
measures.forEach(function (m) {
	limsscrape.get(m, function(err, res) {
		fs.appendFileSync('./out.json', JSON.stringify(res), function (err) {
			if (err) throw err;
			console.log("Record added: " + m);
		});
	});
});