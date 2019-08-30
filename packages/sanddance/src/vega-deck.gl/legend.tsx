// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { createElement, StatelessComponent, StatelessProps } from 'tsx-create-element';
import { Legend, LegendRow, LegendRowSymbol } from './interfaces';
import { Table, TableRow } from './controls';

export interface LegendViewProps {
    legend: Legend;
    onClick: (e: Event, legend: Legend, clickedIndex: number) => void;
}

export const LegendView: StatelessComponent<LegendViewProps> = (props: StatelessProps<LegendViewProps>) => {
    const rows: TableRow[] = [];

    const addRow = (row: LegendRow, i: number) => {
        const fn = symbolMap[row.symbol.shape];
        let jsx: JSX.Element;
        if (fn) {
            jsx = fn(row.symbol);
        } else {
            jsx = <span>x</span>;
            //console.log(`need to render ${row.symbol.shape} symbol shape`);
        }
        rows.push({
            cells: [
                { className: 'symbol', content: jsx },
                { className: 'label', content: row.label, title: row.label }
            ]
        });
    };

    var sorted = Object.keys(props.legend.rows).sort((a, b) => +a - +b);
    sorted.forEach(i => addRow(props.legend.rows[i], +i));

    if (sorted.length) {
        return (
            <Table
                rows={rows}
                rowClassName="legend-row"
                onRowClick={(e, i) => props.onClick(e, props.legend, i)}
            >
                {props.legend.title !== void 0 && <tr onClick={e => props.onClick(e as any as MouseEvent, props.legend, null)} ><th colSpan={2}>{props.legend.title}</th></tr>}
            </Table>
        );
    }
}

const symbolMap: { [shape: string]: (symbol: LegendRowSymbol) => JSX.Element } = {

    'square': function (symbol: LegendRowSymbol) {
        return (
            <div style={{
                height: `${symbol.bounds.y2 - symbol.bounds.y1}px`,
                width: `${symbol.bounds.x2 - symbol.bounds.x1}px`,
                backgroundColor: symbol.fill,
                borderColor: symbol.fill
            }} />
        );
    }

};
