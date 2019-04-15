// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
module powerbi.extensibility.visual {
    export var messages = {
        selectData: 'please select data fields',
        noData: 'Data does not contain rows or columns',
        chartErrors: (errors: string[]) => `This chart encountered these errors: <ul>${errors.reduce((prev, curr) => `${prev}<li>${curr}</li>`, '')}</ul>`
    }
}