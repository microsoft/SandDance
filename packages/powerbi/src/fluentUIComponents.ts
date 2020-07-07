// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    ActionButton,
    DefaultButton,
    IconButton,
    PrimaryButton
} from '@fluentui/react/lib/Button';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { ComboBox } from '@fluentui/react/lib/ComboBox';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import { Customizer } from '@fluentui/react/lib/Utilities';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { FluentUIComponents } from '@msrvida/fluentui-react-cdn-typings';
import { getFocusStyle, getTheme, loadTheme } from '@fluentui/react/lib/Styling';
import { Icon } from '@fluentui/react/lib/Icon';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Label } from '@fluentui/react/lib/Label';
import { Modal } from '@fluentui/react/lib/Modal';
import { Slider } from '@fluentui/react/lib/Slider';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';

initializeIcons();

/* tslint:disable */
export const fluentUIComponents: FluentUIComponents = {
    ActionButton: ActionButton as any,
    ChoiceGroup: ChoiceGroup as any,
    ComboBox: ComboBox as any,
    CommandBar: CommandBar as any,
    ContextualMenuItemType,
    Customizer: Customizer as any,
    DefaultButton: DefaultButton as any,
    Dialog: Dialog as any,
    DialogFooter: DialogFooter as any,
    DialogType,
    Dropdown: Dropdown as any,
    DropdownMenuItemType,
    Icon: Icon as any,
    IconButton: IconButton as any,
    getFocusStyle,
    getTheme,
    Label: Label as any,
    loadTheme,
    Modal: Modal as any,
    PrimaryButton: PrimaryButton as any,
    Slider: Slider as any,
    Spinner: Spinner as any,
    SpinnerSize,
    TextField: TextField as any,
    Toggle: Toggle as any
};
