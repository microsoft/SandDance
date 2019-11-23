---
layout: api
---

# sanddance .VegaDeckGl.controls

## Interfaces

### TableCell

```typescript
interface TableCell {
    className?: string;
    content: string | Element;
    title?: string;
}
```

**Properties**

| Name      | Type                  | Optional |
| --------- | --------------------- | -------- |
| className | string                | true     |
| content   | string &#124; Element | false    |
| title     | string                | true     |

----------

### TableProps

```typescript
interface TableProps {
    className?: string;
    onRowClick?: (e: Event, index: number) => void;
    rows: TableRow[];
    rowClassName?: string;
}
```

**Properties**

| Name         | Type                                  | Optional |
| ------------ | ------------------------------------- | -------- |
| className    | string                                | true     |
| onRowClick   | (e: Event, index: number) => void     | true     |
| rows         | [TableRow][InterfaceDeclaration-59][] | false    |
| rowClassName | string                                | true     |

----------

### TableRow

```typescript
interface TableRow {
    cells: TableCell[];
}
```

**Properties**

| Name  | Type                                   | Optional |
| ----- | -------------------------------------- | -------- |
| cells | [TableCell][InterfaceDeclaration-57][] | false    |

## Variables

### Table

```typescript
const Table: StatelessComponent<TableProps>;
```

**Type**

StatelessComponent<[TableProps][InterfaceDeclaration-58]>

[NamespaceImport-6]: vegadeckgl.controls.html#controls
[InterfaceDeclaration-57]: vegadeckgl.controls.html#tablecell
[InterfaceDeclaration-58]: vegadeckgl.controls.html#tableprops
[InterfaceDeclaration-59]: vegadeckgl.controls.html#tablerow
[InterfaceDeclaration-59]: vegadeckgl.controls.html#tablerow
[InterfaceDeclaration-57]: vegadeckgl.controls.html#tablecell
[VariableDeclaration-9]: vegadeckgl.controls.html#table
[InterfaceDeclaration-58]: vegadeckgl.controls.html#tableprops