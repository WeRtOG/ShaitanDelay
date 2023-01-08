import {
    KeyboardEvent,
    MouseEvent,
    MouseEventHandler,
    createRef,
    useCallback,
    useEffect,
} from 'react';
import { useRoveFocusContext } from '../../../tools/ui/rove-focus';

import * as Rove from '../../../tools/ui/rove-focus/RoveFocus';
import { BootstrapIcon } from '../../BootstrapIcon/BootstrapIcon';

export interface ISwitchItem {
    value: number | string;
    title?: string;
    icon?: string;
    error?: boolean;
    screenReaderInfo?: string;
}

export interface SwitchItemProps {
    id: string;
    checked?: boolean;
    isTabList?: boolean;
    roveIndex?: number;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function SwitchItem(props: SwitchItemProps & ISwitchItem) {
    const roveContext = useRoveFocusContext();

    const ref = createRef<HTMLButtonElement>();

    const handleSelect = useCallback(() => {
        if (roveContext && props.roveIndex !== undefined)
            Rove.handleChildSelect(roveContext, props.roveIndex);
    }, [props.roveIndex, roveContext]);

    useEffect(() => {
        if (roveContext?.focus !== undefined && props.roveIndex !== undefined)
            Rove.focusChildIfNeeded(
                roveContext.activated,
                roveContext.focus,
                props.roveIndex,
                ref
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roveContext?.focus, roveContext?.activated, props.roveIndex]);

    function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
        if (props.onClick) props.onClick(e);
        handleSelect();
    }

    function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
        handleSelect();
    }

    function handleKeyUp(e: KeyboardEvent<HTMLButtonElement>) {
        handleSelect();
    }
    return (
        <button
            type='button'
            className={
                'switch-item' +
                (props.checked ? ' checked' : '') +
                (props.error ? ' error' : '')
            }
            tabIndex={
                props.roveIndex !== undefined && roveContext
                    ? Rove.getChildTabIndex(roveContext, props.roveIndex)
                    : 0
            }
            role={props.isTabList ? 'tab' : undefined}
            aria-selected={props.isTabList ? props.checked : undefined}
            onClick={handleOnClick}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            ref={ref}
        >
            {props.icon && (
                <BootstrapIcon
                    icon={props.error ? 'exclamation-circle-fill' : props.icon}
                />
            )}
            {props.title && <span className='title'>{props.title}</span>}
        </button>
    );
}
