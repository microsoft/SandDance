type Actions = 'load' | 'getData' | 'getInsight';

/// requests

interface MessageRequestBase {
    action: Actions;
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

type MessageRequest = MessageRequest_Load | MessageRequest_GetData | MessageRequest_GetInsight;

/// responses

interface MessageResponseBase {
    requestAction: Actions;
}

interface MessageResponse_GetData extends MessageResponseBase {
    requestAction: 'getData';
    data: object[];
}

interface MessageResponse_GetInsight extends MessageResponseBase {
    requestAction: 'getInsight';
    insight: SandDanceExplorer.SandDance.types.Insight;
}

type MessageResponse = MessageResponse_GetData | MessageResponse_GetInsight;
