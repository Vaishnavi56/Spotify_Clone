console.log("Welcome to Spotify")

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('/Songs/Your-Eyes.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName: "Your Eyes", filepath:'/Songs/Your-Eyes.mp3', coverPath:"https://i.scdn.co/image/ab67616d0000b2737704566a51ab17c885221bde"},
    {songName: "People", filepath:'/Songs/People.mp3', coverPath:"https://c.saavncdn.com/607/People-English-2022-20221207081653-500x500.jpg"},
    {songName: "Unstoppable", filepath:'/Songs/Unstoppable.mp3', coverPath:"https://i1.sndcdn.com/artworks-000162499586-vifye7-t240x240.jpg"},
    {songName: "Cheap-Thrills", filepath:'/Songs/Cheap-Thrills.mp3', coverPath:"https://i.scdn.co/image/ab67616d0000b2737e04bf4a31775b010c6786e1"},
    {songName: "Faded", filepath:'/Songs/Faded.mp3', coverPath:"https://upload.wikimedia.org/wikipedia/en/d/da/Alan_Walker_-_Faded.png"},
    {songName: "Bones", filepath:'/Songs/BONES.mp3', coverPath:"https://c.saavncdn.com/038/Bones-English-2022-20220311113603-500x500.jpg"},
    {songName: "Believer", filepath:'/Songs/Believer.mp3', coverPath:"https://upload.wikimedia.org/wikipedia/en/5/5c/Imagine-Dragons-Believer-art.jpg"},
    {songName: "Lovely", filepath:'/Songs/Lovely.mp3', coverPath:"https://c.saavncdn.com/947/lovely-English-2018-20180418150240-500x500.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}


// Function to auto play the next song
const playNextSong = () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    makeAllPlays();
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
};
audioElement.addEventListener('ended', playNextSong);


// Function to play from 1st after last song
const playNextSong1 = () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    audioElement.src = songs[songIndex-1].filepath;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

// Event listener for the 'ended' event of the audio element
audioElement.addEventListener('ended', playNextSong1);



// Function to update the play/pause button in the song items
const updateSongItemPlayButton = () => {
    songItems.forEach((item) => {
        const playButton = item.getElementsByClassName('songItemPlay')[0];
        playButton.classList.remove('fa-pause-circle');
        playButton.classList.add('fa-play-circle');
    });

    const activeSongItem = songItems[songIndex];
    const activePlayButton = activeSongItem.getElementsByClassName('songItemPlay')[0];
    activePlayButton.classList.remove('fa-play-circle');
    activePlayButton.classList.add('fa-pause-circle');
};


// Update the play/pause button in the song items when clicked at the bottom
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        updateSongItemPlayButton();
    } else {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        updateSongItemPlayButton();
        
    }
});

//Main Functioning
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `/Songs/${songs[songIndex].songName}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//Next Button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `/Songs/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//Previous Button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `/Songs/${songs[songIndex].songName}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})