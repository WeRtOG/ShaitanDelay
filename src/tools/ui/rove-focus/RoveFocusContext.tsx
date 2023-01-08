import { createContext, useContext } from 'react';

export interface RoveFocusContextData {
    activated: boolean;
    focus: number;
    setFocus: (focus: number) => void;
    resetFocus: (focus: number) => void;
    isInTestMode: boolean;
}

export const RoveFocusContext = createContext<RoveFocusContextData | null>(
    null
);

export const useRoveFocusContext = () => useContext(RoveFocusContext);
