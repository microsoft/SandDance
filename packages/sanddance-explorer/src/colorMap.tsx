// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { base } from './base';
import { FluentUITypes } from '@msrvida/fluentui-react-cdn-typings';
import { IconButton } from './controls/iconButton';
import { SandDance } from '@msrvida/sanddance-react';
import { strings } from './language';

const className = 'sanddance-panel-tools';

function ensureToolbar(panel: HTMLElement) {
    const existing = panel.getElementsByClassName(className);
    if (existing.length > 0) {
        return existing[0];
    } else {
        const div = SandDance.VegaDeckGl.util.addDiv(panel, className);
        panel.insertAdjacentElement('afterbegin', div);
        return div;
    }
}

export function applyColorButtons(presenter: SandDance.VegaDeckGl.Presenter, showLegend: boolean, props: Props) {
    const panel = presenter.getElement(SandDance.VegaDeckGl.PresenterElement.panel);
    const div = ensureToolbar(panel);
    base.reactDOM.render(ColorMap(props), div);

    panel.style.display = showLegend ? '' : 'none';
}

export interface Props {
  canRemap?: boolean;
  colorMapHandler: { (remap: boolean): void };
  isRemap: boolean;
  themePalette: Partial<FluentUITypes.IPalette>;
}

function ColorMap(props: Props) {
    const menuProps: FluentUITypes.IContextualMenuProps = {
        items: [
            {
                key: 'new',
                text: strings.buttonColorSchemeRemap,
                disabled: !props.canRemap || props.isRemap,
                onClick: () => props.colorMapHandler(true)
            },
            {
                key: 'old',
                text: strings.buttonColorSchemeKeep,
                disabled: !props.canRemap || !props.isRemap,
                onClick: () => props.colorMapHandler(false)
            }
        ]
    };
    return (
        <div>
            <IconButton
                themePalette={props.themePalette}
                title={strings.buttonColorSchemeMap}
                onClick={null}
                iconName={props.canRemap ? 'FiltersSolid' : 'Filters'}
                menuProps={menuProps}
            />
        </div>
    );
}
