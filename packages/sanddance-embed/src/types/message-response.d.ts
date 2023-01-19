interface MessageResponseBase {
    request: MessageRequest;
}

interface MessageResponse_Init extends MessageResponseBase { }

interface MessageResponse_GetData extends MessageResponseBase {
    data: object[];
}

interface MessageResponse_GetInsight extends MessageResponseBase {

    /**
     * See https://microsoft.github.io/SandDance/docs/sanddance-specs/v1/interfaces/Insight.html
     */
    insight: SandDanceExplorer.SandDance.types.Insight;
}

interface MessageResponse_EventError extends MessageResponseBase {
    errors: string[];
}

interface MessageResponse_EventCanvasClick extends MessageResponseBase {
    event: TouchEvent | MouseEvent | PointerEvent;
}

interface MessageResponse_EventCubeClick extends MessageResponse_EventCanvasClick {
    ordinal: number;
}

interface MessageResponse_Theme extends MessageResponseBase {
    theme: string;
}

type MessageResponse =
    | MessageResponse_Init
    | MessageResponse_GetData
    | MessageResponse_GetInsight
    | MessageResponse_Theme
    | MessageResponse_EventCanvasClick
    | MessageResponse_EventCubeClick
    ;
