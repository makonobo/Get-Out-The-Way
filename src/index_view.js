import GameView from './game_view.js';
import * as Scoreboard from './scoreboard.js';

let currentIndex = 0; 
let musicList = [];
let currentSong;

const MESSAGES = {
  energy: "Collect red energy cubes",
  slow: "Blue cubes slow aliens",
  alien: "Evade green alien ships",
  shield: "Yellow cubes adds shields",
}
export function displayGame(){
  const gameDisplay = document.getElementById('game-canvas'); 
  if(gameDisplay.classList.contains('hidden')){
    gameDisplay.classList.remove('hidden');
  }
  else{
    gameDisplay.classList.add('hidden'); 
  }
}

export function createWelcome(GetOutTheWay){
  const welcomeMenu = document.createElement('div'); 
  welcomeMenu.classList.add('welcomeMenu');
  welcomeMenu.id = 'welcomeMenu';

  const trident1 = document.createElement('img');
  trident1.src = "https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/images/trident1.png";
  
  const instructions = document.createElement('div');
  const instructionsWrap = document.createElement('div');
  instructionsWrap.id ='instructions-wrap';

  instructions.classList.add('instructions');
  instructions.id = 'instructions'; 

  // instructions.innerText = "Use the arrow keys to move the ship around the map, \n\nwhen your ship is highlighted blue you may press the spacebar to deploy defensive maneuvers."

  let instructionsText = "Your goal is to collect the red energy cubes while evading enemy hive ships.";
  instructionsText += "\n\n Yellow cubes provide extra shield strength and blue cubes slow the enemy.";
  instructionsText += "---Blue cubes detonate killing aliens within a radius, \n\n Use the arrow keys to control your ships."
  instructionsText += "---Good luck. \n\n --Mike"
  instructions.setAttribute('disabled', true); 
  
  const welcomeButtonWrap = document.createElement('div'); 
  welcomeButtonWrap.classList.add('welcomeButtonWrap');
  
  const startButton = document.createElement('button');
  startButton.classList.add('welcomeButtons'); 
  startButton.id = "play";
  startButton.innerText="Play"; 

  const scoreBoardButton = document.createElement('button');
  scoreBoardButton.classList.add('welcomeButtons');
  scoreBoardButton.innerText="Score Board"; 
  scoreBoardButton.id ="scoreboard-button";
  
    welcomeButtonWrap.append(startButton);
    welcomeButtonWrap.append(scoreBoardButton);

  instructionsWrap.append(instructions);

  welcomeMenu.append(trident1); 
  welcomeMenu.append(instructionsWrap);
  welcomeMenu.append(welcomeButtonWrap); 

  const layer4=document.getElementById('layer4'); 
  layer4.append(welcomeMenu); 

  
  const elements = {startButton, scoreBoardButton, welcomeMenu, layer4, GetOutTheWay}
  handleWelcomeMenuEvents(elements);
  typewriter('instructions', instructionsText);
}


function handleWelcomeMenuEvents(elements){

  elements.startButton.addEventListener('click', ()=> {
    layer4.removeChild(elements.welcomeMenu);
    elements.GetOutTheWay.startGame();
  });
  elements.scoreBoardButton.addEventListener('click', ()=>{
      const welcomeMenu = document.getElementById('welcomeMenu');
  welcomeMenu.parentNode.removeChild(welcomeMenu);
    displayScoreBoard(elements.GetOutTheWay);
  });
}
function typewriter(id, text){
  let element = document.getElementById(id);
  let texts = text.split('---');
  let flag = false;
  let play = document.getElementById('play');
  play.addEventListener('click', ()=>{flag=true});
  let scoreboardButton = document.getElementById('scoreboard-button');
  scoreboardButton.addEventListener('click', ()=>{flag=true});
  texts[0] = (texts[0]+'//////////////////////').split('');
  texts[1] = (texts[1]+'//////////////////////').split('');
  texts[2] = (texts[2]+'//////////////////////').split('');
  let intervalId = setInterval( ()=> {

    write();
    function write(){
      if(texts[0].length){
        element.innerHTML+=texts[0].shift();
        if(texts[0][0]===' ' || texts[0][0]==='\n' || texts[0][0] === '\t'){
          if(texts[0][0]==='\n'){texts[0][0]='<br />'}
          write();
        }
        if( texts[0][0] ==='/'){
          if(texts[0][0]==='/'){texts[0][0]=''}
        }
        else{
          typewriterFX();
        }
      }
      else{
        texts.shift();
        if(texts.length){
          element.innerHTML = '';
        }
      }
      if(!texts.length || flag){
        stopInterval();
      }
    }
  }, 100)
  function stopInterval(){
      clearInterval(intervalId)
  }

}

