export interface PlayheadEvent {
    bpm: number;
    timeSigNumerator: number;
    timeSigDenominator: number;
    sampleTime: number;
    ppqPosition: number;
    ppqLoopStart: number;
    ppqLoopEnd: number;
    isPlaying: boolean;
    isRecording: boolean;
    isLooping: boolean;
}
