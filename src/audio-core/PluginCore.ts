import { el as elementary } from '@elemaudio/core';
import { default as core } from '@elemaudio/plugin-renderer';
import { DelayMode } from '../enums/DelayMode';
import { WindowProperty } from '../global/WindowProps';
import { PlayheadEvent } from '../interfaces/PlayheadEvent';
import FX from './FX';

export class PluginCore {
    private rerenderCore() {
        let sampleRate = 48000;

        let delayMode = window.props.getPropertyValue('delayMode') ?? DelayMode.Stereo;
        let delayTime = window.props.getPropertyValue('delayTime') ?? 0;
        let delayFeedback = window.props.getPropertyValue('delayFeedback') ?? 0;
        let dryLevel = window.props.getPropertyValue('dryLevel') ?? 1;
        let wetLevel = window.props.getPropertyValue('wetLevel') ?? 0;
        let bpm = window.props.getPropertyValue('bpm') ?? 0;
        let cutoff = window.props.getPropertyValue('cutoff') ?? 0;

        let fx = new FX(elementary, sampleRate);

        let dryLeft = elementary.in({ channel: 0 });
        let dryRight = elementary.in({ channel: 1 });

        let delayMS = fx.bpm2ms(bpm, 0.01 + delayTime * 0.99);

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

        let tailLeft = fx.fbdelay(delayMS, delayFeedback, dryLeft);
        let tailRight = fx.fbdelay(delayMS, delayFeedback, dryRight);

        let wetLeft = elementary.lowpass(
            cutoff * 5000,
            1,
            fx.flanger(tailLeft, bpm, 0.4)
        );
        let wetRight = elementary.lowpass(
            cutoff * 5000,
            1,
            fx.flanger(
                rightMSOffset === 0 ? tailRight : fx.fbdelay(rightMSOffset, 0, tailRight),
                bpm,
                0.4
            )
        );

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
    }

    public init() {

        core.on('playhead', function (e: PlayheadEvent) {
            window.props.setPropertyValue('bpm', e.bpm);
        });

        let coreNeedToBeUpdated = false;

        window.props.onChange((prop: WindowProperty) => {
            coreNeedToBeUpdated = true;

            let state = {} as any;

            window.props.getAllPropsExcept('bpm').forEach(prop => {
                state[prop.name] = prop.value;
            });

            console.log(state);

            core.dispatch('saveState', JSON.stringify(state));
        });

        setInterval(() => {
            if (coreNeedToBeUpdated) {
                this.rerenderCore();
                coreNeedToBeUpdated = false;
            }
        }, 100);

        core.on('meter', function (e) {
            /*if (e.source === 'left') {
                window.props.setPropertyValue('audioPeakL', e.max);
            }
            if (e.source === 'right') {
                window.props.setPropertyValue('audioPeakR', e.max);
            }*/
        });
        core.on('parameterValueChange', (e) => {
            if (e.paramId === 'delayMode')
                e.value = Math.ceil(e.value * 2);

            window.props.setPropertyValue(e.paramId, e.value);
        });
        core.on('loadState', (e) => {
            let parsedData = JSON.parse(e.value);

            if (parsedData) {
                window.props.setPropertyValue('delayMode', parsedData?.delayMode ?? window.props.getPropertyValue('delayMode'));
                window.props.setPropertyValue('delayTime', parsedData?.delayTime ?? window.props.getPropertyValue('delayTime'));
                window.props.setPropertyValue('delayFeedback', parsedData?.delayFeedback ?? window.props.getPropertyValue('delayFeedback'));
                window.props.setPropertyValue('dryLevel', parsedData?.dryLevel ?? window.props.getPropertyValue('dryLevel'));
                window.props.setPropertyValue('wetLevel', parsedData?.wetLevel ?? window.props.getPropertyValue('wetLevel'));
                window.props.setPropertyValue('cutoff', parsedData?.cutoff ?? window.props.getPropertyValue('cutoff'));
            }

            this.rerenderCore();
        });
        core.on('load', () => {
            this.rerenderCore();
            core.dispatch('resize', { width: 880, height: 550 });
        });

        core.initialize();
    }
}