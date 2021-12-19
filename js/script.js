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

