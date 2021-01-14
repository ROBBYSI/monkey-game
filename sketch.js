var backImage,backgr;
var player,player_running;
var ground;

var foodGroup,bananaImage
var obstacleGroup,obstacle_Img;

var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running=("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  
  bananaImage=loadImage("banana.png");
  obstacle_Img=loadImage("stone.png");

}


function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player=createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale=0.5;
  
  ground=createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup=new Group();
  obstacleGroup= new Group();
  
  score=0;
  
}

function draw() {
  background(220);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score=score+2;
  }
  switch(score){
      case 10:player.scale=0.12;
      break;
      case 20:player.scale=0.14;
      break;
      case 30:player.scale=0.16;
      break;
      case 40:player.scale=0.18;
      break;
      default:break;
  }
  if(keyDown("space")){
    player.velocityY=-12;
  }
  player.velocityY=player.velocityY+0.8;
  
  player.collide(ground);
  spawnfood();
  spawnObstacles();
  
  if(obstacleGroup.isTouching(player)){
    player.Scale=0.08;
  }
  
  drawSprites();
  stroke("white");
  textSize=(20);
  fill("white");
  text("score: "+score,500,50);
}

function spawnfood(){
 if (frameCount % 80 === 0){
   var banana = createSprite(600,250,40,10);
   banana.y=random(120,200);
   banana.addImage(bananaImage);
   banana.scale=0.05;
   banana.velocityX=-5;
   //assign lifetime to variable
   banana.lifetime=300;  
   player.depth=banana.depth+ 1;
   foodGroup.add(banana);
   
 }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(800,350,10,40);
   obstacle.velocityX=-6;
   obstacle.addImage(obstacle_Img);
   obstacle.scale=0.2;
   //giving life time to obstacles
   obstacle.lifetime=300;  
   
   obstacleGroup.add(obstacle)
   
 }
}

