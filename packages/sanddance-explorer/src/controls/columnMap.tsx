// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { Dropdown } from './dropdown';
import { Explorer } from '../explorer';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { NewSignal } from 'vega-typings/types';
import { SandDance } from '@msrvida/sanddance-react';
import { Signal } from './signal';
import { strings } from '../language';

const maxFacets = 50;

const roleLabels: { [role in SandDance.types.InsightColumnRoles]: string } = {
  color: strings.labelColumnColor,
  facet: strings.labelColumnFacet,
  group: strings.labelColumnGroup,
  size: strings.labelColumnSize,
  sort: strings.labelColumnSort,
  uid: null,
  x: strings.labelColumnX,
  y: strings.labelColumnY,
  z: strings.labelColumnZ
};

export interface ColumnMapBaseProps {
  allColumns: SandDance.types.Column[];
  quantitativeColumns: SandDance.types.Column[];
  categoricalColumns: SandDance.types.Column[];
  changeColumnMapping: { (role: SandDance.types.InsightColumnRoles, column: SandDance.types.Column): void };
  explorer: Explorer;
}

export interface Props extends ColumnMapBaseProps {
  componentRef?: React.RefObject<FabricTypes.IDropdown>;
  hideSignals?: boolean;
  disabled?: boolean;
  specRole: SandDance.types.SpecRoleCapabilities;
  selectedColumnName?: string
  onChangeSignal?: (name: string, value: any) => void;
  onDismiss?: () => void;
}

function filterColumnList(context: SandDance.types.InsightColumnRoles, columns: SandDance.types.Column[]) {
  switch (context) {
    case "facet":
      return columns.filter(
        column =>
          column.quantitative ||
          (column.stats.distinctValueCount &&
            column.stats.distinctValueCount < maxFacets)
      );
    default:
      return columns.slice();
  }
}

function optionsForSpecColumn(sectionName: string, columns: SandDance.types.Column[], role: SandDance.types.InsightColumnRoles, selectedColumnName?: string) {
  const filtered = filterColumnList(role, columns);
  const options = filtered.map((column, i) => {
    const option: FabricTypes.IDropdownOption = {
      key: column.name,
      text: column.name,
      data: column,
      selected: selectedColumnName === column.name
    };
    return option;
  });
  if (options.length) {
    const option: FabricTypes.IDropdownOption = {
      key: sectionName,
      text: sectionName,
      itemType: base.fabric.DropdownMenuItemType.Header
    };
    options.unshift(option);
  }
  return options;
}

function selectFirst(options: FabricTypes.IDropdownOption[]) {
  for (let i = 0; i < options.length; i++) {
    if (options[i].itemType === base.fabric.DropdownMenuItemType.Header) continue;
    options[i].selected = true;
    return;
  }
}

export function ColumnMap(props: Props) {
  if (!props.specRole) return null;
  let numericLabel = strings.selectNumeric;
  const qoptions = optionsForSpecColumn(numericLabel, props.quantitativeColumns, props.specRole.role, props.selectedColumnName);
  const coptions = props.specRole.excludeCategoric ? null : optionsForSpecColumn(strings.selectNonNumeric, props.categoricalColumns, props.specRole.role, props.selectedColumnName);
  const options = qoptions.concat(coptions).filter(Boolean);
  if (props.specRole.allowNone) {
    options.unshift({
      key: -1,
      text: strings.selectNone
    })
  }
  const hasSelection = options.reduce((p, c) => {
    return p || c.selected;
  }, false);
  if (!hasSelection) {
    selectFirst(options);
  }
  let signals: NewSignal[];
  if (props.explorer.viewer && props.explorer.viewer.vegaSpec) {
    if (props.specRole.signals) {
      signals = props.explorer.viewer.vegaSpec.signals.filter(s => props.specRole.signals.indexOf(s.name) >= 0);
    }
  }
  const label = roleLabels[props.specRole.role];
  return (
    <div
      className="sanddance-columnMap"
    >
      <Dropdown
        componentRef={props.componentRef}
        collapseLabel={true}
        disabled={props.disabled}
        label={label}
        options={options}
        onChange={(e, o) =>
          props.changeColumnMapping(props.specRole.role, SandDance.VegaDeckGl.util.clone(o.data))
        }
        onDismiss={props.onDismiss}
      />
      {!props.hideSignals && signals && signals.map((signal, i) => (
        <Signal
          key={i}
          explorer={props.explorer}
          signal={signal}
          onChange={value => props.onChangeSignal && props.onChangeSignal(signal.name, value)}
        />
      ))}
    </div>
  );
}
