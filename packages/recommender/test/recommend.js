var assert = require('assert');
var recommender = require("../dist/es5");
var fs = require('fs');
var vega = require('vega-lib');
var SandDance = require('@msrvida/sanddance/dist/umd/sanddance');

SandDance.use(vega);

var sampleDir = './test-data/';

function GetDataAndColumns(sampleFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(sampleDir + sampleFile, function (err, buffer) {
            const rawText = buffer.toString();
            const data = vega.read(rawText, { type: 'tsv', parse: "auto" });
            const columns = SandDance.util.getColumnsFromData(data);
            resolve({ data, columns });
        });
    });
}

function FileGetDataAndColumns(sampleFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(sampleFile, function (err, buffer) {
            const rawText = buffer.toString();
            const data = vega.read(rawText, { type: 'tsv', parse: "auto" });
            const columns = SandDance.util.getColumnsFromData(data);
            resolve({ data, columns });
        });
    });
}

describe('Recommender', function () {
    var sampleFiles = fs.readdirSync(sampleDir);
    console.log(sampleFiles[0]);
    sampleFiles.forEach(function (sampleFile) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFile);

        it(`${sampleFile} Recommender returns one recommendations`, function (done) {

            dataAndColumnsPromise.then(function (dataAndColumns) {
                var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
                var rec = r.recommend();
                console.log(rec);
                assert.ok(rec);
                done();
            });
        });
    });

    it(`longitude/latitude : recommends scatter plot `, function (done) {
        let filePath = './test-data/demovote-sample.tsv'
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.type==='scatterplot');
            done();
        });
    });

    it(`test-scatter : recommends scatter plot `, function (done) {
        let filePath = './test-data/test-scatter.tsv'
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.type==='scatterplot');
            done();
        });
    });


    /*
    it(`test2: Scatter plot distinct value >10 x-axis`, function (done) {
        var dataAndColumnsPromise2 = GetDataAndColumns(sampleFiles[1]);
        dataAndColumnsPromise2.then(function (dataAndColumns) {
            var r = new recommender.ScatterPlotRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            assert.ok(rec.score === 2 && rec.type === 'scatterplot');
            done();
        });
    });

    it('Scatter plot distinct value >10 both axes', function (done) {
        var dataAndColumnsPromise2 = GetDataAndColumns(sampleFiles[2]);
        dataAndColumnsPromise2.then(function (dataAndColumns) {
            var r = new recommender.ScatterPlotRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            assert.ok(rec.score === 3 && rec.type === 'scatterplot');
            done();
        });
    });

    it('Scatter plot recommended x-axis', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[1]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.ScatterPlotRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.x.name === 'Age'|| rec.x.name === 'Number');
            done();
        });
    });

    it('Density plot categorical axes', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[2]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.DensityPlotRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.score === 0);
            done();
        });
    });

    it('Density plot distinct value <5 both axes', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[3]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.DensityPlotRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.score === 3);
            done();
        });
    });

    it('Bar chart categorical with distinct value<20', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[4]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.BarChartRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.score === 1 && rec.x.name === 'Number');
            done();
        });
    });

    it('Bar chart numerical', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[1]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.BarChartRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.score === 2 && rec.x.name === 'Age');
            done();
        });
    });

    it('Bar chart outlier', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[1]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.BarChartRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(true);
            done();
        });
    });

    it('TreeMap', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[1]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.TreeMapRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.score === 1);
            done();
        });
    });

    it('TreeMap size by', function (done) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFiles[1]);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.TreeMapRecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            console.log(dataAndColumns.columns.length, dataAndColumns.data.length);
            var rec = r.recommend();
            console.log(rec);
            assert.ok(rec.sizeBy.name === 'Age');
            done();
        });
    });
    */

});
