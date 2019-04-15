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
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/components/Dropdown';
import { FabricComponents } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { getTheme, loadTheme } from 'office-ui-fabric-react/lib/Styling';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Modal } from 'office-ui-fabric-react/lib/components/Modal';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

initializeIcons();

export const fabric: FabricComponents = {
  ActionButton: ActionButton as any,
  ChoiceGroup,
  ComboBox: ComboBox as any,
  ContextualMenuItemType,
  DefaultButton: DefaultButton as any,
  Dialog,
  DialogFooter: DialogFooter as any,
  DialogType,
  Dropdown,
  DropdownMenuItemType,
  Icon,
  IconButton: IconButton as any,
  getTheme,
  Label,
  loadTheme,
  Modal,
  PrimaryButton: PrimaryButton as any,
  Slider,
  Spinner,
  SpinnerSize,
  TextField
};
