var assert = require('assert');
var recommender = require("../dist/es5");

describe('Recommender', function () {
    it('Scatter plot distinct value >10 x-axis', function () {
        var column1 = {
            name: 'test',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 15
            }
        };
        var column2 = {
            name: 'test1',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 5
            }
        };
        let arr = [];
        arr.push(column1);
        arr.push(column2);
        var r = new recommender.ScatterPlotRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 2);
    });

    it('Scatter plot distinct value >10 both axes', function () {
        var column1 = {
            name: 'test',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 15
            }
        };
        var column2 = {
            name: 'test1',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 20
            }
        };
        let arr = [];
        arr.push(column1);
        arr.push(column2);
        var r = new recommender.ScatterPlotRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 3);
    });

    it('Scatter plot recommended x-axis', function () {
        var column1 = {
            name: 'test',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 15
            }
        };
        var column2 = {
            name: 'test1',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 20
            }
        };
        let arr = [];
        arr.push(column1);
        arr.push(column2);
        var r = new recommender.ScatterPlotRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.x.name === 'test' || rec.x.name === 'test1');
    });

    it('Density plot categorical axes', function () {
        var column1 = {
            name: 'test',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 15
            }
        };
        var column2 = {
            name: 'test1',
            type: 'integer',
            quantitative: true,
            stats: {
                distinctValueCount: 20
            }
        };
        let arr = [];
        arr.push(column1);
        arr.push(column2);
        var r = new recommender.DensityPlotRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 0);
    });

    it('Density plot distinct value <5 no axes', function () {
        var column1 = {
            name: 'test',
            type: 'integer',
            quantitative: false,
            stats: {
                distinctValueCount: 15
            }
        };
        var column2 = {
            name: 'test1',
            type: 'integer',
            quantitative: false,
            stats: {
                distinctValueCount: 20
            }
        };
        let arr = [];
        arr.push(column1);
        arr.push(column2);
        var r = new recommender.DensityPlotRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 1);
    });

    it('Density plot distinct value <5 both axes', function () {
        var column1 = {
            name: 'test',
            type: 'integer',
            quantitative: false,
            stats: {
                distinctValueCount: 3
            }
        };
        var column2 = {
            name: 'test1',
            type: 'integer',
            quantitative: false,
            stats: {
                distinctValueCount: 2
            }
        };
        let arr = [];
        arr.push(column1);
        arr.push(column2);
        var r = new recommender.DensityPlotRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 3);
    });

    it('Bar chart categorical with distinct value>20', function () {
        var column1 = {
            name: 'test',
            type: 'string',
            quantitative: false,
            stats: {
                distinctValueCount: 15
            }
        };
        var column2 = {
            name: 'test1',
            type: 'integer',
            quantitative: false,
            stats: {
                distinctValueCount: 2
            }
        };
        let arr = [];
        arr.push(column1);
        var r = new recommender.BarChartRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 1);
    });
});
