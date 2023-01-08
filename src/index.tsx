import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { DelayMode } from './enums/DelayMode';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { WindowProps } from './global/WindowProps';
import { PluginCore } from './audio-core/PluginCore';

let rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

declare global {
    interface Window {
        props: WindowProps;
        pluginCore: PluginCore;
    }
}

window.props = new WindowProps([
    {
        name: 'bpm',
        value: 140,
    },
    {
        name: 'delayMode',
        value: DelayMode.Stereo,
    },
    {
        name: 'delayTime',
        value: 0.5,
    },
    {
        name: 'delayFeedback',
        value: 0.6,
    },
    {
        name: 'dryLevel',
        value: 1,
    },
    {
        name: 'wetLevel',
        value: 0.5,
    },
    {
        name: 'cutoff',
        value: 1,
    },
]);

window.pluginCore = new PluginCore();
window.pluginCore.init();
