// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataExportType } from '@msrvida/sanddance-explorer';

//To do: download csv, json, or tsv
export function downloadData(data: any, exportType: DataExportType, fileName: string) {

    // Adapted from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
    var element = document.createElement('a');
    element.setAttribute('download', `${fileName}.${exportType}`);
    document.body.appendChild(element);

    dataURIToBlob(data, blob => {
        element.href = URL.createObjectURL(blob);
        // we must revoke the object URL, 
        // since we can't know when the download occured, we have to attach it on the click handler..
        element.onclick = () => {
            // ..and to wait a frame
            requestAnimationFrame(() => {
                URL.revokeObjectURL(element.href);
            });
            document.body.removeChild(element);
        };
        element.click();
    });
}

//from https://stackoverflow.com/a/37151835/620501
function dataURIToBlob(binStr: string, callback: (blob: Blob) => void) {
    try {
        var len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr]));
    }
    catch (e) {
        //noop
    }
}
