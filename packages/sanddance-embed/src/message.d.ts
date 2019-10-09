/// requests

type Actions = 'init' | 'load' | 'getData' | 'getInsight';

interface MessageRequestBase {
    action: Actions;
    id?: string | number;
    ts?: string | number | Date;
}

interface MessageRequest_Init extends MessageRequestBase {
    action: 'init';
}

interface MessageRequest_Load extends MessageRequestBase {
    action: 'load';
    data: object[];
    insight: Partial<SandDance.types.Insight>;
}

interface MessageRequest_GetData extends MessageRequestBase {
    action: 'getData';
}

interface MessageRequest_GetInsight extends MessageRequestBase {
    action: 'getInsight';
}

type MessageRequest = MessageRequest_Init | MessageRequest_Load | MessageRequest_GetData | MessageRequest_GetInsight;

type MessageRequestWithSource = MessageRequest & { source: WindowProxy };

/// responses

interface MessageResponseBase {
    request: MessageRequest;
}

interface MessageResponse_Init extends MessageResponseBase { }

interface MessageResponse_GetData extends MessageResponseBase {
    data: object[];
}

interface MessageResponse_GetInsight extends MessageResponseBase {
    insight: SandDanceExplorer.SandDance.types.Insight;
}

type MessageResponse = MessageResponse_Init | MessageResponse_GetData | MessageResponse_GetInsight;
