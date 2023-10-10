from typing import Any, Dict, List, Optional, Union

class Snapshot:
    name: str
    data: str

class SnapshotProps:
    snapshots: List[Snapshot]
    selectedSnapshotIndex: int

class ExplorerProps:
    compactUI: Union[None, bool]
    hideSidebarControls: Union[None, bool]
    logoClickUrl: Union[None, str]
    logoClickTarget: Union[None, str]
    bingSearchDisabled: Union[None, bool]
    searchORDisabled: Union[None, bool]
    theme: Union[None, str]
    initialView: Union[None, str]
    #topBarButtonProps would be cool to add, need an event handler
    snapshotProps: Union[None, SnapshotProps]
    initialRenderer: Union[None, Dict[str, Any]]
    initialSidebarClosed: Union[None, bool]
    initialSidebarPinned: Union[None, bool]

class SandDanceEvent:
    selection: Optional[str]
    cubeClick: Optional[int]
