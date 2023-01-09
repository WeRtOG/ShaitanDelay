import './AlertWindow.scss';

import { useEffect, useState } from 'react';

import { AnimationTools } from '../../tools/AnimationTools';

export interface IAlertWindow {
    active: boolean;
    title?: string;
    text: string;
}

export default function AlertWindow(props: IAlertWindow) {
    const [isDetached, setIsDetached] = useState<boolean>(true);
    const [isHidden, setIsHidden] = useState<boolean>(true);

    useEffect(() => {
        let timeout = AnimationTools.autoShowHideTransition(
            props.active,
            setIsDetached,
            setIsHidden
        );

        return () => clearTimeout(timeout);
    }, [props.active]);

    return (
        <>
            {!isDetached && (
                <div className='alert-window-wrapper'>
                    <div
                        className={'alert-window' + (isHidden ? ' hidden' : '')}
                    >
                        <div className='main-content'>
                            {props.title && <h3>{props.title}</h3>}
                            <p>{props.text}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
