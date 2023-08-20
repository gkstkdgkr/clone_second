import { createFFmgeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recoder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmgeg({ log: true });
  await ffmpeg.load();

  // ffmpeg 공간의 가상의 파일 생성
  ffmpeg.FS("writeFile", "recoding.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recoding.webm", "-r", "60", "output.mp4");
  // input형식 recoding.webm파일을 -r , 60 60프레임으로 인코딩 결과값 "output.mp4"
  await ffmpeg.run(
    "-i",
    "recoding.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob= new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecoding.mp4";
  document.body.appendChild(a);
  a.click();

  const thumbaA = document.createElement("a");
  thumbaA.href = mp4Url;
  thumbaA.download = "MyThumbnail.jpg";
  document.body.appendChild(thumbaA);
  thumbaA.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
  recoder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recoder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recoder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recoder.start();
  setTimeout(() => {
    recoder.stop();
  }, 10000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  // video.srcObject = stream;
  video.play();
};
init();

startBtn.addEventListener("click", handleStart);
