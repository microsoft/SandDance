/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import * as VegaMorphCharts from '@msrvida/vega-morphcharts';
import { GL_ORDINAL } from './constants';
import { isInternalFieldName } from './util';
import { TooltipCreateOptions, TooltipDestroyable } from './types';

const { outerSize } = VegaMorphCharts.util;
const { Table } = VegaMorphCharts.controls;

interface Props extends TooltipCreateOptions {
    cssPrefix: string;
}

interface RenderProps {
    cssPrefix: string;
    rows: VegaMorphCharts.controls.TableRow[];
}

export class Tooltip implements TooltipDestroyable {
    private element: HTMLElement;
    private child: HTMLElement;
    private finalizeHandler: () => void;

    constructor(private props: Props) {
        const renderProps: RenderProps = {
            cssPrefix: props.cssPrefix,
            rows: getRows(props.dataItem),
        };
        this.finalizeHandler = () => this.destroy();
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
            let position: { clientX: number, clientY: number };
            const te = props.event as TouchEvent;
            if (te.touches) {
                position = te[0];
            } else {
                const pme = props.event as MouseEvent | PointerEvent;
                position = pme;
            }

            if (position.clientX + m.width >= document.documentElement.clientWidth) {
                this.child.style.right = '0';
            }
            let moveTop = true;
            if (position.clientY + m.height >= document.documentElement.clientHeight) {
                if (position.clientY - m.height > 0) {
                    this.child.style.bottom = '0';
                } else {
                    moveTop = false;
                }
            }
            if (moveTop) {
                this.element.style.top = `${position.clientY}px`;
            }
            this.element.style.left = `${position.clientX}px`;
            this.child.addEventListener('mouseenter', this.finalizeHandler);
            this.child.addEventListener('mousemove', this.finalizeHandler);
            this.child.addEventListener('mouseover', this.finalizeHandler);
        }
    }

    destroy() {
        this.child.removeEventListener('mouseenter', this.finalizeHandler);
        this.child.removeEventListener('mousemove', this.finalizeHandler);
        this.child.removeEventListener('mouseover', this.finalizeHandler);
        if (this.element) {
            document.body.removeChild(this.element);
        }
        this.element = null;
    }
}

export function cleanDataItem(item: object) {
    const ret: object = {};
    for (const columnName in item) {
        if (columnName === GL_ORDINAL) {
            continue;
        }
        if (isInternalFieldName(columnName)) {
            continue;
        }
        ret[columnName] = item[columnName];
    }
    return ret;
}

function getRows(item: object) {
    const rows: VegaMorphCharts.controls.TableRow[] = [];
    for (const columnName in item) {
        const value: any = item[columnName];
        let content: string | JSX.Element;
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
        //}
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
