const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let constrolsTimeout = null;
let constrolsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Pause" : "Play";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
  if (video.volume === 0) {
    muteBtn.innerText = "Unmute";
  } else {
    muteBtn.innerText = "Mute";
  }
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = (e) => {
  totalTime.innerText = formatTime(video.duration);
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = (e) => {
  currentTime.innerText = formatTime(video.currentTime);
  timeline.value = Math.floor(video.currentTime);
};

const handleTimeChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullScreen = (e) => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innertext = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innertext = "Exit Full Screen";
  }
};

const hideControls = () => {
  videoControls.classList.remove("showing");
};

const handleMouseMove = (e) => {
  if (constrolsTimeout) {
    clearTimeout(constrolsTimeout);
    constrolsTimeout = null;
  }
  if(constrolsMovementTimeout) {
    clearTimeout(constrolsMovementTimeout);
    constrolsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  constrolsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = (e) => {
  constrolsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimeChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
