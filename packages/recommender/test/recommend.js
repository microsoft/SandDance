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
        arr.push(column1, column2);
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
        arr.push(column1, column2);
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
        arr.push(column1, column2);
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
        arr.push(column1, column2);
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
        arr.push(column1, column2);
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
        arr.push(column1, column2);
        var r = new recommender.DensityPlotRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 3);
    });

    it('Bar chart categorical with distinct value<20', function () {
        var column1 = {
            name: 'col0',
            type: 'string',
            quantitative: false,
            stats: {
                distinctValueCount: 30
            }
        };
        var column2 = {
            name: 'col1',
            type: 'string',
            quantitative: false,
            stats: {
                distinctValueCount: 2
            }
        };
        let arr = [];
        arr.push(column1, column2);
        var r = new recommender.BarChartRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 1 && rec.x.name === 'col1');
    });

    it('Bar chart categorical with distinct value<20', function () {
        var column1 = {
            name: 'col0',
            type: 'string',
            quantitative: false,
            stats: {
                distinctValueCount: 3
            }
        };
        var column2 = {
            name: 'col1',
            type: 'string',
            quantitative: false,
            stats: {
                distinctValueCount: 24
            }
        };
        let arr = [];
        arr.push(column1, column2);
        var r = new recommender.BarChartRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 1 && rec.x.name === 'col0');
    });

    it('Bar chart numerical', function () {
        var column1 = {
            name: 'test',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 15
            }
        };
        var column2 = {
            name: 'test1',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 2
            }
        };
        let arr = [];
        arr.push(column1, column2);
        var r = new recommender.BarChartRecommenderSummary(arr, []);
        var rec = r.recommend();

        assert.ok(rec.score === 1);
    });

    it('TreeMap', function () {
        var column1 = {
            name: 'test',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 1
            }
        };
        var column2 = {
            name: 'test1',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 3
            }
        };
        let arr = [];
        arr.push(column1, column2);
        var r = new recommender.TreeMapRecommenderSummary(arr, [{ "test": 2, "test1": 30 }, { "test": 2, "test1": 1 }, { "test": 2, "test1": 1000 }]);
        var rec = r.recommend();
        assert.ok(rec.score === 1);
    });

    it('TreeMap size by', function () {
        var column1 = {
            name: 'test',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 1
            }
        };
        var column2 = {
            name: 'test1',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 3
            }
        };
        let arr = [];
        arr.push(column1, column2);
        var r = new recommender.TreeMapRecommenderSummary(arr, [{ "test": 2, "test1": 30 }, { "test": 2, "test1": 1 }, { "test": 2, "test1": 1000 }]);
        var rec = r.recommend();
        assert.ok(rec.sizeBy.name === 'test1');
    });

    it('RecommenderSummary', function () {
        var column1 = {
            name: 'test',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 1
            }
        };
        var column2 = {
            name: 'test1',
            type: 'number',
            quantitative: true,
            stats: {
                distinctValueCount: 3
            }
        };
        let arr = [];
        arr.push(column1, column2);
        var r = new recommender.RecommenderSummary(arr, [{ "test": 2, "test1": 30 }, { "test": 2, "test1": 1 }, { "test": 2, "test1": 1000 }]);
        var rec = r.recommend();
        console.log(rec[0].type);
        assert.ok(true);
    });

});
