/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { createElement, StatelessComponent, StatelessProps } from 'tsx-create-element';

export interface TableCell {
    className?: string;
    content: string | JSX.Element;
    title?: string;
}

export interface TableRow {
    cells: TableCell[];
}

export interface TableProps {
    className?: string;
    onRowClick?: (e: Event, index: number) => void;
    rows: TableRow[];
    rowClassName?: string;
}

const KeyCodes = {
    ENTER: 'Enter',
};

export const Table: StatelessComponent<TableProps> = (props: StatelessProps<TableProps>) => {
    return (
        <table className={props.className}>
            {props.children}
            {props.rows.map((row, i) => (
                <tr
                    className={props.rowClassName || ''}
                    onClick={e => props.onRowClick && props.onRowClick(e as any as MouseEvent, i)}
                    tabIndex={props.onRowClick ? 0 : -1}
                    onKeyUp={e => {
                        if (e.key === KeyCodes.ENTER && props.onRowClick) {
                            props.onRowClick(e as any as KeyboardEvent, i);
                        }
                    }}
                >
                    {row.cells.map((cell, i) => (
                        <td
                            className={cell.className || ''}
                            title={cell.title || ''}
                        >{cell.content}</td>
                    ))}
                </tr>
            ))}
        </table>
    );
};