function typewriterFX(){
  let volume = .2;
  let path = "https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/soundFX/typewriter.wav"
  let music = new Howl({
    src: path,
    autoplay: true,
    loop: false,
    preload: true,
    volume: volume,
    rate: 2
  });
}

export function displayScoreBoard(GetOutTheWay){
  const layer4 = document.getElementById('layer4');

  
  const scoreboard = document.createElement('div');
  scoreboard.id = 'scoreboard';
  scoreboard.className = 'scoreboard';

  const title = document.createElement('div');
  title.innerText = "Scoreboard"; 
  title.id='scoreboard-title';

  const table = document.createElement('table');
  table.id ="scoreboard-table";
  
  const tr = document.createElement('tr');
  const thName = document.createElement('th');
  thName.innerText = "name";

  const thScore = document.createElement('th');
  thScore.innerText = "score";

  tr.append(thName);
  tr.append(thScore);

  table.append(tr);

  const scoreboardButtonWrap = document.createElement('div'); 
  scoreboardButtonWrap.classList.add('scoreboardButtonWrap');
  scoreboardButtonWrap.classList.add('welcomeButtonWrap');
  
  const startButton = document.createElement('button');
  startButton.classList.add('welcomeButtons'); 
  startButton.id = "play";
  startButton.innerText="Play"; 

  const backButton = document.createElement('button');
  backButton.classList.add('welcomeButtons');
  backButton.innerText="back"; 
  backButton.id ="back-button";
  
  scoreboardButtonWrap.append(startButton);
  scoreboardButtonWrap.append(backButton);

  scoreboard.append(title);
  scoreboard.append(table);
  scoreboard.append(scoreboardButtonWrap);

  layer4.append(scoreboard);
  const elements = {startButton, backButton, scoreboard, layer4,GetOutTheWay};
  handleScoreboardEvents(elements);
  loadScoreboard();
}

function handleScoreboardEvents(elements){

  elements.startButton.addEventListener('click', ()=> {
    layer4.removeChild(elements.scoreboard);
    elements.GetOutTheWay.startGame();
  });
  elements.backButton.addEventListener('click', ()=>{
    layer4.removeChild(elements.scoreboard);
    createWelcome(elements.GetOutTheWay);
  });
}


function loadScoreboard() {
    // Clear current scores in our scoreboard
    const table = document.getElementById('scoreboard-table');
    
    // Get the top 5 scores from our scoreboard
    db.collection("scores").orderBy("score", "desc").limit(15).get().then((user) => {
        user.forEach((doc) => {
          const row = document.createElement('tr');
          const unameData = document.createElement('td');
          unameData.innerText = doc.data().username;
          const scoreData = document.createElement('td');
          scoreData.innerText = doc.data().score; 
          row.append(unameData);
          row.append(scoreData);
          table.append(row); 
        })
    })
}

export function saveScore(GOTW){

  const saveFormWrap = document.createElement('div');
  saveFormWrap.id='saveForm-wrap';

  const saveForm = document.createElement('div');
  saveForm.id ='saveForm';
  saveForm.innerText = 'Enter your username';

  const usernameInput = document.createElement('input');
  usernameInput.id ='saveForm-input';
  usernameInput.type ='text'; 
  usernameInput.setAttribute('maxlength', '7');
  
  document.getElementById('layer4').append(saveForm);
  
  const addButton = document.createElement('button');
  addButton.classList.add('welcomeButtons');
  addButton.innerText="add"; 
  addButton.id ="add-button";
  
  saveFormWrap.append(usernameInput);
  saveFormWrap.append(addButton);
  saveForm.append(saveFormWrap);

  addButton.addEventListener('click', ()=>{
    const username = document.getElementById('saveForm-input').value;
    if(username !== "") {
        window.db.collection("scores").doc().set({
            username: username,
            score: window.score
        })
        .then(function() {
          saveForm.remove();
          displayScoreBoard(GOTW);
            console.log("Score updated");
        })
        .catch(function(error) {
            console.error("Error: ", error);
        });
    } else {
        alert('Please enter a username');
    }
  });
}

