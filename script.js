const finalMessageButton = document.getElementById("finalMessageButton");
const finalModal = document.getElementById("finalModal");
const closeModal = document.getElementById("closeModal");

const audioButton = document.getElementById("audioButton");
const playlistSongButton = document.getElementById("playlistSongButton");
const audioText = document.getElementById("audioText");
const audioIcon = document.getElementById("audioIcon");

const farewellSong = document.getElementById("farewellSong");
const musicStartMessage = document.getElementById("musicStartMessage");
const startMusicButton = document.getElementById("startMusicButton");

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

farewellSong.volume = 0.5;

/* Final messages modal */

function openModal() {
  finalModal.classList.add("show");
  finalModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeModal.focus();
}

function closeMessageModal() {
  finalModal.classList.remove("show");
  finalModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  finalMessageButton.focus();
}

finalMessageButton.addEventListener("click", openModal);

closeModal.addEventListener("click", closeMessageModal);

finalModal.addEventListener("click", (event) => {
  if (event.target === finalModal) {
    closeMessageModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && finalModal.classList.contains("show")) {
    closeMessageModal();
  }
});

/* Song controls */

function updatePlayButtons(isPlaying) {
  if (isPlaying) {
    audioText.textContent = "Pause song";
    audioIcon.textContent = "❚❚";
    playlistSongButton.innerHTML = "<span>❚❚</span> Pause Alex's song";
  } else {
    audioText.textContent = "Play song";
    audioIcon.textContent = "♫";
    playlistSongButton.innerHTML = "<span>♫</span> Play Alex's song";
  }
}

async function playSong() {
  try {
    await farewellSong.play();

    updatePlayButtons(true);
    musicStartMessage.classList.remove("show");
  } catch (error) {
    console.log("Autoplay was blocked. User interaction is required.");
    musicStartMessage.classList.add("show");
  }
}

function pauseSong() {
  farewellSong.pause();
  updatePlayButtons(false);
}

function toggleSong() {
  if (farewellSong.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

/* Try to play music as soon as the page opens */

window.addEventListener("load", () => {
  playSong();
});

/* Fallback button if autoplay is blocked */

startMusicButton.addEventListener("click", () => {
  playSong();
});

/* Music buttons */

audioButton.addEventListener("click", toggleSong);
playlistSongButton.addEventListener("click", toggleSong);

farewellSong.addEventListener("ended", () => {
  farewellSong.currentTime = 0;
  updatePlayButtons(false);
});

farewellSong.addEventListener("error", () => {
  console.error(
    "Audio file not found. Make sure alex-song.mp3 is in the same folder as index.html."
  );

  audioText.textContent = "Song unavailable";
  audioIcon.textContent = "!";

  playlistSongButton.innerHTML = "<span>!</span> Song unavailable";
});