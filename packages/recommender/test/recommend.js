var assert = require('assert');
var recommender = require("../dist/es5");

describe('Recommender', function () {
    it('should return an array for ScatterPlot', function () {

        var r = new recommender.ScatterPlotRecommender([]);
        var recs = r.recommend();
                
        assert.ok(Array.isArray(recs));
    });
});
