import { AudioOut, BellInstrument } from './audio-lib';

const audioContext = new AudioContext();
const audioOut = new AudioOut(audioContext);
const bells = [
  new BellInstrument(audioContext, 164),
  new BellInstrument(audioContext, 196),
  new BellInstrument(audioContext, 220)
];

for (let i = 0; i < 3; i++) {
  const btn = document.getElementById(`btn${i + 1}`);

  bells[i].connectOutput(audioOut);
  btn.addEventListener('mousedown', () => bells[i].strike());
}

const now = audioContext.currentTime;

bells[0].strike(now + 0.00);
bells[1].strike(now + 0.25);
bells[2].strike(now + 0.50);
bells[1].strike(now + 0.75);
bells[0].strike(now + 1.00);
bells[1].strike(now + 1.25);
bells[2].strike(now + 1.50);
bells[1].strike(now + 1.75);
bells[0].strike(now + 2.00);
bells[1].strike(now + 2.25);
bells[2].strike(now + 2.50);
bells[1].strike(now + 2.75);
bells[0].strike(now + 3.00);
bells[1].strike(now + 3.25);
bells[2].strike(now + 3.50);
bells[1].strike(now + 3.75);
