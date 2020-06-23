import { DOMWidgetModel, DOMWidgetView, ISerializers } from '@jupyter-widgets/base';
import { MODULE_NAME, MODULE_VERSION } from './version';

import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from '@luma.gl/core';
import { fluentUI } from './fluentUIComponents';
import * as vega from 'vega';
import { Explorer, SandDance, use, Explorer_Class } from '@msrvida/sanddance-explorer';
import ReactDOM from 'react-dom';
import React from 'react';

import '../css/tweak.css';
import '@msrvida/sanddance-explorer/dist/css/sanddance-explorer.css';

use(fluentUI, React as any, ReactDOM, vega, deck as any, layers, luma);

export class SandDanceModel extends DOMWidgetModel {
    defaults() {
        return {
            ...super.defaults(),
            _model_name: SandDanceModel.model_name,
            _model_module: SandDanceModel.model_module,
            _model_module_version: SandDanceModel.model_module_version,
            _view_name: SandDanceModel.view_name,
            _view_module: SandDanceModel.view_module,
            _view_module_version: SandDanceModel.view_module_version,
            data : '[]',
            width : '100%',
            heigth : '60vh',
            snapshots: [],
        };
    }

  static serializers: ISerializers = {
      ...DOMWidgetModel.serializers,
  }

  static model_name = 'SandDanceModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'SandDanceView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}


export class SandDanceView extends DOMWidgetView {
  private explorer?: Explorer_Class
  private wrapper?: React.DetailedReactHTMLElement<any, HTMLElement>

  render () {
      const explorerProps = {
          logoClickUrl: 'https://microsoft.github.io/SandDance/',
          compactUI: true,
          mounted: (explorer: Explorer_Class) => {
              this.explorer = explorer;

              // restore previous snapshots
              const snapshots = this.model.get('snapshots');
              this.explorer.setState({snapshots});

              this.model.on('change:data', this.data_changed, this);

              // TODO
              // avoid error
              // LAYER_TEXT-characters-program  Bad uniform project_uViewProjectionMatrix
              setTimeout(() => {
                  this.data_changed();
              }, 0);
          },
          snapshotProps: {
              getTopActions: (snapshots: SandDance.types.Snapshot[]) => {
                  const items = [
                      {
                          key: 'saveAsWidgetState',
                          text: 'Save as Widget State',
                          disabled: snapshots.length === 0,
                          onClick: () => this.saveSnapshots(snapshots),
                      },
                  ];
                  return items;
              }
          },
          key: 'explorer-key'
      };

      this.wrapper = React.createElement(
          'div',
          {
              style: {
                  width: this.model.get('width'),
                  height: this.model.get('height'),
              }
          },
          [React.createElement(Explorer, explorerProps)],
      );

      ReactDOM.render(this.wrapper, this.el);

      this.model.on('change:width', this.size_changed, this);
      this.model.on('change:height', this.size_changed, this);
  }

  private saveSnapshots (snapshots: SandDance.types.Snapshot[]) {
      this.model.set('snapshots', snapshots);
      this.model.save_changes();
  }

  size_changed () {
      if (!this.wrapper) {
          return;
      }

      const style = {
          width: this.model.get('width'),
          height: this.model.get('height'),
      };
      this.wrapper.props.style = style;
  }

  data_changed () {
      if (!this.explorer) {
          return;
      }

      this.explorer.load(JSON.parse(this.model.get('data')));
  }
}
