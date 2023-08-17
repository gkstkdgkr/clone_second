"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("play");
var playBtnIcon = playBtn.querySelector("i");
var muteBtn = document.getElementById("mute");
var muteBtnIcon = muteBtn.querySelector("i");
var volumeRange = document.getElementById("volume");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var timeline = document.getElementById("timeline");
var fullScreenBtn = document.getElementById("fullScreen");
var fullScreenIcon = fullScreenBtn.querySelector("i");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.getElementById("videoControls");
var constrolsTimeout = null;
var constrolsMovementTimeout = null;
var volumeValue = 0.5;
video.volume = volumeValue;

var handlePlayClick = function handlePlayClick(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

var handleMuteClick = function handleMuteClick(e) {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

var handleVolumeChange = function handleVolumeChange(e) {
  var value = e.target.value;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  volumeValue = value;
  video.volume = value;
};

var formatTime = function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};

var handleLoadedMetadata = function handleLoadedMetadata() {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

var handleTimeUpdate = function handleTimeUpdate() {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

var handleTimelineChange = function handleTimelineChange(e) {
  var value = e.target.value;
  video.currentTime = value;
};

var handleFullscreen = function handleFullscreen(e) {
  var fullScreen = document.fullscreenElement;

  if (fullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

var hideControls = function hideControls() {
  videoControls.classList.remove("showing");
};

var handleMouseMove = function handleMouseMove(e) {
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

var handleMouseLeave = function handleMouseLeave(e) {
  constrolsTimeout = setTimeout(hideControls, 3000);
};

var videoScreenClick = function videoScreenClick(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

var keyController = function keyController(e) {
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
    var fullScreen = document.fullscreenElement;

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
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
  }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("click", videoScreenClick);
window.addEventListener("keydown", keyController);