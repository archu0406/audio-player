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

let songIndex = Math.floor((Math.random() * allSongs.length) + 1);

window.addEventListener("load", () => {
    loadSongs(songIndex);
    playingMusic();
});


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

//Adding volume control to the song
volumeControl.addEventListener("click", (e) => {
    mainSong.volume = e.currentTarget.value / 100;
   
});

// update sliderbar width according to music current time
mainSong.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //getting playing song currenttime
    const duration = e.target.duration; //getting playing total song duration
    let sliderWidth = (currentTime / duration) * 100;
    slideBar.style.width = `${sliderWidth}%`;

    let songCurrentTime = container.querySelector(".current-time"),
        songDuration = container.querySelector(".max-time");
    mainSong.addEventListener("loadeddata", () => {

        //  update song total duration
        let mainSongDuration = mainSong.duration;
        let totalMin = Math.floor(mainSongDuration / 60);
        let totalSec = Math.floor(mainSongDuration % 60);
        if (totalSec < 10) { //if sec is less than 10 then add 0 before it
            totalSec = `0${totalSec}`;
        }

        songDuration.innerText = `${totalMin}:${totalSec}`;

    });

    //update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) { //if sec is less than 10 then add 0 before it
        currentSec = `0${currentSec}`;
    }

    songCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

// update playing song current width onaccording to the slide bar width

playArea.addEventListener("click", (e) => {
    let sliderWidth = playArea.clientWidth; //getting width of slide bar
    let clickedOffsetX = e.offsetX; //getting offset x value
    let audioDuration = mainSong.duration; //getting song total duration

    mainSong.currentTime = (clickedOffsetX / sliderWidth) * audioDuration;
    playAudio();

});

//loop to the next song once the prev song is ended
mainSong.addEventListener("ended", () => {
    nextSong();
    playAudio();
});

// show the playlist onclick music icon
musicListBtn.addEventListener("click", () => {
    playList.classList.toggle("show");
});
closeMusicList.addEventListener("click", () => {
    musicListBtn.click();
});


const ulList = container.querySelector("ul");

// let create li tags according to array length for list

for (let i = 0; i < allSongs.length; i++) {
   
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
      <span>${allSongs[i].name}</span>
      <p>${allSongs[i].artist}</p>
    </div>
    <audio class="${allSongs[i].src}" src="./songs/${allSongs[i].src}.mp3">Attention</audio>
    <span id="${allSongs[i].src}" class="song-duration">1:45</span>
  </li>`;
  
  ulList.insertAdjacentHTML("beforeend", liTag);
   
  let liSongTag = ulList.querySelector(`.${allSongs[i].src}`);
  let liSongDurationTag = ulList.querySelector(`#${allSongs[i].src}`);

  liSongTag.addEventListener("loadeddata", () => {
    let duration = liSongTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) { //if sec is less than 10 then add 0 before it
        totalSec = `0${totalSec}`;
    }

     liSongDurationTag.innerText = `${totalMin}:${totalSec}`;
     liSongTag.innerText = `${allSongs[i].src}`;
//     // adding t-duration attribute with total duration value
       liSongDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
   });
}

const allLiSonglist = ulList.querySelectorAll("li");
function playingMusic() {
    for (let j = 0; j < allLiSonglist.length; j++) {
   let songTag = allLiSonglist[j].querySelector(".song-duration");
        // let remove playing class from all other li expect the last one which is clicked
        if(allLiSonglist[j].classList.contains("playing")){
            allLiSonglist[j].classList.remove("playing");
        //  let's get that audio duration value and pass to .audio-duration innertext
        let songDuration = songTag.getAttribute("t-duration");
        songTag.innerText = songDuration;
        }
    
        // if there is an li tag which li index is equal to musicIndex
        // then this music is playing now and we'll style it
    
        if(allLiSonglist[j].getAttribute("li-index") == songIndex){
            allLiSonglist[j].classList.add("playing");
            songTag.innerText = "Playing";
        }

        // adding on click attribute in all li tags
        allLiSonglist[j].setAttribute("onclick", "clicked(this)");
    }
}

// lets play song on click li 
function clicked(element){

    // getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index");
    songIndex =  getLiIndex; //passing that liindex to musicIndex
    loadSongs(songIndex);
    playAudio(); 
    playingMusic();  
}