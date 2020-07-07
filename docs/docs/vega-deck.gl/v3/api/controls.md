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
| rows         | [TableRow][InterfaceDeclaration-25][] | false    |
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
| cells | [TableCell][InterfaceDeclaration-23][] | false    |

## Variables

### Table

```typescript
const Table: StatelessComponent<TableProps>;
```

**Type**

StatelessComponent<[TableProps][InterfaceDeclaration-24]>

[NamespaceImport-1]: controls.html#controls
[InterfaceDeclaration-23]: controls.html#tablecell
[InterfaceDeclaration-24]: controls.html#tableprops
[InterfaceDeclaration-25]: controls.html#tablerow
[InterfaceDeclaration-25]: controls.html#tablerow
[InterfaceDeclaration-23]: controls.html#tablecell
[VariableDeclaration-3]: controls.html#table
[InterfaceDeclaration-24]: controls.html#tableprops