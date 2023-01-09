import './App.scss';

import { useEffect, useState } from 'react';

import AlertWindow from './components/AlertWindow/AlertWindow';
import BigKnob from './components/BigKnob/BigKnob';
import { DelayMode } from './enums/DelayMode';
import { ItemsSwitch } from './components/ItemsSwitch/ItemsSwitch';

function App() {
    const [delayMode, setDelayMode] = useState<DelayMode>(
        window.props.getPropertyValue('delayMode')
    );
    const [delayTime, setDelayTime] = useState<number>(
        window.props.getPropertyValue('delayTime')
    );
    const [delayFeedback, setDelayFeedback] = useState<number>(
        window.props.getPropertyValue('delayFeedback')
    );
    const [dryLevel, setDryLevel] = useState<number>(
        window.props.getPropertyValue('dryLevel')
    );
    const [wetLevel, setWetLevel] = useState<number>(
        window.props.getPropertyValue('wetLevel')
    );
    const [cutoff, setCutoff] = useState<number>(
        window.props.getPropertyValue('cutoff')
    );

    useEffect(() => {
        window.props.setPropertyValue('delayMode', delayMode);
    }, [delayMode]);

    useEffect(() => {
        if (!window.pluginCore.getDawPropertiesChangeLoadingEnabled())
            window.props.setPropertyValue('delayTime', delayTime);
    }, [delayTime]);

    useEffect(() => {
        if (!window.pluginCore.getDawPropertiesChangeLoadingEnabled())
            window.props.setPropertyValue('delayFeedback', delayFeedback);
    }, [delayFeedback]);

    useEffect(() => {
        if (!window.pluginCore.getDawPropertiesChangeLoadingEnabled())
            window.props.setPropertyValue('dryLevel', dryLevel);
    }, [dryLevel]);

    useEffect(() => {
        if (!window.pluginCore.getDawPropertiesChangeLoadingEnabled())
            window.props.setPropertyValue('wetLevel', wetLevel);
    }, [wetLevel]);

    useEffect(() => {
        if (!window.pluginCore.getDawPropertiesChangeLoadingEnabled())
            window.props.setPropertyValue('cutoff', cutoff);
    }, [cutoff]);

    useEffect(() => {
        window.props.onPropertyChange('delayMode', (value: DelayMode) => {
            setDelayMode(value);
        });

        window.props.onPropertyChange('delayTime', (value: number) => {
            setDelayTime(value);
        });

        window.props.onPropertyChange('delayFeedback', (value: number) => {
            setDelayFeedback(value);
        });

        window.props.onPropertyChange('dryLevel', (value: number) => {
            setDryLevel(value);
        });

        window.props.onPropertyChange('wetLevel', (value: number) => {
            setWetLevel(value);
        });

        window.props.onPropertyChange('cutoff', (value: number) => {
            setCutoff(value);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='app'>
            <div className='app-main'>
                <img src={'logo.png'} className='app-logo' alt='logo' />
                <h3>
                    SHAITAN<span>DELAY</span>
                </h3>
                <div className='main-knobs'>
                    <BigKnob
                        title='Time'
                        step={1 / 16}
                        smooth={true}
                        movementPowerAdjust={3}
                        value={delayTime}
                        color={1}
                        onChange={(newValue: number) => setDelayTime(newValue)}
                        onActivityChange={(active: boolean) =>
                            window.pluginCore.setDawPropertiesChangeLoadingEnabled(
                                !active
                            )
                        }
                    />
                    <BigKnob
                        title='Feedback'
                        value={delayFeedback}
                        color={2}
                        onChange={(newValue: number) =>
                            setDelayFeedback(newValue)
                        }
                        onActivityChange={(active: boolean) =>
                            window.pluginCore.setDawPropertiesChangeLoadingEnabled(
                                !active
                            )
                        }
                    />
                    <BigKnob
                        title='Dry'
                        value={dryLevel}
                        color={3}
                        onChange={(newValue: number) => setDryLevel(newValue)}
                        onActivityChange={(active: boolean) =>
                            window.pluginCore.setDawPropertiesChangeLoadingEnabled(
                                !active
                            )
                        }
                    />
                    <BigKnob
                        title='Wet'
                        value={wetLevel}
                        color={4}
                        onChange={(newValue: number) => setWetLevel(newValue)}
                        onActivityChange={(active: boolean) =>
                            window.pluginCore.setDawPropertiesChangeLoadingEnabled(
                                !active
                            )
                        }
                    />
                    <BigKnob
                        title='Cutoff'
                        value={cutoff}
                        color={5}
                        onChange={(newValue: number) => setCutoff(newValue)}
                        onActivityChange={(active: boolean) =>
                            window.pluginCore.setDawPropertiesChangeLoadingEnabled(
                                !active
                            )
                        }
                    />
                </div>
                <ItemsSwitch
                    onChange={(value) =>
                        setDelayMode((value as DelayMode) ?? DelayMode.Mono)
                    }
                    value={delayMode}
                    items={[
                        {
                            value: DelayMode.Mono,
                            title: 'Mono',
                            icon: 'circle',
                        },
                        {
                            value: DelayMode.Stereo,
                            title: 'Stereo',
                            icon: 'circle-half',
                        },
                        {
                            value: DelayMode.PingPong,
                            title: 'Ping-pong',
                            icon: 'circle-fill',
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default App;
