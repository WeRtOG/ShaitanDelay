import {
    FocusEvent,
    KeyboardEvent,
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { RoveFocusContext, RoveFocusContextData } from './RoveFocusContext';

import { ConsolePlaceTag } from '../../../tools/console/ConsolePlaceTag';
import { ConsoleTools } from '../../console/ConsoleTools';
import { MockKeyboardEvent } from '../../events/MockKeyboardEvent';

let consolePlaceTag = new ConsolePlaceTag({
    text: 'RoveFocus',
    background: '#FF8C00',
    color: 'black',
});

export interface IRoveFocus {
    size: number;
    vertical?: boolean;
    multidimensional?: boolean;
    col?: number;
    as?: string;
    defaultValue?: number;
    children?: ReactNode | ReactNode[];
    className?: string;
    role?: string;
    'aria-label'?: string;
    isInTestMode?: boolean;
    onChange?: (currentFocus: number) => void;
}

export const handleChildSelect = (
    context: RoveFocusContextData,
    childIndex: number
) => {
    context.setFocus(childIndex);
    ConsoleTools.log(context, consolePlaceTag);
};

export const getChildTabIndex = (
    context: RoveFocusContextData,
    childIndex: number
) => {
    return context.focus === childIndex ||
        (context.focus === -1 && childIndex === 0)
        ? 0
        : -1;
};

export const focusChildIfNeeded = (
    roveActivated: boolean,
    roveFocus: number,
    childIndex: number,
    childRef: MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>
) => {
    if (roveActivated && roveFocus === childIndex && childRef !== null) {
        childRef.current?.focus({ preventScroll: true });
        ConsoleTools.log(
            'Focused on ' + childRef.current?.toString(),
            consolePlaceTag
        );
    }
};

export interface IKeydownEvent {
    e: KeyboardEvent | MockKeyboardEvent;
    vertical: boolean;
    multidimensional: boolean;
    col: number;
    size: number;
    currentFocus: number;
    setCurrentFocus: (focus: number) => void;
}

export function handleKeyDown(props: IKeydownEvent) {
    if (props.vertical) {
        if (props.e.key === 'ArrowDown') {
            props.e.preventDefault();
            props.setCurrentFocus(
                props.currentFocus === props.size - 1
                    ? props.size - 1
                    : props.currentFocus + 1
            );
        } else if (props.e.key === 'ArrowUp') {
            props.e.preventDefault();
            props.setCurrentFocus(
                props.currentFocus === 0 ? 0 : props.currentFocus - 1
            );
        }
    } else {
        if (props.e.key === 'ArrowLeft') {
            props.e.preventDefault();

            props.setCurrentFocus(
                props.currentFocus === 0 ? 0 : props.currentFocus - 1
            );
        } else if (props.e.key === 'ArrowRight') {
            props.e.preventDefault();

            props.setCurrentFocus(
                props.currentFocus === props.size - 1
                    ? props.size - 1
                    : props.currentFocus + 1
            );
        }
    }

    if (props.e.key === 'Home') {
        props.e.preventDefault();
        props.setCurrentFocus(0);
    }

    if (props.e.key === 'End') {
        props.e.preventDefault();
        props.setCurrentFocus(props.size - 1);
    }

    if (props.multidimensional && !props.vertical) {
        let row = Math.ceil((props.currentFocus + 1) / props.col);
        let rowsCount = Math.ceil(props.size / props.col);

        if (props.e.key === 'ArrowDown' && row < rowsCount) {
            props.e.preventDefault();
            props.setCurrentFocus(
                props.currentFocus + props.col > props.size - 1
                    ? props.size - 1
                    : props.currentFocus + props.col
            );
        } else if (props.e.key === 'ArrowUp' && row > 1) {
            props.e.preventDefault();
            props.setCurrentFocus(
                props.currentFocus - props.col <= 0
                    ? 0
                    : props.currentFocus - props.col
            );
        }
    }
}

export const RoveFocus = ({
    isInTestMode = false,
    vertical = false,
    multidimensional = false,
    col = 1,
    defaultValue = -1,
    ...props
}: IRoveFocus) => {
    const [currentFocus, setCurrentFocus] = useState<number>(defaultValue);
    const [activated, setActivated] = useState<boolean>(false);

    const resetFocus = useCallback(() => {
        setCurrentFocus(defaultValue);
    }, [setCurrentFocus, defaultValue]);

    function handleOnFocus(e: FocusEvent) {
        if (!activated) {
            setActivated(true);
        }

        if (currentFocus === -1) {
            setCurrentFocus(0);
        }
    }

    useEffect(() => {
        if (activated) {
            setCurrentFocus(0);
        }
    }, [activated]);

    useEffect(() => {
        if (props.onChange) props.onChange(currentFocus);
    }, [currentFocus]);

    useEffect(() => {
        setCurrentFocus(defaultValue);
    }, [defaultValue]);

    const value = {
        activated: activated,
        focus: currentFocus,
        setFocus: setCurrentFocus,
        resetFocus: resetFocus,
        isInTestMode: isInTestMode,
    } as RoveFocusContextData;

    const Rove = `${props.as ?? 'div'}` as keyof JSX.IntrinsicElements;

    return (
        <RoveFocusContext.Provider value={value}>
            <Rove
                role={props.role}
                data-activated={activated}
                data-current-focus={currentFocus}
                aria-label={props['aria-label']}
                onFocus={(e: FocusEvent) => handleOnFocus(e)}
                onKeyDown={(e: KeyboardEvent) =>
                    handleKeyDown({
                        e: e,
                        vertical: vertical,
                        multidimensional: multidimensional,
                        col: col,
                        size: props.size,
                        currentFocus: currentFocus,
                        setCurrentFocus: setCurrentFocus,
                    })
                }
                className={
                    'rove-focus-provider' +
                    (props.className ? ' ' + props.className : '')
                }
            >
                {props.children}
            </Rove>
        </RoveFocusContext.Provider>
    );
};
