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

export const fluentUI: FluentUIComponents = {
    ActionButton: ActionButton as any,
    ChoiceGroup,
    ComboBox: ComboBox as any,
    CommandBar: CommandBar as any,
    ContextualMenuItemType,
    Customizer,
    DefaultButton: DefaultButton as any,
    Dialog: Dialog as any,
    DialogFooter: DialogFooter as any,
    DialogType,
    Dropdown: Dropdown as any,
    DropdownMenuItemType,
    Icon,
    IconButton: IconButton as any,
    getFocusStyle,
    getTheme,
    Label,
    loadTheme,
    Modal: Modal as any,
    PrimaryButton: PrimaryButton as any,
    Slider: Slider as any,
    Spinner,
    SpinnerSize,
    TextField,
    Toggle
};
