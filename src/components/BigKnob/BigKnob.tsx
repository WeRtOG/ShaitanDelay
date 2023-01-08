import { createRef, useEffect, useState } from 'react';
import './BigKnob.scss';

export interface IBigKnob {
    value: number;
    title: string;
    step?: number;
    smooth?: boolean;
    movementPowerAdjust?: number;
    color?: 1 | 2 | 3 | 4 | 5;
    onChange: (newValue: number) => void;
}
export default function BigKnob(props: IBigKnob) {
    const knobMainRef = createRef<HTMLDivElement>();

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [dragStartY, setDragStartY] = useState<number>(-1);
    const [dragStartValue, setDragStartValue] = useState<number>(-1);

    function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        setIsDragging(true);
        setDragStartY(e.clientY);
        setDragStartValue(props.value);
    }

    function onMouseMove(e: MouseEvent) {
        if (isDragging && knobMainRef.current) {
            let newValue =
                dragStartValue +
                ((dragStartY - e.clientY) * (props.movementPowerAdjust ?? 1)) /
                500;

            if (newValue < 0) {
                newValue = 0;
            }

            if (newValue > 1) {
                newValue = 1;
            }

            if (props.step !== undefined) {
                newValue = Math.ceil(newValue / props.step) * props.step;
            }

            props.onChange(newValue);
        }
    }

    function onMouseUp(e: MouseEvent) {
        setIsDragging(false);
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseUp);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseUp);
        };
    });

    let deg = props.value * 280 - 140;

    if (deg < -140) deg = -140;
    if (deg > 140) deg = 140;

    let colorHue = 260 + ((props.color ?? 1) * 10);
    return (
        <div className='big-knob-container'>
            <div
                className={
                    'big-knob-wrapper' +
                    (props.smooth ? ' smooth-animation' : '') +
                    (props.color ? ' color-' + props.color : ' color-1')
                }
            >
                <div className='knob-main-wrapper'>
                    <div
                        className='knob-main'
                        ref={knobMainRef}
                        onMouseDown={onMouseDown}
                        style={{
                            transform: 'rotate(' + deg + 'deg)',
                        }}
                    >
                        <div className='dot'></div>
                    </div>
                    <div className='progress'>
                        <svg viewBox='0 0 110 110'>
                            <path
                                style={{
                                    strokeDashoffset:
                                        198 - props.value * 198 + 'px',
                                    opacity: 0.5 + 0.5 * props.value,
                                    stroke: 'hsl(' + colorHue + ', 100%, 50%)',
                                    filter: 'drop-shadow(0px 0px 5px hsla(' + colorHue + ', 100%, 50%, 0.3))'
                                }}
                                fill='none'
                                d='M30,90 A40,40 0 1,1 80,90'
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <p className='title'>{props.title}</p>
        </div>
    );
}
