/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import React from "react"
import ReactDOM from "react-dom"
import StreamlitSandDance from "./StreamlitSandDance"
import { use } from "@msrvida/sanddance-explorer";
import { fluentUI } from './fluentUIComponents';
import * as vega from 'vega';

use(fluentUI, React as any, ReactDOM as any, vega as any);

ReactDOM.render(
  <React.StrictMode>
    <StreamlitSandDance />
  </React.StrictMode>,
  document.getElementById("root")
)
