// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as vega from 'vega';
import * as VegaMorphCharts from '@msrvida/vega-morphcharts';

VegaMorphCharts.use(vega);

class SpecRenderer {
  viewType = '2d';
  spec = null;
  view = null;

  constructor() {
    const json = localStorage.getItem('spec');
    if (json) {
      this.getTextArea().value = json;
    }
  }

  public toggleView() {
    if (this.viewType === '3d') {
      this.viewType = '2d';
    } else {
      this.viewType = '3d';
    }
    this.getText();
  }

  public getTextArea() {
    return <HTMLTextAreaElement>document.getElementsByTagName('textarea')[0];
  }

  public getText() {
    var textarea = this.getTextArea();
    var text = textarea.value;
    var errorDiv = document.getElementById('error');
    var splitRight = document.getElementById('vis');
    try {
      var spec = JSON.parse(text);
      splitRight.style.opacity = '1';
      errorDiv.style.display = 'none';
      this.update(spec, text);
    }
    catch (e) {
      errorDiv.innerText = e;
      errorDiv.style.display = '';
      splitRight.style.opacity = '0.1';
    }
  }

  public update(spec: any, json: string) {

    // stash the view
    if (this.view != null) {
      //const deckglviewstate = this.view.presenter.deckgl.viewState;
    }
    const runtime = vega.parse(spec);

    //save in local storage
    localStorage.setItem('spec', json);

    this.view = new VegaMorphCharts.ViewGl(
      runtime,
      {
        getView: () => {
          return this.viewType as any
        },
        presenterConfig: {
          onTargetViewState: (height, width) => {
            return { height, width, newViewStateTarget: false };
          }
        }
      })
      .renderer('morphcharts')
      .initialize(document.querySelector('#vis'));
    this.view.run();
  }
}

const specRenderer = new SpecRenderer();

window['vegaTest'] = {
  vega,
  specRenderer,
};
