export interface BodyZoom {
    value: number;
    transformUsed: boolean;
}

export class CompatibilityTools {
    static clearSelection() {
        var sel = window.getSelection();
        sel?.removeAllRanges();
    }

    static getBodyZoom(): BodyZoom {
        let bodyComputedStyles = window.getComputedStyle(document.body);

        let zoom = bodyComputedStyles.getPropertyValue('zoom');

        if (zoom !== '') {
            return { value: +zoom, transformUsed: false };
        }

        var matrix = bodyComputedStyles.transform;

        if (matrix !== '') {
            let matrixArray = matrix.replace('matrix(', '').split(',');
            let scale = +matrixArray[0] ?? 1;

            if (isNaN(scale)) scale = 1;

            return { value: +scale, transformUsed: true };
        }

        return { value: 1, transformUsed: false };
    }

    static applyZoomToBoundingRect(rect: DOMRect, zoom: BodyZoom): DOMRect {
        if (!zoom.transformUsed) {
            let x = rect.x * zoom.value;
            let y = rect.y * zoom.value;
            let width = rect.width * zoom.value;
            let height = rect.height * zoom.value;

            return new DOMRect(x, y, width, height);
        } else {
            return rect;
        }
    }
}
