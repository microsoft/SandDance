// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import {
    ActionButton,
    DefaultButton,
    IconButton,
    PrimaryButton
} from 'office-ui-fabric-react/lib/components/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ComboBox } from 'office-ui-fabric-react/lib/components/ComboBox';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import { Customizer } from '@uifabric/utilities';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/components/Dropdown';
import { FabricComponents } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { getFocusStyle, getTheme, loadTheme } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Modal } from 'office-ui-fabric-react/lib/components/Modal';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

initializeIcons();

export const fabric: FabricComponents = {
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
