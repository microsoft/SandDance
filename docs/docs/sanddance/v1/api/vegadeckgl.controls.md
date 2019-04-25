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
| rows         | [TableRow][InterfaceDeclaration-56][] | false    |
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
| cells | [TableCell][InterfaceDeclaration-54][] | false    |

## Variables

### Table

```typescript
const Table: StatelessComponent<TableProps>;
```

**Type**

StatelessComponent<[TableProps][InterfaceDeclaration-55]>

[NamespaceImport-6]: vegadeckgl.controls#controls
[InterfaceDeclaration-54]: vegadeckgl.controls#tablecell
[InterfaceDeclaration-55]: vegadeckgl.controls#tableprops
[InterfaceDeclaration-56]: vegadeckgl.controls#tablerow
[InterfaceDeclaration-56]: vegadeckgl.controls#tablerow
[InterfaceDeclaration-54]: vegadeckgl.controls#tablecell
[VariableDeclaration-9]: vegadeckgl.controls#table
[InterfaceDeclaration-55]: vegadeckgl.controls#tableprops