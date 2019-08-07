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
                assert.ok(rec);
                done();
            });
        });
    });

    it(`longitude/latitude: recommends scatter plot`, function (done) {
        let filePath = './test-data/demovote-sample.tsv'
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            assert.ok(rec.chart==='scatterplot');
            done();
        });
    });

    it(`test-barchart: recommends bar chart`, function (done) {
        let filePath = './test-data/titanic-sample.tsv'
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            assert.ok(rec.chart==='barchart');
            done();
        });
    });
});
