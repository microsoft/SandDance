import { initializeIcons, use } from '@msrvida/fluentui-icons';

export interface FluentUIIconsBase {
    initializeIcons: typeof initializeIcons;
    use: typeof use;
}

export as namespace _FluentUIIcons;
