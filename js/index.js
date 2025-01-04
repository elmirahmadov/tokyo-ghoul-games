const optionsButton = document.getElementById("options-button");
const optionsDiv = document.getElementById("options-div");
const closeOptionsButton = document.getElementById("close-options");
const toggleMusicButton = document.getElementById("toggle-music");
const audioElement = document.getElementById("audio");

optionsButton.addEventListener("click", function () {
  optionsDiv.style.display = "block";
});

closeOptionsButton.addEventListener("click", function () {
  optionsDiv.style.display = "none";
});

toggleMusicButton.addEventListener("click", function () {
  if (audioElement.paused) {
    audioElement.play();
    toggleMusicButton.textContent = "Turn On Music";
  } else {
    audioElement.pause();
    toggleMusicButton.textContent = "Turn Off Music";
  }
});

var loadingScreen = document.getElementById("loading");
var progressBar = document.querySelector(".loading-bar");
var progressText = document.querySelector(".progress-text");
var startGameButton = document.getElementById("start-game");

startGameButton.addEventListener("click", function (event) {
  event.preventDefault();
  loadingScreen.style.display = "block";

  var width = 0;

  var interval = setInterval(function () {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(function () {
        window.location.href = startGameButton.querySelector("a").href;
        loadingScreen.style.display = "none";
      }, 500);
    } else {
      width++;
      progressBar.style.width = width + "%";
      progressText.innerText = width + "%";
    }
  }, 50);
});

function quitGame() {
  window.open("", "_self");
  window.close();
}

function openShareDialog() {
  document.getElementById("options-div2").style.display = "block";
}

function copyLink() {
  const textToCopy = "https://example.com";
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const successMessage = document.getElementById("successMessage");
      successMessage.style.display = "block";

      setTimeout(() => {
        successMessage.style.display = "none";

        const optionsDiv = document.getElementById("options-div2");
        optionsDiv.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Error copying text: ", err);
    });
}
