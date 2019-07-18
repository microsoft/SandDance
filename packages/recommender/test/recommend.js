var assert = require('assert');
var recommender = require("../dist/es5");

describe('Recommender', function () {
    it('should recommend true', function () {

        var r = new recommender.Recommender();

        assert.ok(r.recommend());
    });
});
