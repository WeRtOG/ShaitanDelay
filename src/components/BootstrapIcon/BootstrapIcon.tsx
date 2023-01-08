import { MouseEventHandler } from 'react';

export interface IBootstrapIcon {
    icon: string;
    ariaHidden?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

export function BootstrapIcon({
    ariaHidden = true,
    ...props
}: IBootstrapIcon) {
    return (
        <i
            aria-hidden={ariaHidden ? true : undefined}
            onClick={props.onClick}
            className={
                'bi bi-' +
                props.icon +
                (props.className ? ' ' + props.className : '')
            }
        ></i>
    );
}
