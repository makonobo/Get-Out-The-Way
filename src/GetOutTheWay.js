import * as IndexView from './index_view';
import GameView from './game_view';


class GetOutTheWay{

  constructor(){
    this.setup();

    this.welcome(); 
  }
  welcome(){
    //display greeting splash
    //present with option to begin game or view leader board. 

    this.handleWelcome();
  }
  handleWelcome(){
    //all event logic set up 
    IndexView.createWelcome(); 
    let play = document.getElementById('play');
    play.addEventListener("click", ()=> {
      this.startGame(); 
    })
 
  }
  
  setupGame(){
    this.gameView = new GameView(); 
    //show canvas
    IndexView.displayGame();

    //change header to display instructions. 
    
    //the title bar will display relevant messages to the user. 
    //such as scrolling through event descriptions 
    //you have 5 seconds to collect slow  //message in blue 
    //you have 8 seconds to collect shield  //message in yellow 
    //collect the red energy boxes //message in red
    //evade the green enemy  //message in green 
  
  }
  startGame(){
    this.setupGame();
    //now actually Gameview start here after set up 
    this.gameView.start();
  }
  gameOver(){

  }
  endGame(){
    
  }

  setup(){
    window.ctx = GameView.findCtx();
    this.scoreBoard = []; //has a name and value property 
  }
  handleSetup(){

    const toggle = document.getElementById('toggle-music');
    toggle.addEventListener('change', ()=>{

    })

    
  }

}

export default GetOutTheWay; 