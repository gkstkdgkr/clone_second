const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream;
let recoder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement('a');
  a.href = videoFile;
  a.download = 'my recoding.mp4';
  document.body.appendChild(a);
  a.click();


}


const handleStop = () => {
  startBtn.innerText = 'Start Recording';
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
}

const handleStart = () => {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recoder = new MediaRecorder(stream, { mimeType: 'video/mp4');
  recoder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data)
    video.srcObject = null
    video.src = videoFile
    video.play()
  }
  recoder.start();
  setTimeout(() =>{
    recoder.stop();
  },10000);
}

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  // video.srcObject = stream;
  video.play();
};
init()

startBtn.addEventListener('click', handleStart);
