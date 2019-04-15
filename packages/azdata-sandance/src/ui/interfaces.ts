// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
interface Message {
    command: string;
    text?: string;
    dataFile?: SandDanceExplorer.DataFile;
}

interface VsCode {
    getState: () => any;
    postMessage(message: Message);
    setState: (state: any) => void;
}

declare function acquireVsCodeApi(): VsCode;
