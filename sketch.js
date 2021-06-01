var fairy,fairyImage,fairyHaltImage,fairyMoveSound;
var star,starGroup,starImage1,starImage2;
var starDieMeter = 100;
var starMode = "notCollected";
var checker1,checker2;
var endline;
var gameState = "beforeplay";
var score = 0;
var destructor;
var leftWall,rightWall;
var bg;
var bgSound;
var starLoseSound,gameLoseSound;
var clickSound,collectSound;

var instructButton,instructButtonImage,backButton,backButtonImage;


var life = 1;


// buttons
var restartButton,restartButtonImage;
var startButton,startButtonImage;


function preload(){

  bg = loadImage("starryNight 2.jpg");


  fairyImage = loadAnimation("fairyImage1.png","fairyImage2.png");
  fairyHaltImage = loadImage("fairyImage2.png");


  starImage1 = loadImage("starImage.png");
  starImage2 = loadImage("star.png");


  startButtonImage = loadImage("B Start_Button_Image-removebg-preview.png");
  restartButtonImage = loadImage("B Restart_Button_Image-removebg-preview.png");
  instructButtonImage = loadImage("B Instruction_Button_Image-removebg-preview.png");
  backButtonImage = loadImage("Back Image.png");


  bgSound = loadSound("JoyMusic.mp3");

  starLoseSound = loadSound("S Star lose sound.mp3");
  gameLoseSound = loadSound("S Lose sound.mp3");

  fairyMoveSound = loadSound("S swoosh move sound-[AudioTrimmer.com].mp3");

  clickSound = loadSound("S Click sound.mp3");
  collectSound = loadSound("S Collect sound.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  

  fairy = createSprite(windowWidth/2,windowHeight/1.5,30,30);
  
  fairy.addAnimation("move",fairyImage);
  fairy.addImage("halt",fairyHaltImage);
  fairy.scale = 0.15;
  //fairy.debug = true;
  fairy.setCollider("circle",490,-10,80);
  



  endline = createSprite(windowWidth/2,windowHeight+30,windowWidth,10);


  destructor = createSprite(-250,20,100,100);

  leftWall = createSprite(windowWidth-1190,windowHeight/2,10,windowHeight);
  leftWall.visible = false;

  rightWall = createSprite(windowWidth-20,windowHeight/2,10,windowHeight);
  rightWall.visible = false;


  restartButton = createSprite(windowWidth/2,windowHeight/3,60,60);
  restartButton.addImage(restartButtonImage);
  restartButton.scale = 0.5;
  restartButton.visible = false;

  startButton = createSprite(windowWidth/2,windowHeight/3,60,60);
  startButton.addImage(startButtonImage);
  startButton.scale = 0.5;

  instructButton = createSprite(windowWidth/1.1,windowHeight/11);
  instructButton.addImage(instructButtonImage);
  instructButton.scale = 0.25;


  backButton = createSprite(windowWidth/11,windowHeight/1.1);
  backButton.addImage(backButtonImage);
  backButton.scale = 0.6;
  backButton.visible = false;







  starGroup = new Group();

 


}

function draw() {
  background(bg);

  fairyMovement();
  spawnStars();

  beforeplayFunction();
  playState();
  gameEnd();
  gameInstruction();

  scoringSystem();
  teleportate();
  fairyLife();
  
 

  
  fairy.collide(leftWall);
  fairy.collide(rightWall);


  drawSprites();
  // text("GameState = "+gameState,100,100);
}

function mouseReleased(){

  if(mouseIsOver(restartButton)&&gameState==="end"){
    restartButton.visible = false;
    startButton.visible = true;
    gameState = "beforeplay";
    score = 0;
    life = 5;  

    clickSound.play();

    //gameLoseSound.stop();
    
    fairy.x = windowWidth/2;
  fairy.y = windowHeight/1.5;
  }
  
  
  if(mouseIsOver(startButton)&&gameState==="beforeplay"){
    startButton.visible = false;
    gameState = "play";  
    life = Math.round(random(1,5));

    bgSound.play();
    clickSound.play();
  }


  if(mouseIsOver(instructButton)&&gameState==="beforeplay"){
    gameState = "instruction";
    clickSound.play();
  }

  if(mouseIsOver(backButton)&&gameState==="instruction"){
    backButton.visible = false;
    gameState = "beforeplay"
    clickSound.play();
  }

 

}


function fairyMovement(){

  if(gameState==="play"){
  if(keyDown("left")){
    fairy.x = fairy.x-15;
  
  }

  if(keyDown("right")){
    fairy.x = fairy.x+15;

  }
}




}

function spawnStars(){
  if((frameCount%100===0)&&gameState==="play"){
    
    star = createSprite(Math.round(random(windowWidth/20,windowWidth/1.1)),-20,30,30);
    star.velocityY = (10+score/2);

     //star.debug = true;
    
    

    var randomImage = Math.round(random(1,2));

    switch(randomImage){

      case 1 :
        star.addImage("1",starImage1);
        star.scale = 0.05;
        star.setCollider("circle",0,0,350);
        break;

        case 2 :
          star.addImage("2",starImage2);
          star.scale = 0.28;
          star.setCollider("circle",0,0,70);
          break;



    }

    starGroup.add(star);
  }


  if(fairy.isTouching(starGroup)){
    starMode = "collected";
    
  }

  if(fairy.isTouching(starGroup)&&starDieMeter===100){
    collectSound.play();
  }

  if(starMode==="collected"){
    starGroup[0].velocityY = 0;
    starDieMeter = starDieMeter-1.7;
     starGroup[0].x = fairy.x+80;
     starGroup[0].y = fairy.y;
     

   
  
  }

  if(starDieMeter<=0){
    starMode = "notCollected";
    starDieMeter = 100;
    starGroup[0].x = destructor.x;
    starGroup[0].y = destructor.y;
   
   
    
  }

  







  // if(fairy.isTouching(starGroup)){
  //   //starGroup[0].destroy();
  //   starGroup[0].velocityY = 0;

  //   star.x = fairy.x-80;
  //   star.y = fairy.y-7;

  //   starMode = "collected";
   

  // }

  



  // if(starMode==="collected"){
  //   starDieMeter = starDieMeter - 1.8;
  //   starGroup[0].velocityY = 0;
  //   star.x = fairy.x+80;
  //   star.y = fairy.y-7;
    
  // }

  // if((starDieMeter<=0)){
  //   starMode = "notCollected";
  //   starDieMeter = 100;
  //   starGroup[0].destroy();
  // }


  // text("StarMode: "+starMode,200,200);
  // text("StarDieMeter: "+starDieMeter,200,300);



}

function beforeplayFunction(){
  if(gameState==="beforeplay"){
    fairy.changeAnimation("halt",fairyHaltImage);

    startButton.x = windowWidth/2;

    fairy.visible = true;
    startButton.visible = true;
    backButton.visible = false;
    instructButton.visible = true;

  } else if(gameState==="instruction"){
    fairy.visible = false;
    startButton.visible = false;
    backButton.visible = true;
    instructButton.visible = true;
  }
  
  
}

function playState(){
  if(gameState==="play"){
   fairy.changeAnimation("move",fairyImage);
  }
}


function gameEnd(){

  if(starGroup.isTouching(endline)&&life===1){
    gameLoseSound.play();
  }
  


  if(starGroup.isTouching(endline)){
    starGroup[0].destroy();
    life = life-1;
    starLoseSound.play();
    
  }

  




  if(life<=0){
    gameState = "end";
  }

  if(gameState==="end"){
    textSize(35);
    fill(139, 50, 150);
    text("Oh .. You missed them ",windowWidth/2.7,windowHeight/12);
    text("The End",windowWidth/2.2,windowHeight/6);
    restartButton.visible = true;
    fairy.changeAnimation("halt",fairyHaltImage);
    bgSound.stop();


    startButton.x = -40;
  }

  
 


}


function scoringSystem(){


  if(gameState==="play"){
  textSize(23);
  fill(223, 193, 227);
  text("Stars Collected: "+score,windowWidth/18,windowHeight/8);
  }
  
  // if(fairy.isTouching(starGroup)){
  
 
  // }

  if(starGroup.isTouching(destructor)){
    score = score+1;
    starGroup[0].destroy();
  }
  




}

function teleportate(){

  if(keyDown("left")&&keyWentDown("space")&&fairy.x>leftWall.x+70&&gameState==="play"){
    fairy.x = fairy.x - 120;
   
    fairyMoveSound.play();
  }


  if(keyDown("right")&&keyWentDown("space")&&fairy.x<rightWall.x-190&&gameState==="play"){
    fairy.x = fairy.x + 120;
   
    fairyMoveSound.play();
  }

  // text(rightWall.x,100,100);
  // text(fairy.x,100,150);







}

function fairyLife(){


  if(gameState==="play"){
  text("Star Casualities: "+life,windowWidth/18,windowHeight/12);
}
}


function gameInstruction(){

  if(gameState==="play"||gameState==="end"){
    instructButton.visible = false;
  


  }

  if(gameState==="instruction"){

    fill(166, 37, 184);
    textSize(28);
    text("Welcome to the Star Catcher !!",windowWidth/2.9,windowHeight/12);
  

    textSize(25);
    text("You are MARIA the ANGEL , who belongs to the family of gods !!",windowWidth/4.7,windowHeight/6);

    fill(252, 252, 252);
    text("Your main objective is to catch all the shooting stars falling on the Earth from outer space.",windowWidth/24,windowHeight/4);
    text("Use the 'right' and 'left' arrow keys to move right and left respectively .. Press 'space' to teleportate !",windowWidth/24,windowHeight/3.3);
    text("Beware of the star casualities -  Don't let them fall down",windowWidth/24,windowHeight/1.95);
    text("Beware of their increasing speed (Use teleportation)",windowWidth/24,windowHeight/1.8);
    text("Catching the star - The star should fall on the fairy's hand",windowWidth/24,windowHeight/1.67);

    text("So... Let's check your relfexes and skills ",windowWidth/3,windowHeight/1.4);
    text("Good Luck !!",windowWidth/2.3,windowHeight/1.3);


  }

}


