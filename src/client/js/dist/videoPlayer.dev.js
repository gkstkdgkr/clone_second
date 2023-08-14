"use strict";

var video = document.querySelector("video");
var playBtn = document.getElementById("play");
var muteBtn = document.getElementById("mute");
var time = document.getElementById("time");
var volume = document.getElementById("volume");

var handlePlayClick = function handlePlayClick(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

var handlePause = function handlePause() {
  return playBtn.innerText = "Play";
};

var handlePlay = function handlePlay() {
  return playBtn.innerText = "Pause";
};

var handleMute = function handleMute(e) {};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);