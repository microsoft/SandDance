
//import * as assert from 'assert';


var assert = require('assert');
var recommender = require("../dist/es5");

describe('Recommender', function () {
    it('should return an array for ScatterPlot', function () {

        var correctResult = JSON.stringify([{name: "name1", age: 18, details : "Details1"},
                                            {name: "name2", age: 19, details : "Details2"},
                                            {name: "name3", age: 20}]);

        interface rowType {
            displayValue: any;
            isNull: boolean;
        }

        // First row data
        let element1name : rowType = 
            {displayValue: "name1",
             isNull: false };
        
        let element1age : rowType = 
            {displayValue: 18,
            isNull: false };
        
        let element1details : rowType = 
            {displayValue: "Details1",
            isNull: false };
        

        // Second row data
        let element2name : rowType = 
            {displayValue: "name2",
            isNull: false };
    
        let element2age : rowType = 
            {displayValue: 19,
            isNull: false };
    
        let element2details : rowType = 
            {displayValue: "Details2",
            isNull: false };
        

        // Third row data
        let element3name : rowType = 
            {displayValue: "name3",
             isNull: false };
        
        let element3age : rowType = 
            {displayValue: 20,
            isNull: false };
        
        let element3details : rowType = 
            {displayValue: "",
            isNull: true };

        
        var rows = [[element1name, element1age, element1details],
                       [element2name, element2age, element2details],
                       [element3name, element3age, element3details]]
        
        var rowsCount = rows.length;

        interface colType {
            columnName: any;
        }

        var col1 : colType = {columnName: "name"};
        var col2 : colType = {columnName: "age"};
        var col3 : colType = {columnName: "details"};

        
        var columns = [col1, col2, col3];

        // Create Json
        let jsonArray = [];

        interface jsonType {
            [key: string]: any
        }

        for (let row = 0; row < rowsCount; row++) {
            let jsonObject: jsonType = {};
            for (let col = 0; col < columns.length; col++) {
                if (!rows[row][col].isNull) {
                    jsonObject[columns[col].columnName] = rows[row][col].displayValue;
                }
                // If display value is null, don't do anything for now
            }
            jsonArray.push(jsonObject);
        }

        var result = JSON.stringify(jsonArray);

        assert.ok(correctResult === result);
    });
});