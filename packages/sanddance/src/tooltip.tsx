/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { GL_ORDINAL } from './constants';
import { isInternalFieldName } from './util';
import { TooltipOptions } from './types';

const { outerSize } = VegaDeckGl.util;
const { Table } = VegaDeckGl.controls;

interface Props {
    cssPrefix: string;
    options: TooltipOptions;
    item: object;
    position?: { clientX: number; clientY: number };
}

interface RenderProps {
    cssPrefix: string;
    rows: VegaDeckGl.controls.TableRow[];
}

export class Tooltip {
    private element: HTMLElement;
    private child: HTMLElement;

    constructor(props: Props) {
        const renderProps: RenderProps = {
            cssPrefix: props.cssPrefix,
            rows: getRows(props.item, props.options),
        };
        this.element = renderTooltip(renderProps) as any as HTMLElement;
        if (this.element) {
            this.element.style.position = 'absolute';
            this.child = this.element.firstChild as HTMLElement;
            document.body.appendChild(this.element);
            //measure and move as necessary
            let m = outerSize(this.child);
            while (m.height > document.documentElement.clientHeight) {
                const tr = this.child.querySelector('tr:last-child') as HTMLTableRowElement;
                if (tr) {
                    tr.parentElement.removeChild(tr);
                } else {
                    break;
                }
                m = outerSize(this.child);
            }
            if (props.position.clientX + m.width >= document.documentElement.clientWidth) {
                this.child.style.right = '0';
            }
            let moveTop = true;
            if (props.position.clientY + m.height >= document.documentElement.clientHeight) {
                if (props.position.clientY - m.height > 0) {
                    this.child.style.bottom = '0';
                } else {
                    moveTop = false;
                }
            }
            if (moveTop) {
                this.element.style.top = `${props.position.clientY}px`;
            }
            this.element.style.left = `${props.position.clientX}px`;
        }
    }

    finalize() {
        if (this.element) {
            document.body.removeChild(this.element);
        }
        this.element = null;
    }
}

function getRows(item: object, options: TooltipOptions) {
    const rows: VegaDeckGl.controls.TableRow[] = [];
    for (const columnName in item) {
        if (columnName === GL_ORDINAL) {
            continue;
        }
        if (isInternalFieldName(columnName)) {
            continue;
        }
        if (options && options.exclude) {
            if (options.exclude(columnName)) {
                continue;
            }
        }
        const value: any = item[columnName];
        let content: string | JSX.Element;
        if (options && options.displayValue) {
            content = options.displayValue(value);
        } else {
            switch (value) {
                case null:
                    content = <i>null</i>;
                    break;
                case undefined:
                    content = <i>undefined</i>;
                    break;
                default:
                    content = value.toString();
            }
        }
        rows.push({
            cells: [
                { content: columnName + ':' },
                { content },
            ],
        });
    }
    return rows;
}

const renderTooltip = (props: RenderProps) => {
    return props.rows.length === 0 ? null : (
        <div className={`${props.cssPrefix}tooltip`}>
            {Table({ rows: props.rows })}
        </div>
    );
};
