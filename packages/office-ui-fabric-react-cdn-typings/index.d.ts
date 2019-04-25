// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as FabricTypes from './types';
import {
  ActionButton,
  CommandBarButton,
  DefaultButton,
  IconButton,
  PrimaryButton
} from 'office-ui-fabric-react/lib/components/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ComboBox } from 'office-ui-fabric-react/lib/components/ComboBox';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/components/Dropdown';
import { getTheme, loadTheme } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Modal } from 'office-ui-fabric-react/lib/components/Modal';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export { FabricTypes };

export interface FabricComponents {
  ActionButton: FabricTypes.IReactCast<FabricTypes.IButtonProps>;
  ChoiceGroup: typeof ChoiceGroup;
  ComboBox: FabricTypes.IReactCast<FabricTypes.IComboBoxProps>;
  ContextualMenuItemType: typeof ContextualMenuItemType;
  DefaultButton: FabricTypes.IReactCast<FabricTypes.IButtonProps>;
  Dialog: typeof Dialog;
  DialogFooter: FabricTypes.IReactCast<{}>;
  DialogType: typeof DialogType;
  Dropdown: typeof Dropdown;
  DropdownMenuItemType: typeof DropdownMenuItemType;
  Icon: typeof Icon;
  IconButton: FabricTypes.IReactCast<FabricTypes.IButtonProps>;
  getTheme: typeof getTheme;
  Label: typeof Label;
  loadTheme: typeof loadTheme;
  Modal: typeof Modal;
  PrimaryButton: FabricTypes.IReactCast<FabricTypes.IButtonProps>;
  Slider: typeof Slider;
  Spinner: typeof Spinner;
  SpinnerSize: typeof SpinnerSize;
  TextField: typeof TextField;
  Toggle: FabricTypes.IReactCast<FabricTypes.IToggleProps>;
}
