import './ItemsSwitch.scss';

import { useEffect, useId, useState } from 'react';
import { ISwitchItem, SwitchItem } from './components/SwitchItem';
import { RoveFocus } from '../../tools/ui/rove-focus/RoveFocus';
import { useDebounce } from '../../tools/events';

export interface IItemsSwitch {
    items: ISwitchItem[];
    isTabList?: boolean;
    vertical?: boolean;
    value?: number | string;
    onChange?: (value?: string | number) => void;
}

export function ItemsSwitch(props: IItemsSwitch) {
    const id = useId();

    const [value, setValue] = useState<number | string | undefined>(
        props.value ?? undefined
    );

    useDebounce(() => {
        if (value !== props.value) {
            if (props.onChange) props.onChange(value);
        }
    }, [value]);

    useEffect(() => {
        if (props.value !== value) {
            setValue(props.value ?? undefined);
        }
    }, [props.value]);

    return (
        <RoveFocus size={props.items.length} vertical={props.vertical}>
            <div
                className={'items-switch' + (props.vertical ? ' vertical' : '')}
                role={props.isTabList ? 'tablist' : undefined}
            >
                {props.items.map((item, index) => {
                    return (
                        <SwitchItem
                            onClick={() => {
                                setValue(item.value);
                            }}
                            roveIndex={index}
                            key={index}
                            id={id}
                            isTabList={props.isTabList}
                            checked={value === item.value}
                            {...item}
                        />
                    );
                })}
            </div>
        </RoveFocus>
    );
}
