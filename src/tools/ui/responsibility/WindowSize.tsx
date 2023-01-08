import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
} from 'react';

export interface WindowSize {
    width: number;
    height: number;
}

export const WindowSizeObserverContext = createContext<WindowSize | null>(null);

export const useWindowSize = () => useContext(WindowSizeObserverContext);

export interface IWindowSizeObserver {
    children?: ReactNode | ReactNode[];
}

export const WindowSizeObserverProvider = (props: IWindowSizeObserver) => {
    const [windowSize, setWindowSize] = useState<WindowSize | null>(null);

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowSizeObserverContext.Provider value={windowSize}>
            {props.children}
        </WindowSizeObserverContext.Provider>
    );
};
