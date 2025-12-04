// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import assert from 'assert';
import recommender from '../dist/es5/index.js';
import fs from 'fs';
import * as vega from 'vega';
import { getColumnsFromData } from '@msrvida/sanddance-specs/dist/umd/sanddance-specs';

const sampleDir = './test-data/';

function GetDataAndColumns(sampleFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(sampleDir + sampleFile, function (err, buffer) {
            const rawText = buffer.toString();
            const data = vega.read(rawText, { type: 'tsv', parse: 'auto' });
            const columns = getColumnsFromData(vega.inferTypes, data);
            resolve({ data, columns });
        });
    });
}

function RawDataAndColumns(data) {
    const columns = getColumnsFromData(vega.inferTypes, data);
    return { data, columns };
}

function FileGetDataAndColumns(sampleFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(sampleFile, function (err, buffer) {
            const rawText = buffer.toString();
            const data = vega.read(rawText, { type: 'tsv', parse: 'auto' });
            resolve(RawDataAndColumns(data));
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

    it('x/y: recommends scatter plot', function (done) {
        const data = [
            { x: 0, y: 0 },
        ];
        const dataAndColumns = RawDataAndColumns(data);
        var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
        var rec = r.recommend();
        assert.ok(rec.chart === 'scatterplot');
        done();
    });

    it('longitude/latitude: recommends scatter plot', function (done) {
        let filePath = '../../docs/sample-data/demovote.tsv';
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            assert.ok(rec.chart === 'scatterplot');
            done();
        });
    });

    it('test-barchart: recommends bar chart', function (done) {
        let filePath = '../../docs/sample-data/titanicmaster.tsv';
        var dataAndColumnsPromise = FileGetDataAndColumns(filePath);
        dataAndColumnsPromise.then(function (dataAndColumns) {
            var r = new recommender.RecommenderSummary(dataAndColumns.columns, dataAndColumns.data);
            var rec = r.recommend();
            assert.ok(rec.chart === 'barchart');
            done();
        });
    });
});
