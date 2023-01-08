import { Buffer } from 'buffer';

export interface Point {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export class CommonTools {
    static base64(source: string): string {
        return Buffer.from(source).toString('base64');
    }

    static async copyTextToClipboard(text: string): Promise<boolean> {
        try {
            if ('clipboard' in navigator) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    static focusNextUIElement() {
        let focussableElementsTags =
            'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        let focussableElements = Array.from(
            document.querySelectorAll(focussableElementsTags) ?? []
        );

        if (
            focussableElements instanceof Array &&
            focussableElements.length > 0
        ) {
            let index = focussableElements.findIndex(
                (element) => element === document.activeElement
            );

            if (index >= 0) {
                if (index < focussableElements.length - 1) {
                    (focussableElements[index + 1] as any).focus();
                } else {
                    (focussableElements[0] as any).focus();
                }
            }
        }
    }
}
