export interface IConsolePlaceTag {
    text: string;
    fontWeight?: number;
    background?: string;
    color?: string;
}
export class ConsolePlaceTag implements IConsolePlaceTag {
    text: string;
    fontWeight: number;
    background: string;
    color: string;

    constructor(props: IConsolePlaceTag) {
        this.text = props.text;
        this.fontWeight = props.fontWeight ?? 400;
        this.background = props.background ?? 'rgba(255,255,255,.05)';
        this.color = props.color ?? 'inherit';
    }

    toConsoleFormat(): string[] {
        return [
            '%c' + this.text,
            'background: ' +
                this.background +
                '; color: ' +
                this.color +
                '; font-weight: ' +
                this.fontWeight +
                '; padding: 0.125rem; padding-left: 0.3125rem; padding-right: 0.3125rem; border-radius: 0.125rem;',
        ];
    }
}
