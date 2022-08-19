/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { base } from '../base';
import { Group } from '../controls/group';
import { KeyCodes } from '../keycodes';
import { strings } from '../language';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { SandDance, util } from '@msrvida/sanddance-react';
import { Explorer_Class } from '../explorer';

export interface HistoricInsight extends SandDance.specs.Insight {
    rebaseFilter?: boolean;
    setup?: SandDance.types.Setup;
}

export interface HistoryAction {
    insert?: boolean;
    omit?: boolean;
    label: string;
}

export interface HistoryItem {
    label: string;
    historicInsight: Partial<HistoricInsight>;
}

export interface Props {
    disabled?: boolean;
    themePalette: Partial<FluentUITypes.IPalette>;
    historyIndex: number;
    historyItems: HistoryItem[];
    redo: (historyIndex: number) => void;
    explorer: Explorer_Class;
}

export function History(props: Props) {
    return (
        <Group label={strings.labelHistory} className="sanddance-history">
            <ol>
                {props.historyItems.map((hi, i) => {
                    let ref: React.RefObject<FluentUITypes.IButton>;
                    if (i === props.historyIndex) {
                        ref = base.react.createRef<FluentUITypes.IButton>();
                        props.explorer.dialogFocusHandler.focus = () => {
                            ref.current?.focus();
                        };
                    }
                    return (
                        <li
                            key={i}
                            className={util.classList(i === props.historyIndex && 'selected')}
                            onKeyUp={e => {
                                if (e.keyCode === KeyCodes.ENTER) {
                                    props.redo(i);
                                }
                            }}
                        >
                            <base.fluentUI.DefaultButton
                                className='sanddance-history-button'
                                componentRef={ref}
                                text={hi.label}
                                onClick={() => props.redo(i)}
                            />
                        </li>
                    );
                })}
            </ol>
        </Group>
    );
}

export function getPureInsight(historicInsight: HistoricInsight) {
    const { colorBin, columns, directColor, facetStyle, filter, hideAxes, hideLegend, scheme, signalValues, size, totalStyle, transform, chart, view } = historicInsight;
    const insight: SandDance.specs.Insight = {
        colorBin,
        columns,
        directColor,
        facetStyle,
        filter,
        hideAxes,
        hideLegend,
        scheme,
        signalValues,
        size,
        totalStyle,
        transform,
        chart,
        view,
    };
    return insight;
}

export function replay(historyItems: HistoryItem[], index: number): Partial<HistoricInsight> {
    let filter: SandDance.searchExpression.Search = null;
    let historicInsight: Partial<HistoricInsight> = {};
    for (let i = 0; i < index + 1; i++) {
        const historyItem = historyItems[i];
        if (historyItem) {
            if (historyItem.historicInsight.filter === null) {
                filter = null;
            } else if (historyItem.historicInsight.rebaseFilter) {
                filter = historyItem.historicInsight.filter;
            } else if (historyItem.historicInsight.filter) {
                filter = SandDance.searchExpression.narrow(filter, historyItem.historicInsight.filter);
            }
            historicInsight = { ...historicInsight, ...historyItem.historicInsight };
        }
    }
    return { ...historicInsight, filter };
}
