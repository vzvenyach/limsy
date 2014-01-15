var test = require('tap').test,
    limsy = require('../');

test('references', function(t) {
    t.plan(2);

    limsy.get('B18-0234', function(err, res) {
        t.equal(err, null, 'no error thrown');
        t.equal(res.LegislationNo, 'B18-0234', 'bill number is correct');
    });
});
