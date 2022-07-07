/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as SandDance from '@msrvida/sanddance';

//TODO: languages other than english
const longitudeNames = ['lon', 'long', 'longitude'];
const latitudeNames = ['lat', 'latitude'];

function isSpec(names: string[], limits: [number, number], column: SandDance.types.Column, data?: object[]) {
    let is = false;
    const cname = column.name.toLowerCase();
    for (let i = 0; i < names.length; i++) {
        if (names[i] === cname) {
            is = true;
            break;
        }
    }
    if (data) {
        //TODO: spin through data to see if it is within limits
    }
    return is;
}

export function isLongitude(column: SandDance.types.Column, data?: object[]) {
    return isSpec(longitudeNames, [-180, 180], column, data);
}

export function isLatitude(column: SandDance.types.Column, data?: object[]) {
    return isSpec(latitudeNames, [-90, 90], column, data);
}

export function isGeo(column: SandDance.types.Column, data?: object[]) {
    return isLatitude(column, data) || isLongitude(column, data);
}
