/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { SandDance } from '@msrvida/sanddance-react';

export interface Props {
    allColumns: SandDance.types.Column[];
    exclusions: string[];
    toggleExclusion: (columnName: string) => void;
}

export function ToggleColumns(props: Props) {
    return (
        <div>
            {props.allColumns.map((c, i) => (
                <div key={c.name}>
                    <label>
                        <base.fluentUI.Toggle
                            checked={props.exclusions.indexOf(c.name) < 0}
                            inlineLabel={true}
                            label={c.name}
                            onChange={() => props.toggleExclusion(c.name)}
                        />
                    </label>
                </div>
            ))}
        </div>
    );
}
