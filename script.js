
// Get the audio and buttons

const audio = document.getElementById("forestAudio");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const sceneButtons = document.querySelectorAll(".scene-button");
const scenes = document.querySelectorAll(".scene");

// Starting time for each sound

const startTimes = {
  wind: 26,
  birds: 0,
  footsteps: 10
};

// Change the background image

function showScene(name) {
  scenes.forEach(function(scene) {
    scene.classList.remove("active");
  });

  document.getElementById(name + "Scene").classList.add("active");

  sceneButtons.forEach(function(button) {
    button.classList.remove("selected");

    if (button.dataset.scene === name) {
      button.classList.add("selected");
    }
  });
}

// Click a scene button to jump to its sound

sceneButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const name = button.dataset.scene;

    audio.currentTime = startTimes[name];
    showScene(name);
    updateTime();
    audio.play();
  });
});

// Automatically change images during playback

function updateScene() {
  const time = audio.currentTime;

  if (time >= 26 && time < 46) {
    showScene("wind");
  } else if (
    (time >= 10 && time < 22) ||
    (time >= 57 && time < 69)
  ) {
    showScene("footsteps");
  } else {
    showScene("birds");
  }
}

// Play and pause button

playButton.addEventListener("click", function() {
  if (audio.paused) {
    if (audio.ended) {
      audio.currentTime = 0;
    }

    audio.play();
  } else {
    audio.pause();
  }
});

// Change button text when audio plays

audio.addEventListener("play", function() {
  playButton.textContent = "Pause";
  document.body.classList.add("playing");
  updateScene();
});

// Change button text when audio pauses

audio.addEventListener("pause", function() {
  playButton.textContent = "Play";
  document.body.classList.remove("playing");
});

// Format the audio time

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return minutes + ":" + String(remaining).padStart(2, "0");
}

// Update time and progress bar

function updateTime() {
  currentTime.textContent = formatTime(audio.currentTime);
  progress.value = audio.currentTime;
}

// Get audio duration

audio.addEventListener("loadedmetadata", function() {
  progress.max = audio.duration;
  totalTime.textContent = formatTime(audio.duration);
});

// Update the page while the audio plays

audio.addEventListener("timeupdate", function() {
  updateTime();
  updateScene();
});

// Allow users to move the progress bar

progress.addEventListener("input", function() {
  audio.currentTime = Number(progress.value);
  updateTime();
  updateScene();
});

// When the audio finishes

audio.addEventListener("ended", function() {
  playButton.textContent = "Play";
  document.body.classList.remove("playing");
});

// Starting image

showScene("birds");
