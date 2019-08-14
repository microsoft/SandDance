// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { className } from './vega-deck.gl/panel';
import { createElement } from 'tsx-create-element';
import { FieldNames } from './constants';
import { GL_ORDINAL } from './vega-deck.gl/constants';
import { Presenter, PresenterElement } from './vega-deck.gl';

export interface TooltipOptions {
    exclude: (columnName: string) => boolean;
}

interface Props {
    presenter: Presenter;
    options: TooltipOptions;
    item: object;
    position?: { clientX: number; clientY: number };
}

export class Tooltip {
    private element: HTMLElement;
    private child: HTMLElement;

    constructor(props: Props) {
        this.element = renderTooltip(props) as any as HTMLElement;
        if (this.element) {
            this.element.style.position = 'absolute';
            this.child = this.element.firstChild as HTMLElement;
            document.body.appendChild(this.element);
            //measure and move is necessary
            const m = this.measure();
            if (props.position.clientX + m.width >= document.body.offsetWidth) {
                this.child.style.right = '0';
            }
            if (props.position.clientY + m.height >= document.body.offsetHeight) {
                this.child.style.bottom = '0';
            }
            this.element.style.left = `${props.position.clientX}px`;
            this.element.style.top = `${props.position.clientY}px`;
        }
    }

    private measure() {
        const cs = getComputedStyle(this.child);
        const height = parseFloat(cs.marginTop) + parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth) + this.child.offsetHeight + parseFloat(cs.borderBottomWidth) + parseFloat(cs.paddingBottom) + parseFloat(cs.marginBottom);
        const width = parseFloat(cs.marginLeft) + parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth) + this.child.offsetWidth + parseFloat(cs.borderRightWidth) + parseFloat(cs.paddingRight) + parseFloat(cs.marginRight);
        return { height, width };
    }

    clear() {
        if (this.element) {
            document.body.removeChild(this.element);
        }
        this.element = null;
    }
}

interface NameValuePair {
    columnName: string;
    value: any;
}

const renderTooltip = (props: Props) => {
    const nameValuePairs: NameValuePair[] = [];
    for (let columnName in props.item) {
        switch (columnName) {
            case FieldNames.Active:
            case FieldNames.Collapsed:
            case FieldNames.Selected:
            case GL_ORDINAL:
                continue;
            default:
                if (props.options && props.options.exclude) {
                    if (props.options.exclude(columnName)) {
                        continue;
                    }
                }
                nameValuePairs.push({
                    columnName,
                    value: props.item[columnName]
                });
        }
    }
    return nameValuePairs.length === 0 ? null : (
        <div className={className(PresenterElement.tooltip, props.presenter)}>
            <table>
                <tbody>
                    {nameValuePairs.map(row => (
                        <tr>
                            <td>{row.columnName}:</td>
                            <td>{row.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
