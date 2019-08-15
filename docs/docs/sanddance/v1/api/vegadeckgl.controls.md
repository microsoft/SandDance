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
| rows         | [TableRow][InterfaceDeclaration-58][] | false    |
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
| cells | [TableCell][InterfaceDeclaration-56][] | false    |

## Variables

### Table

```typescript
const Table: StatelessComponent<TableProps>;
```

**Type**

StatelessComponent<[TableProps][InterfaceDeclaration-57]>

[NamespaceImport-6]: vegadeckgl.controls#controls
[InterfaceDeclaration-56]: vegadeckgl.controls#tablecell
[InterfaceDeclaration-57]: vegadeckgl.controls#tableprops
[InterfaceDeclaration-58]: vegadeckgl.controls#tablerow
[InterfaceDeclaration-58]: vegadeckgl.controls#tablerow
[InterfaceDeclaration-56]: vegadeckgl.controls#tablecell
[VariableDeclaration-9]: vegadeckgl.controls#table
[InterfaceDeclaration-57]: vegadeckgl.controls#tableprops