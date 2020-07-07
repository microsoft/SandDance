// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from '@luma.gl/core';
import * as vega from 'vega';
import * as VegaDeckGl from '../../src/index';

VegaDeckGl.use(vega, deck, layers, luma);

export { vega };

/* eslint-disable */
const initspec: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "Stock prices of 5 Tech Companies over Time.",
    "background": "white",
    "padding": 5,
    "width": 700,
    "height": 600,
    "style": "cell",
    "signals": [
        {
        "name": "indexDate",
        "update": "time('Mar 4 2020')",
        "on": [
          {
            "events": "mousemove",
            "update": "invert('x', clamp(x(), 0, width))"
          }
        ]
      },
      {
        "name": "which",
        "value": "cases",
        "bind": {
          "input": "select",
          "options": ["deaths", "cases"]
        }
  
      },
      {
        "name": "top",
        "value": 10,
        "bind": {
          "input": "range",
          "min":5,
          "max":50,
          "step":1
        }
      },
      {
        "name": "axisnames",
        "update": "{'Positive': 'Total Positive Tests', 'Total Tests': 'Total Reported Tests', 'Deaths':'Total Deaths','Tests/10k':'Tests Per 10K People', 'New Positives':'New Positives', 'New Tests':'New Tests', 'New Deaths':'New Deaths'}"
      },
      {
        "name": "axislabel",
        "update": "axisnames[which]"
      }
  
    ],
    "data": [
      {
        "name": "Covid",
        "url": "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv",
        "format": {"type": "csv", "parse": "auto", "delimiter": ","},
        "transform": [      
          {
            "field": "date",
            "type": "timeunit",
            "units": ["year", "month", "date"],
            "timezone": "utc",
            "as": ["utcyearmonthdate_Date", "utcyearmonthdate_Date_end"]
          },
          {
            "type": "formula",
            "as": "Value",
            "expr": "datum[which]"
          },
          {"type": "filter", "expr": "datum['Value'] > 0"},
          {"type": "filter", "expr": "datum['fips'] > 0"},
          {"type": "collect",
            "sort": {"field":"state"}
          }
        ]
      },
      {
        "name": "ranks",
        "source": "Covid",
        "transform": [
          {
            "type": "formula",
            "as": "SortValue",
            "expr": "datum['Value']"
          },
          {
            "type": "aggregate",
            "groupby": ["fips","state","county"],
            "ops": ["max"],
            "fields": ["SortValue"],
            "as": ["TotalSortVal"]
          },
          {
            "type": "window",
            "sort": {"field": "TotalSortVal", "order": "descending"},
            "ops": ["row_number"], "as": ["rank"]
          },
          {"type": "collect",
            "sort": {"field":"rank"}
          },
          {"type": "formula",
            "as": "countystate",
            "expr": "datum['county'] + ', ' + datum['state']"
          }
        ]    
      },
      {
        "name": "rankedCovid",
        "source": "Covid",
        "transform": [
          {
            "type": "lookup",
            "from": "ranks",
            "key": "fips",
            "values": ["rank"],
            "fields": ["fips"]
          },
          {"type": "collect",
            "sort": {"field":"rank"}
          },
          {
            "type": "filter", "expr": "datum['rank'] < top"
          }
        ]    
      },
      {
        "name": "forLegend",
        "source": "ranks",
        "transform": [
    {
            "type": "filter", "expr": "datum['rank'] < top"
          }
        ]
      }
  
    ],
    "scales": [
      {
        "name": "x",
        "type": "utc",
        "domain": {"data": "rankedCovid", "field": "utcyearmonthdate_Date"},
        "range": [0, {"signal": "width"}]
      },
      {
        "name": "ylin",
        "type": "linear",
        "domain": {"data": "rankedCovid", "field": "Value"},
        "range": [{"signal": "height"}, 0],
        "nice": true,
        "zero": true
      },
      {
        "name": "y",
        "type": "log",
        "base": 10,
        "domain": {"data": "rankedCovid", "field": "Value"},
        "range": [0, {"signal": "height"}],
        "nice": true
      },
      {
        "name": "z",
        "type": "linear",        
        "domain": {"data": "forLegend", "field": "rank"},
        "range": [0, {"signal": "height"}]        
      },
      {
        "name": "color",
        "type": "ordinal",
        "domain": {"data": "forLegend", "field": "fips"},
        "sort": true,
        "range": "category"
      },
      {"name": "fipslookup",
        "type": "ordinal",
        "domain": {"data":"ranks", "field": "fips"},
        "range": {"data":"ranks", "field": "countystate"}
      }
    ],
    "axes": [
     

    ],
    "legends": [
      {
        "stroke": "color",
        "symbolType": "circle",
        "title": "fips",
        "encode": {
          "symbols": {
            "update": {"fill": {"value": "white"}, "opacity": {"value": 1}}
          },
          "labels": {
            "update": {
              "text": {"scale": "fipslookup", "field": "value"}
            }
          }
        },
  
        "labelFontSize": {"value": 18}
      }
    ],
    "title": {
      "text": {"signal": "'Log Plot of Covid-19 Trends in top ' + top + ' Statewide Cases'"},
      "subtitle": {"signal": "axislabel"},
      "subtitleFontSize": 16,
      "fontSize": 20
  
    },
    "marks": [
      {
        "type": "group",
        "from": {
          "facet": {"name": "series", "data": "rankedCovid", "groupby": "fips"}
        },
        "marks": [
          {
            "name": "linemarks",
            "type": "line",
            "style": ["line"],
            "sort": {"field": "datum[\"utcyearmonthdate_Date\"]"},
            "from": {"data": "series"},
            "encode": {
              "update": {
                "tooltip": {
                  "signal": "{\"Date (year-month-date)\": timeFormat(datum[\"utcyearmonthdate_Date\"], timeUnitSpecifier([\"year\",\"month\",\"date\"], {\"year-month\":\"%b %Y \",\"year-month-date\":\"%b %d, %Y \"})), \"Value\": format(datum[\"Value\"], \"\"), \"StateName\": ''+scale('fipslookup',datum[\"fips\"])}"
                },
                "stroke": {"scale": "color", "field": "fips"},
                "strokeWidth": {"value":5},
                "x": {"scale": "x", "field": "utcyearmonthdate_Date"},
                "y": {"scale": "y", "field": "Value"},
//                "z": {"scale": "z", "field": "rank"}
              }
            }
          },
          {
            "name": "areamarks",
            "type": "area",
            "style": ["area"],
            "sort": {"field": "datum[\"utcyearmonthdate_Date\"]"},
            "from": {"data": "series"},
            "encode": {
              "update": {
                "tooltip": {
                  "signal": "{\"Date (year-month-date)\": timeFormat(datum[\"utcyearmonthdate_Date\"], timeUnitSpecifier([\"year\",\"month\",\"date\"], {\"year-month\":\"%b %Y \",\"year-month-date\":\"%b %d, %Y \"})), \"Value\": format(datum[\"Value\"], \"\"), \"StateName\": ''+scale('fipslookup',datum[\"fips\"])}"
                },
                "stroke": {"scale": "color", "field": "fips"},
                "fill": {"scale": "color", "field": "fips"},
                "x": {"scale": "x", "field": "utcyearmonthdate_Date"},
                "y": {"scale": "y", "field": "Value"},                
//                "z": {"scale": "z", "field": "rank"},
//                "x2": {"scale": "x", "field": "utcyearmonthdate_Date"},
                "y2": {"signal" : "0.5 * scale('y', datum.Value)"},                
//                "z2": {"scale": "z", "field": "rank"},
                
              }
            }
          },
          {
            "name": "pointmarks",
            "type": "rect",
            "from": {"data": "series"},
            "encode": {
              "update": {
                "opacity": {"value": 1},
                "fill": {"scale": "color", "field": "fips"},
                "tooltip": {
                  "signal": "{\"Date (year-month-date)\": timeFormat(datum[\"utcyearmonthdate_Date\"], timeUnitSpecifier([\"year\",\"month\",\"date\"], {\"year-month\":\"%b %Y \",\"year-month-date\":\"%b %d, %Y \"})), \"\": which+format(datum[\"Value\"], \"\"), \"state\": ''+scale('fipslookup',datum[\"fips\"])}"
                },
                "stroke": {"value": "black"},
                "x": {"scale": "x", "field": "utcyearmonthdate_Date"},
                "y": {"scale": "y", "field": "Value"},
//                "z": {"scale": "z", "field": "rank"},
  "width": {"value": 5},
  "height": {"value": 5},
//  "depth": {"value": 5}
  
              }
            }
          }
        ]
      }
    ]
  };
