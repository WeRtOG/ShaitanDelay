import { EventHandler, RefObject, useEffect, useRef, useState } from 'react';

export function useEventListener(
    eventName: string,
    handler: (e: any) => void,
    element: HTMLElement | Window | Document = window,
    deps: React.DependencyList = []
) {
    const savedHandler = useRef<(e: any) => void>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler, deps]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event: Event) =>
            savedHandler.current ? savedHandler.current(event) : null;

        if (eventListener !== null)
            element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element, ...deps]);
}

export interface EventAndHandlerPair {
    event: string;
    handler: any;
    options?: boolean | AddEventListenerOptions;
}

export function useMultiEventListener({
    element = window,
    deps = [],
    ...props
}: {
    events: EventAndHandlerPair[];
    element: HTMLElement | Window | Document | null;
    deps: React.DependencyList;
    ref?: RefObject<HTMLElement>;
}) {
    useEffect(() => {
        if (props.ref && props.ref.current) element = props.ref.current;

        props.events.forEach((ev) => {
            if (element)
                element.addEventListener(ev.event, ev.handler, ev.options);
        });

        return () => {
            props.events.forEach((ev) => {
                if (element) element.removeEventListener(ev.event, ev.handler);
            });
        };
    }, [props.events, element, props.ref, ...deps]);
}

export function useOutsideClickDetector(
    ref: RefObject<HTMLElement>,
    handler: (e: any) => void
) {
    useEffect(() => {
        function handleClickOutside(e: any) {
            if (ref.current && !ref.current.contains(e.target)) {
                handler(e);
            }
        }

        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [ref, handler]);
}

export function useDebounce(
    callback: () => void,
    deps: any[],
    timeout: number = 100
) {
    useEffect(() => {
        let handler = setTimeout(() => {
            callback();
        }, timeout);

        return () => clearTimeout(handler);
    }, [...deps]);
}
