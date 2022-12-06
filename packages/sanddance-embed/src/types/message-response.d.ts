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
