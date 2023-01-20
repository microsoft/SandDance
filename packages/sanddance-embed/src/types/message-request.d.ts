type Actions = 'init' | 'load' | 'getData' | 'getInsight';

interface MessageRequestBase {
    action: Actions;
    id?: string | number;
    ts?: string | number | Date;
}

interface MessageRequest_Init extends MessageRequestBase {
    action: 'init';
}

/**
 * See https://microsoft.github.io/SandDance/docs/sanddance-explorer/v4/interfaces/DataFile.html
 */
type DataToLoad = object[] | SandDanceExplorer.DataFile;

interface MessageRequest_Load extends MessageRequestBase {
    action: 'load';
    data: DataToLoad;

    /**
     * See https://microsoft.github.io/SandDance/docs/sanddance-specs/v1/interfaces/Insight.html
     */
    insight?: Partial<SandDance.types.Insight>;

    /**
     * See https://microsoft.github.io/SandDance/docs/sanddance-explorer/v4/interfaces/Props.html
     */
    props?: SandDanceExplorer.Props;

    /**
     * See https://microsoft.github.io/SandDance/docs/sanddance-explorer/v4/interfaces/Options.html
     */
    options?: SandDanceExplorer.Options;
}

interface MessageRequest_GetData extends MessageRequestBase {
    action: 'getData';
}

interface MessageRequest_GetInsight extends MessageRequestBase {
    action: 'getInsight';
}

interface MessageRequest_GetSetup extends MessageRequestBase {
    action: 'getSetup';
}

interface MessageRequest_Theme extends MessageRequestBase {
    action: 'theme';
    dark?: boolean;
}

interface MessageRequest_EventCanvasClick extends MessageRequestBase {
    action: 'eventCanvasClick';
}

interface MessageRequest_EventCubeClick extends MessageRequestBase {
    action: 'eventCubeClick';
}

type MessageRequest =
    | MessageRequest_Init
    | MessageRequest_Load
    | MessageRequest_GetData
    | MessageRequest_GetInsight
    | MessageRequest_GetSetup
    | MessageRequest_Theme
    | MessageRequest_EventCanvasClick
    | MessageRequest_EventCubeClick
    ;

type MessageRequestWithSource = MessageRequest & { source: WindowProxy };
