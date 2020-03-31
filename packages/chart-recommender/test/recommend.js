// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var assert = require('assert');
var recommender = require("../dist/es5");
var fs = require('fs');
var vega = require('vega');
var SandDance = require('@msrvida/sanddance/dist/umd/sanddance');
SandDance.use(vega);

var sampleDir = './test-data/';

function GetDataAndColumns(sampleFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(sampleDir + sampleFile, function (err, buffer) {
            const rawText = buffer.toString();
            const data = vega.read(rawText, { type: 'tsv', parse: "auto" });
            const columns = SandDance.util.getColumnsFromData(vega.inferTypes, data);
            resolve({ data, columns });
        });
    });
}

function FileGetDataAndColumns(sampleFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(sampleFile, function (err, buffer) {
            const rawText = buffer.toString();
            const data = vega.read(rawText, { type: 'tsv', parse: "auto" });
            const columns = SandDance.util.getColumnsFromData(vega.inferTypes, data);
            resolve({ data, columns });
        });
    });
}

describe('Recommender', function () {
    var sampleFiles = fs.readdirSync(sampleDir);
    console.log(sampleFiles[0]);
    sampleFiles.forEach(function (sampleFile) {
        var dataAndColumnsPromise = GetDataAndColumns(sampleFile);
        it(`${sampleFile} Recommender returns one bar chart recommendations`, function (done) {
            dataAndColumnsPromise.then(function (dataAndColumns) {
                var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
                var rec = r.recommend();
                assert.ok(rec.chart === 'barchart');
                done();
            });
        });
    });

    it(`longitude/latitude: recommends scatter plot`, function (done) {
        let filePath = '../../docs/sample-data/demovote.tsv';
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            assert.ok(rec.chart === 'scatterplot');
            done();
        });
    });

    it(`test-barchart: recommends bar chart`, function (done) {
        let filePath =  '../../docs/sample-data/titanicmaster.tsv';
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            assert.ok(rec.chart === 'barchart');
            done();
        });
    });
});
