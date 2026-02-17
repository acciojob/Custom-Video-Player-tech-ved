const video = document.querySelector("video");
const toggle = document.querySelector(".player__button.toggle");
const progress = document.querySelector(".progress__filled");
const progressBar = document.querySelector(".progress");
const ranges = document.querySelectorAll(".player__slider");
const skipButtons = document.querySelectorAll("[data-skip]");

// play / pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update button icon
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.flexBasis = percent + "%";
}

// scrub progress
function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// range controls (volume / speed)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// events
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

ranges.forEach(r => r.addEventListener("input", handleRangeUpdate));
skipButtons.forEach(b => b.addEventListener("click", skip));

let mousedown = false;
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", e => mousedown && scrub(e));
progressBar.addEventListener("mousedown", () => (mousedown = true));
progressBar.addEventListener("mouseup", () => (mousedown = false));
