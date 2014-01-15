var limsscrape = require("./limsscrape.js");
limsscrape.get(process.argv[2], function(err, res) {
    console.log(res);
});
