console.log("It's gonna rain");

let audioContext = new AudioContext();

audioContext.resume()


fetch('MixPre-132.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => {
    startLoop1(audioBuffer, 1, 1.01);
    startLoop1(audioBuffer, -1, 1.0);
    startLoop2(audioBuffer, 1, 2.02);
    startLoop2(audioBuffer, -1, 2.0);
})
.catch(e => console.error(e));


fetch('vocal.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => {
    startVocalLoop(audioBuffer, 1, (2/3));
    startVocalLoop(audioBuffer, -1, .6666);
    startVocalLoop(audioBuffer, 1, (2/3));
    startVocalLoop(audioBuffer, -1, .6666);

    startVocalLoop(audioBuffer, 1, 1);
    startVocalLoop(audioBuffer, -1, 1.001);

    startVocalLoop(audioBuffer, -1, .5);
    startVocalLoop(audioBuffer, 1, .5001);

    startVocalLoop(audioBuffer, 0, 1.5);
})
.catch(e => console.error(e));


function startVocalLoop(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 1;
    sourceNode.loopEnd = 7;
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);

    sourceNode.start(0, 1);
}


function startLoop1(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    let delayNode = audioContext.createDelay();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    // sourceNode.loopStart = 22.1;
    // sourceNode.loopEnd = 30.04;
    sourceNode.loopStart = 60;
    sourceNode.loopEnd = 68;
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(delayNode);
    delayNode.connect(audioContext.destination);

    sourceNode.start(0, 66);
}


function startLoop2(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    let delayNode = audioContext.createDelay();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 21.1;
    sourceNode.loopEnd = 30.04;
    // sourceNode.loopStart = 60;
    // sourceNode.loopEnd = 68;
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(delayNode);
    delayNode.connect(audioContext.destination);

    sourceNode.start(0, 21.1);
}


document.querySelector('body').addEventListener('click', function() {
    audioContext.resume().then(() => {
      console.log('Playback resumed successfully');
    });
  });
  
// With help from:
// https://teropa.info/blog/2016/07/28/javascript-systems-music.html#is-this-for-me