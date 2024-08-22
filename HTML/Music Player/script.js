console.log("welcome to Spotify");
// initalize the variables 
let songIndex= 0
let audioElement = new Audio('songs/1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let songitems= Array.from(document.getElementsByClassName('songItem'));
let masterSongName= document.getElementById('masterSongName');
let songs=[
    { songName:"Live Forever", filePath: 'songs/1.mp3', coverPath:'covers/1.webp'},
    { songName: "Closer", filePath:"songs/2.mp3", coverPath:'covers/2.webp'},
    { songName: "Faded", filePath:"songs/3.mp3", coverPath:'covers/3.webp'},
    { songName: "Get Low", filePath:"songs/4.mp3", coverPath:"covers/4.webp"},
    { songName: "I Wish I Could", filePath:"songs/5.mp3", coverPath:"covers/5.webp"},
    { songName: "Night Changes", filePath:"songs/6.mp3", coverPath:"covers/6.webp"},
]

 songitems.forEach((element, i) => { 
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText =songs[i].songName;
 })
// audioElement.play();
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <=0 ){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add ('fa-pause-circle')
        gif.style.opacity= 1;
    }
   else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
   
})
// add event listener
audioElement.addEventListener('timeupdate', ()=> {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;
    
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime= ((myProgressBar.value*audioElement.duration)/100)
})

const makeAllPlay =( )=>{
    if (audioElement.paused)
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        songIndex= parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex}.mp3`;
        audioElement.play();
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText= songs[songIndex-1].songName;
        gif.style.opacity= 1;
        
        
    })
})

document.getElementById('masterForward').addEventListener('click', ()=> {
    if(songIndex > 5){
        songIndex= 1
    }
    else{
        songIndex += 1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText= songs[songIndex-1].songName;
    gif.style.opacity= 1;
})
document.getElementById('masterPrevious').addEventListener('click', ()=> {
    if(songIndex <1){
        songIndex= 6
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText= songs[songIndex-1].songName;
    gif.style.opacity= 1;
})
