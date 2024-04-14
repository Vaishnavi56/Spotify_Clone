console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
const audioElement = new Audio();
audioElement.src = songs[songIndex].filepath;

// DOM Elements
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const masterSongName = document.getElementById('masterSongName');
const songItems = Array.from(document.getElementsByClassName('songItem'));

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updatePlayButton(true); // Force to play icon on load
}); 

// Display Song Items
songItems.forEach((element, i) => {
    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;
});

// Play/Pause Button Click Event
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playAudio();
    } else {
        pauseAudio();
    }
    updatePlayButton();
});

// Update Play/Pause Button and Song Name
const updatePlayButton = (forcePlay =  false) => {
    if(forcePlay) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; 
    } else{
        masterPlay.classList.toggle('fa-play-circle');
        masterPlay.classList.toggle('fa-pause-circle');
        gif.style.opacity = audioElement.paused ? 0 : 1;
    }
    
};

const playAudio = () => {
    audioElement.play();
    updatePlayButton();
};

const pauseAudio = () => {
    audioElement.pause();
    updatePlayButton();
};

// Time Update Event
audioElement.addEventListener('timeupdate', () => {
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
});

// Progress Bar Change Event
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

// Song Item Click Event
songItems.forEach((item, index) => {
    item.querySelector(".songItemPlay").addEventListener('click', () => {
        if (songIndex !== index) {
            songIndex = index;
            audioElement.src = songs[songIndex].filepath;
            masterSongName.innerText = songs[songIndex].songName;
            playAudio();
            updateSongItems();
        } else {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                playAudio();
            } else {
                pauseAudio();
            }
        }
    });
});

// Update Song Items
const updateSongItems = () => {
    songItems.forEach((item, index) => {
        const playButton = item.querySelector('.songItemPlay');
        playButton.classList.toggle('fa-play-circle', index !== songIndex || !audioElement.paused);
        playButton.classList.toggle('fa-pause-circle', index === songIndex && !audioElement.paused);
    });
};

// Next Button Click Event
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    playAudio();
    updateSongItems();
});

// Previous Button Click Event
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    playAudio();
    updateSongItems();
});

// Ended Event
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    playAudio();
    updateSongItems();
});