export function playMusic(src){
  let currentLi = Object.values(document.getElementsByClassName("jukebox-li")).forEach( (li, i)=>{
      if(li.getAttribute('data-value') === src){
        li.classList.add('jukebox-selected');
        currentIndex = i;
      }
      else{
        li.classList.remove('jukebox-selected');
      }
  });

  let volume = .7;
  let path = "https://raw.githubusercontent.com/MichaelClaytonNoble/Get-Out-The-Way/main/dist/css/music/"
  if(src === 'drexciya.mp3') {volume =1};
  let path_src = path+src;

  if(currentSong){currentSong.stop();}
    let music = new Howl({
      src: path_src,
      autoplay: true,
      loop: false,
      preload: true,
      volume: volume,
      onend: ()=>{if(src!=='OpeningTheme.mp3'){return cb()}}
    });
    currentSong = music; 
    function cb(){
      playMusic(musicList[(currentIndex+1)%musicList.length]);
    }

  }
export function loadJukebox(){
     //load music in the jukebox
     musicList = document.getElementsByClassName("jukebox-li"); 
     musicList = Object.values(musicList).map( songNode => { 
       return songNode.getAttribute('data-value');
     }).filter( song => song !== 'pause'); 
     playMusic('OpeningTheme.mp3');
     const jukebox = document.getElementById('jukebox'); 
     jukebox.addEventListener('click', e=>{
       if(e.target.getAttribute('data-value') === 'pause'  && currentSong){
        if(currentSong.playing()){
          e.target.classList.add('jukebox-selected'); 
          currentSong.pause(); 
        }
        else{
          e.target.classList.remove('jukebox-selected'); 
          currentSong.play(); 
        }
      }
      else{
        playMusic(e.target.getAttribute('data-value')); 
      }
     });
}
export function createCanvas(){

  let layer = document.getElementById("layer4");
  let canvas = document.createElement('canvas');
  canvas.classList.add('hidden');
  canvas.id="game-canvas";
  canvas.height = 502;
  layer.append(canvas);
  let justCreated = true; 
  (function () {
    let context = canvas.getContext('2d');
    initialize();
    function initialize() {
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();
    }
    function resizeCanvas() {
      let height = canvas.height;
      let width = canvas.width;
      if(justCreated){
        canvas.height = 502;
        canvas.width = 836;
      }

      canvas.width = Math.floor(window.innerWidth/2.3);
      let aspect = window.innerHeight*1.2 / (window.innerWidth); 
      canvas.height = Math.floor(canvas.width * aspect);

      if(!justCreated){
        GameView.findCtx().scale(canvas.width/width, canvas.height/height);
        
      }
      let root = document.documentElement;
      root.style.setProperty('--height', canvas.height+'px');
      root.style.setProperty('--width', canvas.width+'px');
      GameView.findCtx().setTransform(1,0,0,1,0,0);
      GameView.findCtx().imageSmoothingEnabled = false;
      justCreated = false; 
    }
  })();
}
export function clearGameAlerts(){
  let gameAlerts = document.getElementById('side-menu-list')
  gameAlerts.classList.add('hidden');
  setTimeout(()=>gameAlerts.classList.remove('hidden'), 7000);
}
export function gameOver(GOTW){
  displayGame();
  saveScore(GOTW);
}
export function resetPoints(){
  document.getElementById('stats-score-number').innerText = 0;
  document.getElementById('stats-points').innerText = 100;
  document.getElementById('stats-shields-number').innerText = 5;
}
export function flashInstructions(){
    const flashInstructions = document.getElementById("side-menu-flash-instructions")
    flashInstructions.classList.remove('hidden');
    const types = ['energy', 'slow', 'shield', 'alien'];
    let i = 0;

    const nextMessage = ()=>{
      const message = document.createElement('li'); 
      message.id = "flash-instructions-message"; 
      
      message.textContent = MESSAGES[types[i]];
      GameView.changeTheme("var(--"+types[i]+")",'--flash-inst-border' );
      GameView.changeTheme("var(--"+types[i]+"-transparent)",'--flash-inst-glow' );
      flashInstructions.append(message);
      i = (1+i)%types.length; 
      setTimeout(()=>flashInstructions.removeChild(message), 4500);
    }
    nextMessage();
   let id = setInterval(nextMessage, 4550);
   window.addEventListener('gameOver', ()=>{
     clearInterval(id); 
     flashInstructions.classList.add('hidden');
   })
  }
