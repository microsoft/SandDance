---
layout: api
---

# vega-deck.gl .controls

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

| Name      | Type                    | Optional |
| --------- | ----------------------- | -------- |
| className | string                  | true     |
| content   | string &#124; Element | false    |
| title     | string                  | true     |

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
| rows         | [TableRow][InterfaceDeclaration-24][] | false    |
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
| cells | [TableCell][InterfaceDeclaration-22][] | false    |

## Variables

### Table

```typescript
const Table: StatelessComponent<TableProps>;
```

**Type**

StatelessComponent<[TableProps][InterfaceDeclaration-23]>

[NamespaceImport-1]: controls.html#controls
[InterfaceDeclaration-22]: controls.html#tablecell
[InterfaceDeclaration-23]: controls.html#tableprops
[InterfaceDeclaration-24]: controls.html#tablerow
[InterfaceDeclaration-24]: controls.html#tablerow
[InterfaceDeclaration-22]: controls.html#tablecell
[VariableDeclaration-4]: controls.html#table
[InterfaceDeclaration-23]: controls.html#tableprops