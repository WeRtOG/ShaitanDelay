import { useEffect, useState } from 'react';
import './App.scss';
import BigKnob from './components/BigKnob/BigKnob';
import { ItemsSwitch } from './components/ItemsSwitch/ItemsSwitch';
import { DelayMode } from './enums/DelayMode';

function App() {
    const [delayMode, setDelayMode] = useState<DelayMode>(window.props.getPropertyValue('delayMode'));
    const [delayTime, setDelayTime] = useState<number>(window.props.getPropertyValue('delayTime'));
    const [delayFeedback, setDelayFeedback] = useState<number>(window.props.getPropertyValue('delayFeedback'));
    const [dryLevel, setDryLevel] = useState<number>(window.props.getPropertyValue('dryLevel'));
    const [wetLevel, setWetLevel] = useState<number>(window.props.getPropertyValue('wetLevel'));
    const [cutoff, setCutoff] = useState<number>(window.props.getPropertyValue('cutoff'));

    useEffect(() => {
        window.props.setPropertyValue('delayMode', delayMode);
    }, [delayMode]);

    useEffect(() => {
        window.props.setPropertyValue('delayTime', delayTime);
    }, [delayTime]);

    useEffect(() => {
        window.props.setPropertyValue('delayFeedback', delayFeedback);
    }, [delayFeedback]);

    useEffect(() => {
        window.props.setPropertyValue('dryLevel', dryLevel);
    }, [dryLevel]);

    useEffect(() => {
        window.props.setPropertyValue('wetLevel', wetLevel);
    }, [wetLevel]);

    useEffect(() => {
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
        <div className='App'>
            <header className='App-header'>
                <img
                    src={
                        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/570c38db-b922-4261-bc53-2d9152ba7c03/d7s2zft-696a3d25-ec63-4dfe-bc1d-8038c137bcd2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU3MGMzOGRiLWI5MjItNDI2MS1iYzUzLTJkOTE1MmJhN2MwM1wvZDdzMnpmdC02OTZhM2QyNS1lYzYzLTRkZmUtYmMxZC04MDM4YzEzN2JjZDIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LtxKWW74CaUcpySg2EGy9NVjSE6iBEiQh3xJ62lsPbc'
                    }
                    className='App-logo'
                    alt='logo'
                />
                <h3>
                    SHAITAN<span>DELAY</span>
                </h3>
                <div className='main-knobs'>
                    <BigKnob
                        title='Time'
                        step={0.125}
                        smooth={true}
                        movementPowerAdjust={3}
                        value={delayTime}
                        color={1}
                        onChange={(newValue: number) => setDelayTime(newValue)}
                    />
                    <BigKnob
                        title='Feedback'
                        value={delayFeedback}
                        color={2}
                        onChange={(newValue: number) => setDelayFeedback(newValue)}
                    />
                    <BigKnob
                        title='Dry'
                        value={dryLevel}
                        color={3}
                        onChange={(newValue: number) => setDryLevel(newValue)}
                    />
                    <BigKnob
                        title='Wet'
                        value={wetLevel}
                        color={4}
                        onChange={(newValue: number) => setWetLevel(newValue)}
                    />
                    <BigKnob
                        title='Cutoff'
                        value={cutoff}
                        color={5}
                        onChange={(newValue: number) => setCutoff(newValue)}
                    />
                </div>
                <ItemsSwitch onChange={(value) => setDelayMode(value as DelayMode ?? DelayMode.Mono)} value={delayMode} items={[
                    { value: DelayMode.Mono, title: 'Mono', icon: 'circle' },
                    { value: DelayMode.Stereo, title: 'Stereo', icon: 'circle-half' },
                    { value: DelayMode.PingPong, title: 'Ping-pong', icon: 'circle-fill' },
                ]} />
            </header>
        </div>
    );
}

export default App;
