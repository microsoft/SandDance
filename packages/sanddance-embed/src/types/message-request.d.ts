type Actions = 'init' | 'load' | 'getData' | 'getInsight';

interface MessageRequestBase {
    action: Actions;
    id?: string | number;
    ts?: string | number | Date;
}

interface MessageRequest_Init extends MessageRequestBase {
    action: 'init';
}

type DataToLoad = object[] | SandDanceExplorer.DataFile;

interface MessageRequest_Load extends MessageRequestBase {
    action: 'load';
    data: DataToLoad;
    insight?: Partial<SandDance.types.Insight>;
    props?: SandDanceExplorer.Props;
}

interface MessageRequest_GetData extends MessageRequestBase {
    action: 'getData';
}

interface MessageRequest_GetInsight extends MessageRequestBase {
    action: 'getInsight';
}

type MessageRequest = MessageRequest_Init | MessageRequest_Load | MessageRequest_GetData | MessageRequest_GetInsight;

type MessageRequestWithSource = MessageRequest & { source: WindowProxy };
