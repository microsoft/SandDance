// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Scopes } from '../interfaces';
import { SpecContext } from '../types';

export interface UnitLayoutProps {
}

export class UnitLayout {
    constructor(public props: UnitLayoutProps & Scopes) {

    }

    public build(specContext: SpecContext) {
        const { dataName, scope } = this.props.parent;

        scope.data = [
            {
                "name": "list",
                "source": dataName,
                "transform": [
                    {
                        "type": "window",
                        "ops": ["row_number"],
                        "as": ["row_number"]
                    },
                    {
                        "type": "formula",
                        "expr": "datum.row_number*0.2",
                        "as": "y"
                    }
                ]
            }
        ];

        scope.marks = [
            {
                "type": "text",
                "from": { "data": "list" },
                "encode": {
                    "enter": {
                        "text": {
                            "field": "Name"
                        },
                        "y": {
                            "field": "y"
                        }
                    }
                }
            }
        ];

    }

}
