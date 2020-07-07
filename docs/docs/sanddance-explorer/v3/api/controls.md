---
layout: api
---

# sanddance-explorer .controls

## Functions

### Dialog

```typescript
function Dialog(props: IDialogProps): Element;
```

**Parameters**

| Name  | Type                                     |
| ----- | ---------------------------------------- |
| props | [IDialogProps][InterfaceDeclaration-0] |

**Return type**

Element

## Interfaces

### IDialogProps

```typescript
interface IDialogProps extends IDialogProps {
    title?: string;
    children?: ReactNode;
    buttons?: Element | Element[];
}
```

**Extends**

IDialogProps

**Properties**

| Name     | Type                         | Optional | Description                                         |
| -------- | ---------------------------- | -------- | --------------------------------------------------- |
| title    | string                       | true     | The title text to display at the top of the dialog. |
| children | ReactNode                    | true     |                                                     |
| buttons  | Element &#124; Element[] | true     |                                                     |

[NamespaceImport-0]: controls.html#controls
[FunctionDeclaration-0]: controls.html#dialog
[InterfaceDeclaration-0]: controls.html#idialogprops
[InterfaceDeclaration-0]: controls.html#idialogprops