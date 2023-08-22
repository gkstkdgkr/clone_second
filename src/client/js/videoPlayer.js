const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let constrolsTimeout = null;
let constrolsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
video.play(); // video 페이지 들어가자 마자 재생
playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause"; // 재생시 아이콘 변경


const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
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
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullscreen = (e) => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
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
  if (constrolsMovementTimeout) {
    clearTimeout(constrolsMovementTimeout);
    constrolsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  constrolsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = (e) => {
  constrolsTimeout = setTimeout(hideControls, 3000);
};

const videoScreenClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

const keyController = (e) => {
  if (e.keyCode === 32) {
    video.paused ? video.play() : video.pause();
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
  }
  if (e.keyCode === 37) {
    video.currentTime -= 5;
  } else if (e.keyCode === 39) {
    video.currentTime += 5;
  } else if (e.keyCode === 38) {
    video.volume += 0.1;
  } else if (e.keyCode === 40) {
    video.volume -= 0.1;
  }
  if (e.keyCode === 70) {
    const fullScreen = document.fullscreenElement;
    if (fullScreen) {
      document.exitFullscreen();
      fullScreenIcon.classList = "fas fa-expand";
    } else {
      videoContainer.requestFullscreen();
      fullScreenIcon.classList = "fas fa-compress";
    }
  }
  if (e.keyCode === 77) {
    video.muted = !video.muted;
    muteBtnIcon.classList = video.muted
      ? "fas fa-volume-mute"
      : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
  }
}

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  })
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("click", videoScreenClick);
window.addEventListener("keydown", keyController);