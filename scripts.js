let countDown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]');





function timer(seconds){
    clearInterval(countDown)
     const now = Date.now();
     const then = now + seconds*1000;
     diplayTimeLeft(seconds)
     displayEndTime(then)
     
     countDown = setInterval(() => {
        const secsLeft = Math.round((then - Date.now()) /1000);
        if(secsLeft <0){
            clearInterval(countDown)
            return
        }
       diplayTimeLeft(secsLeft );

     },1000)
    
}

function diplayTimeLeft(seconds){
    let hoursRemaining = Math.floor(seconds/3600)
    let minsRemaining = Math.floor(seconds/60);
    let  secRemaining = seconds % 60;
    if(minsRemaining==(hoursRemaining*60)){
        minsRemaining = 0;
    }
    //console.log(hoursRemaining,secRemaining,secRemaining);
   const displayTimeRemaining = `${hoursRemaining < 10 ? '0' : ''}${hoursRemaining}:${minsRemaining < 10 ? '0': ''}${minsRemaining}:${secRemaining < 10 ? '0': ''}${secRemaining}`
   timerDisplay.textContent = displayTimeRemaining;
   document.title = displayTimeRemaining;
   if(hoursRemaining  === 0 && minsRemaining  === 0 && secRemaining === 0){
    timerDisplay.style.color="red"
    function TimeUp(){
        timerDisplay.textContent = `Time Up!`
        endTime.textContent='';
        timerDisplay.style = " none"
    
    }
    setTimeout(TimeUp, 2000)
    
   }
   
}


function displayEndTime(timestamp) {
    const time = new Date(timestamp);
    var hours = time.getHours();
    if (hours > 12) {
       hours = hours - 12;
    }
    var min = time.getMinutes()
 


    var secs = time.getSeconds();
    // console.log(hours, min, secs);
    endTime.textContent = `Be back at ${hours}:${min < 10 ? '0' : ''}${min}:${secs < 10 ? '0' : ''}${secs}`;
   
 }

 

function startTimer(){
    const seconds = parseInt(this.dataset.time)
    //console.log(seconds);
    timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit' ,function(e){
  e.preventDefault();
  console.log(this);
  const mins = this.minutes.value;
  //console.log(mins);
 
  clearInterval(countDown)
  if(isNaN(mins)){
   
    timerDisplay.textContent="Invalid"
    endTime.textContent='Please enter valid time'
   
  }else{
    timer(mins*60)
  }

  this.reset();
  
})


