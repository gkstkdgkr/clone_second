"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("play");
var muteBtn = document.getElementById("mute");
var volumeRange = document.getElementById("volume");
var currentTime = document.getElementById("currentTime");
var totalTime = document.getElementById("totalTime");
var timeline = document.getElementById("timeline");
var volumeValue = 0.5;
video.volume = volumeValue;

var handlePlayClick = function handlePlayClick(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtn.innerText = video.paused ? "Pause" : "Play";
};

var handleMuteClick = function handleMuteClick(e) {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
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

  if (video.volume === 0) {
    muteBtn.innerText = "Unmute";
  } else {
    muteBtn.innerText = "Mute";
  }
};

var formatTime = function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};

var handleLoadedMetadata = function handleLoadedMetadata(e) {
  totalTime.innerText = formatTime(video.duration);
  timeline.max = Math.floor(video.duration);
};

var handleTimeUpdate = function handleTimeUpdate(e) {
  currentTime.innerText = formatTime(video.currentTime);
  timeline.value = Math.floor(video.currentTime);
};

var handleTimeChange = function handleTimeChange(e) {
  var value = e.target.value;
  video.currentTime = value;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimeChange);