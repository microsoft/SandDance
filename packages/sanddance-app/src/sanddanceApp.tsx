// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from './base';
import { DataSource, DataSourceSnapshot, InsightMap } from './types';
import { DataSourcePicker } from './dataSourcePicker';

import {
  Explorer,
  Prefs,
  SandDance,
  Snapshot,
  themePalettes
} from '@msrvida/sanddance-explorer';
import { strings } from './language';
//import { DataExportPicker } from '@msrvida/sanddance-explorer/src/dataExporter';

export interface Props {
  themeColors: { [theme: string]: SandDance.types.ColorSettings };
  setTheme?: (darkTheme: boolean) => void;
  darkTheme?: boolean;
  dataSources: DataSource[];
  mounted?: (app: SandDanceApp) => void;
  insights?: InsightMap;
  initialPrefs?: { [dataSetId: string]: Prefs };
}

export interface State {
  dataSource: DataSource;
  darkTheme: boolean;
}

const { VegaDeckGl } = SandDance;

function getViewerOptions(darkTheme: boolean, themeColors: { [theme: string]: SandDance.types.ColorSettings }) {
  const colors = themeColors && themeColors[darkTheme ? 'dark' : 'light'];
  const color = SandDance.VegaDeckGl.util.colorFromString(darkTheme ? "#fff" : "#000");
  const viewerOptions: Partial<SandDance.types.ViewerOptions> = {
    colors: {
      axisLine: color,
      axisText: color,
      hoveredCube: color,
      ...colors
    }
  };
  return viewerOptions;
}

function getSnapshotFromHash() {
  const hash = document.location.hash && document.location.hash.substring(1);
  if (hash) {
    try {
      return JSON.parse(decodeURIComponent(hash)) as DataSourceSnapshot;
    }
    catch (e) { }
  }
}

export function serializeSnapshot(snapshotWithImage: Snapshot) {
  const snapshot = SandDance.VegaDeckGl.util.clone(snapshotWithImage) as DataSourceSnapshot;
  //remove the image data from the snapshot
  delete snapshot.bgColor;
  delete snapshot.image;
  delete snapshot.dataSource.rawText;
  return JSON.stringify(snapshot);
}

let snapshotOnLoad = getSnapshotFromHash();
if (snapshotOnLoad && snapshotOnLoad.dataSource.dataSourceType === 'local') {
  snapshotOnLoad = null;
}

interface Handlers {
  hashchange: (e: HashChangeEvent) => void;
  resize: (e: UIEvent) => void;
}
export class SandDanceApp extends React.Component<Props, State> {
  private viewerOptions: Partial<SandDance.types.ViewerOptions>;
  private handlers: Handlers;
  public explorer: Explorer;

  constructor(props: Props) {
    super(props);
    this.state = {
      dataSource: snapshotOnLoad && snapshotOnLoad.dataSource || props.dataSources[0],
      darkTheme: props.darkTheme
    };
    this.viewerOptions = getViewerOptions(this.state.darkTheme, props.themeColors);
    this.handlers = {
      hashchange: e => {
        const snapshot = getSnapshotFromHash();
        if (snapshot) {
          this.explorer && this.explorer.calculate(() => this.hydrateSnapshot(snapshot));
        }
      },
      resize: e => {
        this.explorer && this.explorer.resize();
      }
    };
    this.wireEventHandlers(true);
    this.changeColorScheme(this.state.darkTheme);
  }

  private wireEventHandlers(add: boolean) {
    for (let key in this.handlers) {
      if (add) {
        window.addEventListener(key, this.handlers[key]);
      } else {
        window.removeEventListener(key, this.handlers[key]);
      }
    }
  }

  private hydrateSnapshot(snapshot: DataSourceSnapshot) {
    if (snapshot.dataSource.id === this.state.dataSource.id) {
      this.explorer.setInsight(snapshot.insight);
    }
    else {
      if (snapshot.dataSource.dataSourceType !== 'local') {
        this.load(snapshot.dataSource, snapshot.insight);
      }
      //this.setState({ snapshots: this.state.snapshots.filter(snapshot => snapshot.dataSource.dataSourceType !== 'local') });
    }
  }

