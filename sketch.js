var bird,birdImg;
var bg,bgImg;
var obstacle1, obstacle2;
var obs1Group, obs2Group;
var reset, resetImg;
var score = 0;
var life = 5;
var gameState = "play";

function preload(){
birdImg = loadImage("Birdy.png");
bgImg = loadImage("bg.png");
obstacle1Img = loadImage("obs1.png");
obstacle2Img = loadImage("obs2.png");
resetImg = loadImage("resetImg.png");
}

function setup() {
  createCanvas(400, 400);

  bg = createSprite(0,100,800,400);
  bg.addImage("bg",bgImg);
  bg.scale = 1;
  
  bird = createSprite(55,200,50,50);
  bird.addImage("bird",birdImg);
  bird.scale = 0.1;
  
  reset = createSprite(200,200,50,50);
  reset.addImage("reset",resetImg);
  reset.scale = 0.15;
  
  obs1Group = new Group();
  obs2Group = new Group();
}

function draw() {
  background("lightblue");
  
  if(gameState==="play"){
  
  bg.velocityX = -3;
  
  if(bg.x<0){
    bg.x = bg.width/2;
  }
  
  if(frameCount%45===0){
    score++
  }
  
  if(bird.isTouching(obs1Group) || bird.isTouching(obs2Group)){
    life--
    obs1Group[0].destroy();
    obs2Group[0].destroy();
  }
  
  if(keyDown("space")){
    bird.velocityY = -4;
  }
  
  bird.velocityY = bird.velocityY+0.2;
  
    if(life===0){
      gameState="reset";
    }
    
  spawnObstacle1();
  spawnObstacle2();
  
  drawSprites();
  }
  
  if(gameState==="reset"){
    text("GAME OVER",200,200);
  }
  
  fill("green");
  textSize(20);
  stroke("white");
  strokeWeight(1);
  text("Score: "+score,20,30);
  text("Life: "+life,330,30);
}

function spawnObstacle1(){
  if(frameCount%30===0){
    var obstacle1 = createSprite(400,Math.round(random(-50,0)),10,Math.round(random(50,100)));
    obstacle1.addImage("obstacle1",obstacle1Img);
    obstacle1.scale = 0.3
    obstacle1.velocityX = -5;
    obs1Group.add(obstacle1);
    obs1Group.debug=true;
  }
}

function spawnObstacle2(){
  if(frameCount%30===0){
    var obstacle2 = createSprite(400,Math.round(random(400,450)),10,Math.round(random(50,100)));
    obstacle2.addImage("obstacle2",obstacle2Img);
    obstacle2.scale = 0.17;
    obstacle2.velocityX = -5;
    obs2Group.add(obstacle2);
  }
}