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
| rows         | [TableRow][InterfaceDeclaration-28][] | false    |
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
| cells | [TableCell][InterfaceDeclaration-26][] | false    |

## Variables

### Table

```typescript
const Table: StatelessComponent<TableProps>;
```

**Type**

StatelessComponent<[TableProps][InterfaceDeclaration-27]>

[NamespaceImport-1]: controls.html#controls
[InterfaceDeclaration-26]: controls.html#tablecell
[InterfaceDeclaration-27]: controls.html#tableprops
[InterfaceDeclaration-28]: controls.html#tablerow
[InterfaceDeclaration-28]: controls.html#tablerow
[InterfaceDeclaration-26]: controls.html#tablecell
[VariableDeclaration-3]: controls.html#table
[InterfaceDeclaration-27]: controls.html#tableprops