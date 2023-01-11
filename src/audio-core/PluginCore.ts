import { ConsolePlaceTag, ConsoleTools } from '../tools/console';

import { DelayMode } from '../enums/DelayMode';
import { PlayheadEvent } from '../interfaces/PlayheadEvent';
import SimpleFX from './SimpleFX';
import { WindowProperty } from '../global/WindowProps';
import { default as core } from '@elemaudio/plugin-renderer';
import { el as elementary } from '@elemaudio/core';

let consolePlaceTag = new ConsolePlaceTag({
    text: 'PluginCore',
    background: 'black',
    color: 'white',
});

export class PluginCore {
    private coreReady = false;

    private coreNeedsRerender = false;
    private dawPropertiesChangeLoadingEnabled = true;

    private simpleFX: SimpleFX;
    private sampleRate: number;
    private impulseDirectory: string;

    public constructor(sampleRate = 48000) {
        this.simpleFX = new SimpleFX(elementary, sampleRate);
        this.sampleRate = sampleRate;
        this.impulseDirectory = process.env.REACT_APP_IMPULSE_DIR ?? '';
    }

    private rerenderCore() {
        if (!this.coreReady) {
            ConsoleTools.warn(
                "Core can't be rendered because it's not initialized.",
                consolePlaceTag
            );
            return;
        }

        let delayMode =
            window.props.getPropertyValue('delayMode') ?? DelayMode.Stereo;
        let delayTime = window.props.getPropertyValue('delayTime') ?? 0;
        let delayFeedback = window.props.getPropertyValue('delayFeedback') ?? 0;
        let dryLevel = window.props.getPropertyValue('dryLevel') ?? 1;
        let wetLevel = window.props.getPropertyValue('wetLevel') ?? 0;
        let bpm = window.props.getPropertyValue('bpm') ?? 0;
        let cutoff = window.props.getPropertyValue('cutoff') ?? 0;

        let dryLeft = elementary.in({ channel: 0 });
        let dryRight = elementary.in({ channel: 1 });

        let delayMS = this.simpleFX.bpm2ms(bpm, 0.01 + delayTime * 1.99);

        let rightMSOffset = 0;

        switch (delayMode) {
            case DelayMode.Mono:
                rightMSOffset = 0;
                break;
            case DelayMode.Stereo:
                rightMSOffset = 50;
                break;
            case DelayMode.PingPong:
                rightMSOffset = delayMS + 50;
                break;
        }

        let wetLeft = this.simpleFX.fbdelay(delayMS, delayFeedback, dryLeft);
        let wetRight = this.simpleFX.fbdelay(delayMS, delayFeedback, dryRight);

        wetLeft = this.simpleFX.flanger(wetLeft, bpm, 0.2);
        wetRight = this.simpleFX.flanger(
            rightMSOffset === 0
                ? wetRight
                : this.simpleFX.fbdelay(rightMSOffset, 0, wetRight),
            bpm,
            0.2
        );

        const reverbLevels = ['min', 'mid', 'max'];

        let currentReverbLevel =
            reverbLevels[Math.round(delayFeedback * 3)] ?? 'error';

        let impulsePath =
            this.impulseDirectory +
            '/cathedral-1-' +
            currentReverbLevel +
            '.wav';

        let convolvedTailLeft = elementary.convolve(
            {
                path: impulsePath,
            },
            wetLeft
        );
        let convolvedTailRight = elementary.convolve(
            {
                path: impulsePath,
            },
            wetRight
        );

        wetLeft = elementary.add(
            elementary.mul(0.04, convolvedTailLeft),
            wetLeft
        );
        wetRight = elementary.add(
            elementary.mul(0.04, convolvedTailRight),
            wetRight
        );

        wetLeft = elementary.lowpass(cutoff * 5000, 1, wetLeft);
        wetRight = elementary.lowpass(cutoff * 5000, 1, wetRight);

        let mixedLeft = elementary.add(
            elementary.mul(wetLevel, wetLeft),
            elementary.mul(dryLevel, dryLeft)
        );
        let mixedRight = elementary.add(
            elementary.mul(wetLevel, wetRight),
            elementary.mul(dryLevel, dryRight)
        );

        let meterLeft = elementary.meter({ name: 'left' }, mixedLeft);
        let meterRight = elementary.meter({ name: 'right' }, mixedRight);

        core.render(meterLeft, meterRight);

        ConsoleTools.log('Audio core rendered', consolePlaceTag);
    }

    public getDawPropertiesChangeLoadingEnabled(): boolean {
        return this.dawPropertiesChangeLoadingEnabled;
    }

    public setDawPropertiesChangeLoadingEnabled(enabled: boolean) {
        if (enabled !== this.dawPropertiesChangeLoadingEnabled) {
            this.dawPropertiesChangeLoadingEnabled = enabled;
            ConsoleTools.log(
                'DAW properties change event LOCK ' +
                    (enabled ? 'disabled' : 'enabled'),
                consolePlaceTag
            );
        }
    }

    public init() {
        core.on('playhead', function (e: PlayheadEvent) {
            window.props.setPropertyValue('bpm', e.bpm);
        });

        window.props.onChange((prop: WindowProperty) => {
            ConsoleTools.log(
                "Global prop '" + prop.name + "' changed to " + prop.value,
                consolePlaceTag
            );

            this.coreNeedsRerender = true;

            let state = {} as any;

            window.props.getAllPropsExcept('bpm').forEach((prop) => {
                state[prop.name] = prop.value;
            });

            if (!this.dawPropertiesChangeLoadingEnabled) {
                core.dispatch('setParameterValue', prop);
                ConsoleTools.log('Changes sended to DAW', consolePlaceTag);
            }

            core.dispatch('saveState', JSON.stringify(state));
            ConsoleTools.log('State sended to DAW', consolePlaceTag);
        });

        setInterval(() => {
            if (this.coreNeedsRerender) {
                this.rerenderCore();
                this.coreNeedsRerender = false;
            }
        }, 100);

        core.on('error', (e) => ConsoleTools.error(e));

        core.on('meter', function (e) {
            /*if (e.source === 'left') {
                window.props.setPropertyValue('audioPeakL', e.max);
            }
            if (e.source === 'right') {
                window.props.setPropertyValue('audioPeakR', e.max);
            }*/
        });
        core.on('parameterValueChange', (e) => {
            if (this.dawPropertiesChangeLoadingEnabled) {
                ConsoleTools.log(
                    'Received update from DAW for property "' +
                        e.paramId +
                        '". Value: "' +
                        e.value,
                    consolePlaceTag
                );

                if (e.paramId === 'delayMode') e.value = Math.ceil(e.value * 2);

                window.props.setPropertyValue(e.paramId, e.value);
            }
        });
        core.on('loadState', (e) => {
            let parsedData = JSON.parse(e.value);

            ConsoleTools.log(
                'Received state from DAW: ',
                consolePlaceTag,
                parsedData
            );

            if (parsedData) {
                Object.keys(parsedData).forEach((key) => {
                    window.props.setPropertyValue(
                        key,
                        parsedData[key] ?? window.props.getPropertyValue(key)
                    );
                });
            }

            this.rerenderCore();
        });

        core.on('load', () => {
            ConsoleTools.log('Audio core loaded', consolePlaceTag);
            this.coreReady = true;

            this.rerenderCore();
            core.dispatch('resize', { width: 880, height: 550 });
        });

        core.initialize();
    }
}
