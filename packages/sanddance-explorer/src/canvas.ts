import { SandDance } from '@msrvida/sanddance-react';
import PresenterElement = SandDance.VegaDeckGl.PresenterElement;

export function getCanvas(viewer: SandDance.Viewer) {
    const tags = viewer.presenter.getElement(PresenterElement.gl).getElementsByTagName('canvas');
    if (tags) {
        return tags[0];
    }
}

export function removeTabIndex(viewer: SandDance.Viewer) {
    const canvas = getCanvas(viewer);
    if (canvas) {
        canvas.tabIndex = -1;
    }
}

export const capabilities = {
    webgl: !!document.createElement('canvas').getContext('webgl'),
    webgl2: !!document.createElement('canvas').getContext('webgl2'),
};
