// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

export function downloadData(data: any, fileName: string) {

    // Adapted from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
    var a = document.createElement('a');
    a.setAttribute('download', fileName);
    document.body.appendChild(a);

    const blob = dataURIToBlob(data);
    a.href = URL.createObjectURL(blob);
    // we must revoke the object URL, 
    // since we can't know when the download occured, we have to attach it on the click handler..
    a.onclick = () => {
        // ..and to wait a frame
        requestAnimationFrame(() => URL.revokeObjectURL(a.href));
        document.body.removeChild(a);
    };
    a.click();
}

//from https://stackoverflow.com/a/37151835/620501
function dataURIToBlob(binStr: string) {
    var len = binStr.length,
        arr = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }

    return new Blob([arr]);
}
