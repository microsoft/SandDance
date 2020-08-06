import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import { Application, IPlugin } from '@phosphor/application';
import { Widget } from '@phosphor/widgets';
import { Token } from '@phosphor/coreutils';

import * as widgetExports from './widget';
import { MODULE_NAME, MODULE_VERSION } from './version';

const EXTENSION_ID = '@msrvida/sanddance-jupyter-widget:plugin';

/**
 * The SandDance plugin.
 */
const sandDancePlugin: IPlugin<Application<Widget>, void> = {
    id: EXTENSION_ID,
    requires: [IJupyterWidgetRegistry as unknown as Token<any>],
    activate: activateWidgetExtension,
    autoStart: true
};

export default sandDancePlugin;


/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app: Application<Widget>, registry: IJupyterWidgetRegistry): void {
    registry.registerWidget({
        name: MODULE_NAME,
        version: MODULE_VERSION,
        exports: widgetExports,
    });
}
