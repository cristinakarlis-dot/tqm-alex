const finalMessageButton = document.getElementById("finalMessageButton");
const finalModal = document.getElementById("finalModal");
const closeModal = document.getElementById("closeModal");
const audioButton = document.getElementById("audioButton");
const audioText = document.getElementById("audioText");
const audioIcon = document.getElementById("audioIcon");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

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

/* Ambiente sonoro sencillo, generado por el navegador */
let audioContext;
let ambientInterval;
let isAmbientPlaying = false;

function playAmbientTone() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(
    329.63,
    audioContext.currentTime + 1.7
  );

  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 2.6);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 2.7);
}

audioButton.addEventListener("click", () => {
  isAmbientPlaying = !isAmbientPlaying;

  if (isAmbientPlaying) {
    playAmbientTone();
    ambientInterval = setInterval(playAmbientTone, 3200);

    audioText.textContent = "Pause ambient sound";
    audioIcon.textContent = "❚❚";
  } else {
    clearInterval(ambientInterval);

    audioText.textContent = "Play ambient sound";
    audioIcon.textContent = "♫";
  }
});