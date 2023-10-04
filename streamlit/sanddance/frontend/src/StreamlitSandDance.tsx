import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
  ArrowTable
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import { convertArrowTableToRows } from "./arrow"
import { Explorer, Explorer_Class, use } from "@msrvida/sanddance-explorer";

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
    const df: ArrowTable = this.props.args["df"]
    const df2 = convertArrowTableToRows(df)

    console.log('df', df)
    console.log('df2', df2)


    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {}

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {
      // Use the theme object to style our button border. Alternatively, the
      // theme style is defined in CSS vars.
    }

    // Show a button and some text.
    // When the button is clicked, we'll increment our "numClicks" state
    // variable, and send its new value back to Streamlit, where it'll
    // be available to the Python program.
    return (
      <Explorer
      
        mounted={e => {
          e.load(df2)
        }}
      />
    )
  }

  /** Click handler for our "Click Me!" button. */
  private onClicked = (): void => {
    // Increment state.numClicks, and pass the new value back to
    // Streamlit via `Streamlit.setComponentValue`.
    this.setState(
      prevState => ({ numClicks: prevState.numClicks + 1 }),
      () => Streamlit.setComponentValue(this.state.numClicks)
    )
  }

}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(StreamlitSandDance)
