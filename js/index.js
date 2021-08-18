const app = () =>{
  //page onload
  document.addEventListener("DOMContentLoaded",()=>{
    video.pause();
  })
  // fetching 
  const song = document.querySelector(".music");
  const playBtn = document.querySelector(".play")
  const outline =  document.querySelector(".moving-outline circle");
  const videoContainer =  document.querySelector(".vid");
  const video =  document.querySelector(".video");

  // sounds btn
  const changeBtn = document.querySelectorAll(".sound-picker button");
  const timeDisplay = document.querySelector(".time-display");
  // time-select btn
  const timeSelectBtn = document.querySelectorAll(".time-select button");
  
  //get the length of the outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);

  //Duration 
  let fakeDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // playbtn
  playBtn.addEventListener("click",()=>{
   checkPlaying(song);
  })

  // create a specific function for play/pause  song
  const checkPlaying = song =>{
    if(song.paused){
      song.play();
      video.play();
      playBtn.src = "./images/pause-btn.png";
    }
    else{
      song.pause();
      video.pause();
      playBtn.src = "./images/play-btn.png";
    }
    
    
  }

  //change-btn
  changeBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
      document.querySelector(".sound-picker .active").classList.remove("active");
      btn.classList.add("active");
      let btnAudioSrc = btn.getAttribute("data-sound");
      let btnVideoSrc = btn.getAttribute("data-video");
      document.querySelector(".music").src = btnAudioSrc;
      document.querySelector(".video").src = btnVideoSrc;
      checkPlaying(song);
    })
  })

  //  we can animate the circle
  song.ontimeupdate = () =>{
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // animate the text 
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if(currentTime >= fakeDuration){
      song.pause();
      video.pause();
      playBtn.src = "./images/play-btn.png";
      song.currentTime = 0;
    }
  }

  // time-select btn
  timeSelectBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
      document
        .querySelector(".time-select .active")
        .classList.remove("active");
      btn.classList.add("active");
      fakeDuration = btn.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    })
  })
}

app();
