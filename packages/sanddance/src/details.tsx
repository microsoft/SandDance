// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from '@msrvida/vega-deck.gl';
import { Animator } from './animator';
import { controls, util } from '@msrvida/vega-deck.gl';
import { cssPrefix } from './defaults';
import { DataScope, UserSelection } from './dataScope';
import { GL_ORDINAL } from './constants';
import { invert, SearchExpression } from '@msrvida/search-expression';
import { isInternalFieldName } from './util';
import { Language } from './types';

interface State {
    remapColor?: boolean;
    userSelection: UserSelection;
    index: number;
}

enum Action {
    deselect, isolate, exclude, reset, next, previous,
}

export class Details {
    public element: HTMLElement;
    private state: State;

    constructor(
        parentElement: HTMLElement,
        private language: Language,
        private animator: Animator,
        private dataScope: DataScope,
        private colorMapHandler: (remap: boolean) => void,
        private hasColorMaps: () => boolean,
    ) {
        this.element = util.addDiv(parentElement, `${cssPrefix}unitControls`);
        this.clear();
    }

    finalize() {
        if (this.element) this.element.innerHTML = '';
        this.dataScope = null;
        this.element = null;
    }

    clear() {
        this.state = {
            userSelection: null,
            index: -1,
            remapColor: false,
        };
        this.render();
    }

    clearSelection() {
        this.state.userSelection = null;
        this.state.index = -1;
        this.render();
    }

    populate(userSelection: UserSelection, index = 0) {
        this.state.userSelection = userSelection;
        this.state.index = index;
        this.render();
    }

    private selectByNameValue(columnName: string, value: any) {
        const search: SearchExpression = {
            name: columnName,
            operator: '==',
            value,
        };
        this.clearSelection();
        this.animator.select(search);
        this.populate(this.dataScope.selection);
    }

    private remapChanged(remap: boolean) {
        this.state.remapColor = remap;
        this.colorMapHandler(remap);
        this.render();
    }

    private handleAction(action: Action) {
        let p: Promise<void>;
        const u = this.state.userSelection;
        switch (action) {
            case Action.deselect: {
                this.clearSelection();
                p = this.animator.deselect();
                break;
            }
            case Action.exclude: {
                this.clearSelection();
                p = this.animator.filter(invert(u.search), u.excluded, u.included, false);
                this.state.remapColor = false;
                break;
            }
            case Action.isolate: {
                this.clearSelection();
                p = this.animator.filter(u.search, u.included, u.excluded, false);
                this.state.remapColor = false;
                break;
            }
            case Action.reset: {
                this.clear();
                p = this.animator.reset();
                break;
            }
            default: {
                switch (action) {
                    case Action.previous: {
                        this.state.index--;
                        if (this.state.index < 0) {
                            this.state.index = this.state.userSelection.included.length - 1;
                        }
                        break;
                    }
                    case Action.next: {
                        this.state.index++;
                        if (this.state.index >= this.state.userSelection.included.length) {
                            this.state.index = 0;
                        }
                        break;
                    }
                }
                this.render();
                p = this.animator.activate(this.state.userSelection.included[this.state.index]);
            }
        }
        p.then(() => this.render());
    }

    render() {
        const hasRefinedData = this.dataScope.hasFilteredData();
        const renderProps: RenderProps = {
            language: this.language,
            actionHandler: action => this.handleAction(action),
            selectionHandler: (columnName, value) => this.selectByNameValue(columnName, value),
            count: this.state.userSelection && this.state.userSelection.included.length,
            hasRefinedData,
            item: this.state.userSelection && this.state.userSelection.included[this.state.index],
            remapColorHandler: remap => this.remapChanged(remap),
            hasColorMaps: this.hasColorMaps() && hasRefinedData,
            remapColor: this.state.remapColor,
        };
        const a = VegaDeckGl.util.getActiveElementInfo();
        VegaDeckGl.util.mount(renderDetails(renderProps), this.element);
        VegaDeckGl.util.setActiveElement(a);
    }
}

interface RenderProps {
    actionHandler: (action: Action) => void;
    selectionHandler: (columnName: string, value: any) => void;
    remapColorHandler: (remap: boolean) => void;
    hasColorMaps: boolean;
    remapColor: boolean;
    item: any;
    hasRefinedData: boolean;
    count: number;
    language: Language;
}

const renderDetails = (props: RenderProps) => {
    const controlButtons = [
        <button disabled={!props.item} onClick={e => props.actionHandler(Action.deselect)}>{props.language.deselect}</button>,
        <button disabled={!props.item} onClick={e => props.actionHandler(Action.isolate)}>{props.language.isolate}</button>,
        <button disabled={!props.item} onClick={e => props.actionHandler(Action.exclude)}>{props.language.exclude}</button>,
    ];
    const colorMapping = (
        <div>
            <button disabled={props.remapColor} onClick={e => props.remapColorHandler(true)}>{props.language.newColorMap}</button>
            <button disabled={!props.remapColor} onClick={e => props.remapColorHandler(false)}>{props.language.oldColorMap}</button>
        </div>
    );

    const singleItem = props.count === 1;
    const scrollButtons = [
        <button disabled={singleItem} onClick={e => props.actionHandler(Action.previous)}>{props.language.previousDetail}</button>,
        <button disabled={singleItem} onClick={e => props.actionHandler(Action.next)}>{props.language.nextDetail}</button>,
        <span> {props.language.selectionCount(props.count)}</span>,
    ];
    const rows: controls.TableRow[] = [];
    for (const prop in props.item) {
        if (prop === GL_ORDINAL) {
            continue;
        }
        if (isInternalFieldName(prop)) {
            continue;
        }
        rows.push({
            cells: [
                { content: prop }, { content: linkSelect(props.language, prop, props.item[prop], props.selectionHandler) },
            ],
        });
    }
    return (
        <div>
            {props.hasColorMaps && colorMapping}
            <h4>{props.language.headers.selection}</h4>
            <div className={`${cssPrefix}selection`}>
                {controlButtons}
                <button disabled={!props.hasRefinedData} onClick={e => props.actionHandler(Action.reset)}>reset</button>
            </div>
            {props.item && <h4>{props.language.headers.details}</h4>}
            <div>
                <div className={`${cssPrefix}details-scroll`}>
                    {props.item && scrollButtons}
                </div>
                <div className={`${cssPrefix}details`}>
                    {props.item && <controls.Table rows={rows} />}
                </div>
            </div>
        </div>
    );
};

function linkSelect(language: Language, columnName: string, value: any, selectionHandler: (columnName: string, value: any) => void) {
    return (
        <span>
            <a href="#" onClick={e => selectionHandler(columnName, value)} >{value}</a>
            {isNaN(value) ? [' ', <a className="bing-search" href={`https://www.bing.com/search?q=${encodeURIComponent(value)}`} target="_blank">{language.bing}</a>] : ''}
        </span>
    );
}
