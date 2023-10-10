import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import { Explorer, Explorer_Class, getColorSettingsFromThemePalette, Props as ExplorerProps, SandDance, themePalettes, ViewerOptions } from "@msrvida/sanddance-explorer";
import { fluentUI } from './fluentUIComponents';

import "@msrvida/sanddance-explorer/dist/css/sanddance-explorer.css"
import "./StreamlitSandDance.css"

interface State {
  numClicks: number
}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class StreamlitSandDance extends StreamlitComponentBase<State> {
  public state: State = { numClicks: 0 }

  private _explorer: Explorer_Class | undefined = undefined;

  public componentWillUnmount = (): void => {
    this._explorer = undefined;
  };

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const records: object[] = this.props.args["records"]
    const theme = this.props.theme?.base === "dark" ? 'dark-theme' : '';

    const getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.specs.Insight> = (columns) => {
      return this.props.args["insight"] || {};
    };

    fluentUI.loadTheme({ palette: themePalettes[theme] });

    const viewerOptions = getViewerOptions(theme, this.props.args["explorerProps"]?.viewerOptions);

    const explorerProps: ExplorerProps = {
      compactUI: true,
      mounted: e => {
        this._explorer = e;
        e.load(records, getPartialInsight)
      },
      theme: this.props.theme?.base === "dark" ? 'dark-theme' : '',
      ...this.props.args["explorerProps"],
      viewerOptions,
    };

    return (
      <Explorer
        {...explorerProps}
      />
    )
  }

}

export default withStreamlitConnection(StreamlitSandDance)

function getViewerOptions(theme: string, viewerOptions: Partial<SandDance.types.ViewerOptions>): Partial<ViewerOptions> {
  return {
    ...viewerOptions,
    colors: getColorSettingsFromThemePalette(themePalettes[theme]),
  };
}