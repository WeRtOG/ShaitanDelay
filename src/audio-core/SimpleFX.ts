export default class SimpleFX {
    elementary: any;
    sampleRate: number;

    public constructor(elementary: any, sampleRate: number) {
        this.elementary = elementary;
        this.sampleRate = sampleRate;
    }

    public modulate(x: number, rate: number, amount: number) {
        return this.elementary.add(
            x,
            this.elementary.mul(amount, this.elementary.cycle(rate))
        );
    }

    public flanger(x: any, bpm: number, amount = 0.5) {
        const lfo = this.modulate(5, this.bpm2ms(bpm, 0.25) / 60, 0.1);

        return this.elementary.add(
            this.elementary.mul(
                amount,
                this.elementary.delay(
                    { size: this.sampleRate },
                    this.elementary.ms2samps(lfo),
                    0.9,
                    x
                )
            ),
            x
        );
    }

    public fbdelay(delayTime: number, feedback: number, x: any) {
        return this.elementary.delay(
            { size: this.sampleRate },
            this.elementary.ms2samps(delayTime),
            feedback,
            x
        );
    }

    public bpm2ms(bpm: number, multiplier: number) {
        return (60000 / bpm) * multiplier;
    }
}
