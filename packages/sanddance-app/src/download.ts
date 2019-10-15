// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { DataFileType } from '@msrvida/sanddance-explorer';

//To do: download csv, json, or tsv
export function downloadData(data: any, datatype: DataFileType, displayName: string) {
    var re = /.(csv|tsv|json|topojson)/;
    var filename = displayName.replace(re, '') + '.' + datatype;

    // Adapted from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
    var element = document.createElement('a');
    //element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(String(data)));
    element.setAttribute('download', filename);
    element.setAttribute('style', 'position:fixed;top:0;left: 0;z-index:9;background:pink');
    element.innerText = 'download';
    //element.style.display = 'none';
    document.body.appendChild(element);

    dataURIToBlob(data, blob => {
        element.href = URL.createObjectURL(blob);
        console.log(element.href);
        // you must revoke the object URL, 
        //   but since we can't know when the download occured, we have to attach it on the click handler..
        element.onclick = function () {
            // ..and to wait a frame
            requestAnimationFrame(function () {
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
        console.log(e);
    }
}
