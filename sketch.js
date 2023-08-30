var PLAY = 1;
var END = 0;
var gameState = PLAY;

var paisagem, paisagemImg;
var menina, meninaImg;
var dog, dogImg;
var gameOver, gameOverImg;
var restart, restartImg;

var invisibleGround;
var score;

function preload(){
  paisagemImg = loadImage("Background_Sol.jpg");

  meninaImg = loadImage("menina correndo.png");
  dogImg = loadImage("Cachorro.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600,600);

  paisagem = createSprite(475,300);
  paisagem.addImage("Background", paisagemImg);
  paisagem.scale = 0.25;

  menina = createSprite(100,460);
  menina.addImage("menina", meninaImg)
  menina.scale = 0.25;

  dogsGroup = createGroup();

  gameOver = createSprite(300,300);
  gameOver.addImage("gameOver", gameOverImg);
  
  restart = createSprite(300,350);
  restart.addImage("restart", restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(300,540,600,30);
  invisibleGround.visible = false;
  
  menina.setCollider("rectangle",0,0,100,500);
  menina.debug = false;
 
  score = 0;
}

function draw() {
  background(0);

  text("Pontuação: "+ score, 50, 50);
  //paisagem.depth = text.depth;
  //text.depth = text.depth + 1;

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    paisagem.velocityX = -(0.5 + 0.5* score/100);

    score = score + Math.round(frameRate()/60);

    if(paisagem.x < 150){
      paisagem.x = 475;
    }

    if(keyDown("space")&& menina.y >= 460-40){
      menina.velocityY = -13;
    }
    
    if(dogsGroup.isTouching(menina)){
      gameState = END;
    }
    menina.velocityY = menina.velocityY + 0.8

    spawnDogs();
  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    paisagem.velocityX = 0;
    menina.velocityY = 0
    
    dogsGroup.setLifetimeEach(-1);
    dogsGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)){
      reset();
  }
}
  menina.collide(invisibleGround); 

  drawSprites();
}

function spawnDogs() {
    
   if (frameCount % 120 === 0) {
      var dog = createSprite(650,470,10,40);
      dog.addImage("Cachorro", dogImg);
      dog.scale = 0.13;
      dog.velocityX = -(3 + 1* score/100);

      dog.lifetime = -20;
      
      dog.depth = menina.depth;
      menina.depth = menina.depth + 1;
      
      dog.setCollider("rectangle",-50,30,400,300);
      dog.debug = false;

      dogsGroup.add(dog);
   }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  dogsGroup.destroyEach();

  score = 0;
}
