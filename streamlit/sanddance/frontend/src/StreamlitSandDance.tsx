import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import { Explorer, Props as ExplorerProps, SandDance } from "@msrvida/sanddance-explorer";

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

  public render = (): ReactNode => {
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. Here, we access the "name" arg.
    const records: object[] = this.props.args["records"]

    const getPartialInsight: (columns: SandDance.types.Column[]) => Partial<SandDance.specs.Insight> = (columns) => {
      return this.props.args["insight"] || {};
    };

    const explorerProps: ExplorerProps = {
      compactUI: true,
      mounted: e => {
        e.load(records, getPartialInsight)
      },
      theme: this.props.theme?.base === "dark" ? 'dark-theme' : '',
      ...this.props.args["explorerProps"]
    };

    return (
      <Explorer
        {...explorerProps}
      />
    )
  }

}

export default withStreamlitConnection(StreamlitSandDance)
