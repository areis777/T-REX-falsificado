var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem ,nuvemGroup ,nuvemImage
var obstacles ,obstacle1 ,obstacle2 ,obstacle3 ,obstacle4 , obstacle5 ,obstacle6 ;
var gameOver, gameOverImg, restartImg,restart;    
var score;
var jumpSound,checkpointSound,dieSound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  nuvemImage = loadImage ("cloud.png");
  
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");

  gameOverImg = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");
  jumpSound = loadSound ("jump.mp3");
  checkpointSound = loadSound ("checkpoint.mp3");
  dieSound = loadSound ("die.mp3");
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  
  //crie um sprite de trex
  trex = createSprite(50,windowHeight-30,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(width/2,height-80 ,width,2);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //crie um solo invisível
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;

  gameOver = createSprite (width/2,height/2-50);
  gameOver.addImage (gameOverImg);
  gameOver.scale = 0.8;

  restart = createSprite (width/2,height/2);
  restart.addImage (restartImg);
  restart.scale = 0.6;
  //gerar números aleatórios
  obstaclesGroup = new Group ();
  nuvensGroup = new Group ();
  score = 0 ;

  trex.debug = false;
  trex.setCollider("circle",0,0,27);



}

function draw() {
  //definir cor do plano de fundo
  background(180);
  text("score: "+ score,500,50);
  if (gameState === PLAY ) {
    score = score + Math.round (getFrameRate()/60);
    restart.visible = false;
    gameOver.visible = false;
    if(touches.length>0|| keyDown("space")&& trex.y >=850) {
      trex.velocityY = -10;
      touches = [];
    jumpSound.play ();
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (score > 0 && score%100 ===0)  {
  checkpointSound.play ();

    }
    spawnClouds();
    spawnObstacles();
    ground.velocityX = -4;
    if (obstaclesGroup.isTouching (trex)) {
     dieSound.play ();
      gameState = END;


    }} else if (gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  nuvensGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trex_collided);
      obstaclesGroup.setLifetimeEach(-1);
      nuvensGroup.setLifetimeEach(-1);
      gameOver.visible = true;
      restart.visible = true;
  }


  if (mousePressedOver(restart)) {
  //  console.log("reiniciar o jogo")
reset ()


  }
  // pulando o trex ao pressionar a tecla de espaço

  
  
  
  
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens

  drawSprites();

}
function reset() {
gameState = PLAY ;
gameOver.visible = false;
restart.visible = false;
score = 0;
obstaclesGroup.destroyEach ();
nuvensGroup.destroyEach ();
trex.changeAnimation("running",trex_running);
}
//função para gerar as nuvens
function spawnClouds(){
 //escreva seu código aqui
 if (frameCount % 60 === 0){
  nuvem = createSprite (width+20,height-300,40,10);
  nuvem.addImage (nuvemImage);
  nuvem.y = Math.round (random (100,220));
  nuvem.scale = 0.5 ;
  nuvem.velocityX = -3 ;
  nuvensGroup.add (nuvem);
  nuvem.lifetime = 600;
}}
function spawnObstacles(){
  if (frameCount % 60 === 0){
 obstacle = createSprite (1800,height-95,20,40);
 obstacle.velocityX = -(6+score/100) ;

var rand = Math.round (random(1,6));
switch (rand){
case 1: obstacle.addImage(obstacle1);
break;
case 2: obstacle.addImage(obstacle2);
break;
case 3: obstacle.addImage(obstacle3);
break;
case 4: obstacle.addImage(obstacle4);
break;
case 5: obstacle.addImage(obstacle5);
break;
case 6: obstacle.addImage(obstacle6);
break;
default: break;
}
obstacle.scale = 0.5 ;
obstacle.lifetime = 300 ;
obstaclesGroup.add (obstacle);
}}


