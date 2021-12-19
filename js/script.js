const container = document.querySelector(".container");
const songImg = container.querySelector(".album-cover-img img");
const songName = container.querySelector(".album-info .name");
const songArtist = container.querySelector(".album-info .artist");
const mainSong = container.querySelector("#main-song");
const playpauseBtn = container.querySelector(".play-pause");
const nextBtn = container.querySelector("#next-btn");
const prevBtn = container.querySelector("#prev-btn");
const volumeControl = container.querySelector("#volume-control");
const playArea = container.querySelector(".play-area");
const slideBar = container.querySelector(".slide-bar");
const playList = container.querySelector(".playlist");
const musicListBtn = container.querySelector("#music-list");
const closeMusicList = container.querySelector("#closelist");


// load music function
function loadSongs(indexNumb) {
    songName.innerText = allSongs[indexNumb - 1].name;
    songArtist.innerText = allSongs[indexNumb - 1].artist;
    songImg.src = `./img/${allSongs[indexNumb - 1].img}.jpg`;
    mainSong.src = `./songs/${allSongs[indexNumb - 1].src}.mp3`;
}

// play music function
function playAudio() {
    container.classList.add("paused");
    playpauseBtn.innerHTML = '<i class="fa fa-pause">';
    mainSong.play();
}

// pause music function
function pauseAudio() {
    container.classList.remove("paused");
    playpauseBtn.innerHTML= '<i class="fa fa-play">';
    mainSong.pause();
}

// Next Music function
function nextSong() {
    songIndex++; //increment of musicIndex by 1
    // if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    songIndex > allSongs.length ? songIndex = 1 : songIndex = songIndex;
    loadSongs(songIndex);
    playAudio();
    playingMusic();
}

// Prev Music function
function prevSong() {
    songIndex--; 
    songIndex < 1 ? songIndex = allSongs.length : songIndex = songIndex;
    loadSongs(songIndex);
    playAudio();
    playingMusic();
}

// play or Pause button event
playpauseBtn.addEventListener("click", () => {
    const isAudioPaused = container.classList.contains("paused");
    isAudioPaused ? pauseAudio() : playAudio();

});

// next music button event
nextBtn.addEventListener("click", () => {
    nextSong();
});


// prev music button event
prevBtn.addEventListener("click", () => {
    prevSong();
});