/* eslint-enable */

class SpecRenderer  {
  viewType = '3d';
  spec = initspec;
  view =  null; 
  
  public toggleView() {
    if (this.viewType === '3d') {
      this.viewType = '2d';
    } else {
      this.viewType = '3d';
    }
    this.getText('text1');
  }

  public getText(textId)  {
    var textarea = document.getElementById(textId) as any;
    var text = textarea.value;
    var errorDiv = document.getElementById('error');
    var splitRight = document.getElementById('vis');
    try {
        var spec = JSON.parse(text);
        splitRight.style.opacity = '1';
        errorDiv.style.display = 'none';
        this.update(spec);
    }
    catch (e) {
        errorDiv.innerText = e;
        errorDiv.style.display = '';
        splitRight.style.opacity = '0.1';
    }
  }

  public update(spec:any) {
    // stash the view
    if (this.view != null) {
      const deckglviewstate = this.view.presenter.deckgl.viewState;
      console.log("deckglviewstate",deckglviewstate);      
    }
    this.view = new VegaDeckGl.ViewGl(vega.parse(spec), {  getView: () => {return this.viewType as any}, presenterConfig: {onTargetViewState: (height,width)=>{return({height,width,newViewStateTarget:false }) } }} )
    .renderer('deck.gl')
    .initialize(document.querySelector('#vis'));
    console.log("vegadeckglview", this.view);
    this.view.run();
    
    // this.viewer.vegaViewGl.runAsync().then(() => {
    //   this.discardColorContextUpdates = true;
    //   this.newViewStateTarget = undefined;
    //   this.props.onSignalChanged && this.props.onSignalChanged();
  // });
  //this.view = new VegaDeckGl.ViewGl(vega.parse(spec), {  getView: () => {return this.viewType as any}, presenterConfig: {onTargetViewState: (height,width)=>{return(null)}}})
  }
}


export const specRenderer = new SpecRenderer();