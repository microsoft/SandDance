// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

//adapted from https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/fluent-theme/src/fluent/styles/CommandBarButton.styles.ts

import { base } from '../base';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';

export const CommandBarButtonStyles = (props: FabricTypes.IButtonProps): Partial<FabricTypes.IButtonStyles> => {
    const { theme } = props;
    if (!theme) {
        throw new Error('Theme is undefined or null.');
    }
    const { palette, semanticColors } = theme;

    const BUTTON_ICON_CLASSNAME = '.ms-Button-icon';

    return {
        root: [
            { ...base.fabric.getFocusStyle(theme, { inset: 2 }) },
            {
                backgroundColor: palette.white
            }
        ],

        rootHovered: {
            backgroundColor: palette.neutralLighter,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDarkAlt
                }
            }
        },

        rootPressed: {
            backgroundColor: palette.neutralLight,
            color: palette.neutralDark,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDark
                }
            }
        },

        rootChecked: {
            backgroundColor: palette.neutralLight,
            color: palette.neutralDark,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDark
                }
            }
        },

        rootCheckedHovered: {
            backgroundColor: palette.neutralQuaternaryAlt,
            color: palette.neutralDark
        },

        rootExpanded: {
            color: palette.neutralDark,
            backgroundColor: palette.neutralLight,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: palette.themeDark
                }
            }
        },

        rootExpandedHovered: {
            background: palette.neutralQuaternaryAlt
        },

        rootDisabled: {
            backgroundColor: palette.white,
            selectors: {
                [BUTTON_ICON_CLASSNAME]: {
                    color: semanticColors.disabledBodySubtext
                }
            }
        },

        splitButtonMenuButton: {
            backgroundColor: palette.white,
            color: palette.neutralSecondary,
            selectors: {
                ':hover': {
                    backgroundColor: palette.neutralLighter,
                    selectors: {
                        [BUTTON_ICON_CLASSNAME]: {
                            color: palette.neutralPrimary
                        }
                    }
                },
                ':active': {
                    backgroundColor: palette.neutralLight,
                    selectors: {
                        [BUTTON_ICON_CLASSNAME]: {
                            color: palette.neutralPrimary
                        }
                    }
                }
            }
        },

        splitButtonMenuButtonDisabled: {
            backgroundColor: palette.white
        },

        icon: {
            color: palette.themePrimary
        }
    };
};