  load(dataSource: DataSource, partialInsight?: Partial<SandDance.types.Insight>) {
    this.setState({ dataSource });
    document.title = `SandDance - ${dataSource.displayName}`;
    return this.explorer.load(
      dataSource,
      columns => {
        return partialInsight || (this.props.insights && this.props.insights[dataSource.id]);
      },
      this.props.initialPrefs && VegaDeckGl.util.deepMerge({}, this.props.initialPrefs['*'], this.props.initialPrefs[dataSource.id]));
  }

  //To do: download csv, json, or tsv
  private downloadData(data: any, datatype: string) {
    var re = /.(csv|tsv|json|topojson)/
    var filename = this.state.dataSource.displayName.replace(re, "") + "." + datatype;

    //https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(String(data)));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  updateExplorerViewerOptions(viewerOptions: Partial<SandDance.types.ViewerOptions>) {
    this.viewerOptions = viewerOptions;
    this.explorer && this.explorer.updateViewerOptions(this.viewerOptions);
  }

  getThemePalette(darkTheme: boolean) {
    const theme = darkTheme ? 'dark-theme' : '';
    return themePalettes[theme];
  }

  changeColorScheme(darkTheme: boolean) {
    this.updateExplorerViewerOptions(getViewerOptions(darkTheme, this.props.themeColors));
    VegaDeckGl.base.vega.scheme(SandDance.constants.ColorScaleNone, x => VegaDeckGl.util.colorToString(this.explorer.viewer.options.colors.defaultCube));
    this.explorer && this.explorer.viewer && this.explorer.viewer.render(this.explorer.viewer.insight, this.explorer.state.dataContent.data);
    base.fabric.loadTheme({ palette: this.getThemePalette(darkTheme) });
  }

  render() {
    const themePalette = this.getThemePalette(this.state.darkTheme);
    return (
      <section className="sanddance-app">
        <Explorer
          logoClickTarget="_self"
          theme={this.state.darkTheme && 'dark-theme'}
          snapshotProps={{
            modifySnapShot: (snapshot: DataSourceSnapshot) => {
              snapshot.dataSource = this.state.dataSource;
            },
            getActions: (snapshot: DataSourceSnapshot, i) => {
              const url = "#" + serializeSnapshot(snapshot);
              let element: JSX.Element;
              if (snapshot.dataSource.dataSourceType === 'local') {
                element = (<span>{strings.labelLocal}</span>);
              } else {
                element = (<a key={`link${i}`} href={url}>{strings.labelLink}</a>);
              }
              return [{ element }];
            },
            getDescription: insight => `${this.state.dataSource.displayName} ${insight.chart}`
          }}
          onSnapshotClick={(snapshot: DataSourceSnapshot) => this.hydrateSnapshot(snapshot)}
          initialView="2d"
          mounted={e => {
            this.explorer = e;
            this.load(this.state.dataSource, snapshotOnLoad && snapshotOnLoad.insight);
            this.props.mounted(this);
          }}
          datasetExportHandler={(data, datatype) => this.downloadData(data, datatype)}
          datasetElement={(
            <DataSourcePicker
              dataSource={this.state.dataSource}
              dataSources={this.props.dataSources}
              changeDataSource={ds => {
                document.location.hash = '';
                return this.load(ds);
              }}
            />

          )}
          topBarButtonProps={[
            {
              key: 'theme',
              text: this.state.darkTheme ? strings.buttonThemeLight : strings.buttonThemeDark,
              iconProps: {
                iconName: this.state.darkTheme ? "Sunny" : "ClearNight"
              },
              onClick: () => {
                const darkTheme = !this.state.darkTheme;
                this.props.setTheme && this.props.setTheme(darkTheme);
                this.setState({ darkTheme });
                this.changeColorScheme(darkTheme);
              }
            }
          ]}
          viewerOptions={this.viewerOptions}
        >
        </Explorer>
      </section >
    );
  }
}
