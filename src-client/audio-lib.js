export class AudioNode {
  constructor (ctx) {
    this._ctx = ctx;
  }

  get audioNode () {
    return this._audioNode;
  }

  get defaultOutputPoint () {
    return this._audioNode;
  }

  get defaultInputPoint () {
    return this._audioNode;
  }

  connectInput (nc) {
    nc.defaultOutputPoint.connect(this.defaultInputPoint);
  }
  connectOutput (nc) {
    this.defaultOutputPoint.connect(nc.defaultInputPoint);
  }
}

export class AudioOut extends AudioNode {
  constructor (ctx) {
    super(ctx);
    this._audioNode = ctx;
  }

  get defaultInputPoint () {
    return this._audioNode.destination;
  }

  connectInput (nc) {
    nc.audioNode.connect(this._audioNode.destination);
  }

  connectOutput () {
    throw Error('Can not connect output to audio out');
  }
}

export class Amp extends AudioNode {
  set gain (value) {
    this._audioNode.gain.value = value;
  }

  constructor (ctx) {
    super(ctx);
    const amp = ctx.createGain();

    amp.gain.value = 0;
    this._audioNode = amp;
  }

  setGain (value, start = this._ctx.currentTime) {
    this._audioNode.gain.setValueAtTime(value, start);
  }

  rampGain (value, delay, start = this._ctx.currentTime) {
    this._audioNode.gain.cancelScheduledValues(start);
    this._audioNode.gain.linearRampToValueAtTime(value, start + delay);
  }
}

export class Osc extends AudioNode {
  constructor (ctx, oscType) {
    super(ctx);
    const osc = ctx.createOscillator();

    osc.type = oscType;
    osc.frequency.value = 0;
    this._audioNode = osc;
  }

  get defaultInputPoint () {
    return this._audioNode.frequency;
  }

  get frequency () {
    return this._audioNode.frequency.value;
  }

  set frequency (value) {
    this._audioNode.frequency.value = value;
  }

  connectFrequencyInput (nc) {
    nc.audioNode.connect(this._audioNode.frequency);
  }

  start (time = 0) {
    this._audioNode.start(time);
  }

  stop () {
    this._audioNode.stop();
  }
}

export class SinOsc extends Osc {
  constructor (ctx) {
    super(ctx, 'sine');
  }
}

export class SawOsc extends Osc {
  constructor (ctx) {
    super(ctx, 'sawtooth');
  }
}

export class BellInstrument {
  constructor (ctx, freq) {
    this._ctx = ctx;
    this._osc = new SinOsc(ctx);
    this._amp = new Amp(ctx);

    this._osc.frequency = freq;
    this._osc.connectOutput(this._amp);
    this._osc.start();
  }

  connectOutput (nd) {
    this._amp.connectOutput(nd);
  }

  strike (start = this._ctx.currentTime) {
    this._amp.setGain(0.5, start);
    this._amp.rampGain(0.0, 0.1, start + 0.1);
  }
}
