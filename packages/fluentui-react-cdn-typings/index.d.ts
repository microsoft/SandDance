// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as FluentUITypes from './types';
import {
    ActionButton,
    CommandBarButton,
    DefaultButton,
    IconButton,
    PrimaryButton
} from '@fluentui/react/lib/Button';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { ComboBox } from '@fluentui/react/lib/ComboBox';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import { Customizer } from '@fluentui/react/lib/utilities';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { Dropdown, DropdownMenuItemType } from '@fluentui/react/lib/Dropdown';
import { getFocusStyle, getTheme, loadTheme } from '@fluentui/react/lib/Styling';
import { Icon } from '@fluentui/react/lib/Icon';
import { Label } from '@fluentui/react/lib/Label';
import { Modal } from '@fluentui/react/lib/Modal';
import { Slider } from '@fluentui/react/lib/Slider';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';

export { FluentUITypes };

export interface FluentUIComponents {
  ActionButton: typeof ActionButton;
  ChoiceGroup: typeof ChoiceGroup;
  ComboBox: typeof ComboBox;
  CommandBar: typeof CommandBar;
  ContextualMenuItemType: typeof ContextualMenuItemType;
  Customizer: typeof Customizer;
  DefaultButton: typeof DefaultButton;
  Dialog: typeof Dialog;
  DialogFooter: typeof DialogFooter;
  DialogType: typeof DialogType;
  Dropdown: typeof Dropdown;
  DropdownMenuItemType: typeof DropdownMenuItemType;
  Icon: typeof Icon;
  IconButton: typeof IconButton;
  getFocusStyle: typeof getFocusStyle;
  getTheme: typeof getTheme;
  Label: typeof Label;
  loadTheme: typeof loadTheme;
  Modal: typeof Modal;
  PrimaryButton: typeof PrimaryButton;
  Slider: typeof Slider;
  Spinner: typeof Spinner;
  SpinnerSize: typeof SpinnerSize;
  TextField: typeof TextField;
  Toggle: typeof Toggle;
}
