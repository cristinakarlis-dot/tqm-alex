const finalMessageButton = document.getElementById("finalMessageButton");
const finalModal = document.getElementById("finalModal");
const closeModal = document.getElementById("closeModal");

const meme3Card = document.getElementById("meme3Card");
const memeModal = document.getElementById("memeModal");
const closeMemeModalButton = document.getElementById("closeMemeModal");

const farewellSong = document.getElementById("farewellSong");
const audioButton = document.getElementById("audioButton");
const playlistSongButton = document.getElementById("playlistSongButton");
const audioText = document.getElementById("audioText");
const audioIcon = document.getElementById("audioIcon");

const musicStartMessage = document.getElementById("musicStartMessage");
const startMusicButton = document.getElementById("startMusicButton");

const carouselTrack = document.getElementById("carouselTrack");
const previousPhotoButton = document.getElementById("previousPhoto");
const nextPhotoButton = document.getElementById("nextPhoto");
const carouselDots = document.querySelectorAll(".carousel-dot");

const year = document.getElementById("year");

let currentPhoto = 0;
const totalPhotos = carouselDots.length;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (farewellSong) {
  farewellSong.volume = 0.5;
}

/* FINAL MESSAGES MODAL */

function openFinalModal() {
  finalModal.classList.add("show");
  finalModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeModal.focus();
}

function closeFinalModal() {
  finalModal.classList.remove("show");
  finalModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  finalMessageButton.focus();
}

finalMessageButton.addEventListener("click", openFinalModal);
closeModal.addEventListener("click", closeFinalModal);

finalModal.addEventListener("click", (event) => {
  if (event.target === finalModal) {
    closeFinalModal();
  }
});

/* FUNADOS MODAL */

function openFunadosModal() {
  memeModal.classList.add("show");
  memeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeMemeModalButton.focus();
}

function closeFunadosModal() {
  memeModal.classList.remove("show");
  memeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  meme3Card.focus();
}

meme3Card.addEventListener("click", openFunadosModal);

meme3Card.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openFunadosModal();
  }
});

closeMemeModalButton.addEventListener("click", closeFunadosModal);

memeModal.addEventListener("click", (event) => {
  if (event.target === memeModal) {
    closeFunadosModal();
  }
});

/* MUSIC */

function updateSongButtons(isPlaying) {
  if (isPlaying) {
    audioText.textContent = "Pause song";
    audioIcon.textContent = "❚❚";
    playlistSongButton.innerHTML = "❚❚ Pause Alex's song";
  } else {
    audioText.textContent = "Play song";
    audioIcon.textContent = "♫";
    playlistSongButton.innerHTML = "♫ Play Alex's song";
  }
}

async function playSong() {
  try {
    await farewellSong.play();
    updateSongButtons(true);
    musicStartMessage.classList.remove("show");
  } catch (error) {
    musicStartMessage.classList.add("show");
  }
}

function pauseSong() {
  farewellSong.pause();
  updateSongButtons(false);
}

function toggleSong() {
  if (farewellSong.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

window.addEventListener("load", playSong);

audioButton.addEventListener("click", toggleSong);
playlistSongButton.addEventListener("click", toggleSong);
startMusicButton.addEventListener("click", playSong);

farewellSong.addEventListener("ended", () => {
  farewellSong.currentTime = 0;
  updateSongButtons(false);
});

farewellSong.addEventListener("error", () => {
  audioText.textContent = "Song unavailable";
  audioIcon.textContent = "!";
});

/* PHOTO CAROUSEL */

function showPhoto(index) {
  if (!carouselTrack || totalPhotos === 0) {
    return;
  }

  currentPhoto = (index + totalPhotos) % totalPhotos;

  carouselTrack.style.transform = `translateX(-${currentPhoto * 100}%)`;

  carouselDots.forEach((dot, dotIndex) => {
    const active = dotIndex === currentPhoto;
    dot.classList.toggle("active", active);
    dot.setAttribute("aria-current", active ? "true" : "false");
  });
}

previousPhotoButton.addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
});

nextPhotoButton.addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
});

carouselDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showPhoto(Number(dot.dataset.slide));
  });
});

/* KEYBOARD */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (finalModal.classList.contains("show")) {
      closeFinalModal();
    }

    if (memeModal.classList.contains("show")) {
      closeFunadosModal();
    }
  }

  if (finalModal.classList.contains("show")) {
    if (event.key === "ArrowLeft") {
      showPhoto(currentPhoto - 1);
    }

    if (event.key === "ArrowRight") {
      showPhoto(currentPhoto + 1);
    }
  }
});