const sounds = [
  { name: "Vine Boom", file: "sounds/vine-boom.mp3" },
  { name: "Bruh", file: "sounds/bruh.mp3" },
  { name: "Aughh", file: "sounds/Aughh.mp3" },
  { name: "Fart", file: "sounds/fart.mp3" },
  { name: "Bone Crack", file: "sounds/bone-crack.mp3" },
  { name: "Darnaa", file: "sounds/Darnaa.mp3" },
  { name: "GET OUT!!", file: "sounds/Get-out.mp3" },
  { name: "Punch", file: "sounds/Punch.mp3" }
];

const soundList = document.getElementById("soundList");
const searchBar = document.getElementById("searchBar");

let currentAudio = null; // Track the currently playing audio

function renderSounds(filter = "") {
  soundList.innerHTML = "";
  sounds
    .filter(sound => sound.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(sound => {
      const card = document.createElement("div");
      card.className = "sound-card";

      const audio = document.createElement("audio");
      audio.controls = true;

      const source = document.createElement("source");
      source.src = sound.file;
      source.type = "audio/mpeg";
      audio.appendChild(source);

      card.innerHTML = `<h3>${sound.name}</h3>`;
      card.appendChild(audio);

      // Download button
      const downloadLink = document.createElement("a");
      downloadLink.href = sound.file;
      downloadLink.download = "";
      const button = document.createElement("button");
      button.textContent = "Download";
      downloadLink.appendChild(button);
      card.appendChild(document.createElement("br"));
      card.appendChild(downloadLink);

      // Handle audio play logic
      audio.addEventListener("play", () => {
        if (currentAudio && currentAudio !== audio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          currentAudio.closest(".sound-card")?.classList.remove("playing");
        }

        currentAudio = audio;
        card.classList.add("playing");
      });

      audio.addEventListener("pause", () => {
        card.classList.remove("playing");
      });

      audio.addEventListener("ended", () => {
        card.classList.remove("playing");
      });

      soundList.appendChild(card);
    });
}

// Search filtering
searchBar.addEventListener("input", (e) => {
  renderSounds(e.target.value);
});

// Initial render
renderSounds();
