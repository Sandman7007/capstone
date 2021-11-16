var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var invisibleGround;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

spookySound.loop()

  ghost= createSprite(300,210,40,40)
  ghost.addImage("ghost",ghostImg)
  ghost.scale= 0.4

  invisibleGround=createSprite(300,600,600)
  invisibleGround.visible=false
  
  doorsGroup= new Group()
  climbersGroup= new Group()
  invisibleBlockGroup= new Group()
  
}

function createdoor(){
 if(frameCount % 200 == 0){ 
var door = createSprite(200,-20)
door.velocityY=+2
door.addImage(doorImg)
door.x = Math.round(random(120,400));

var climber = createSprite(200,30)
climber.addImage(climberImg)
climber.velocityY=+2
climber.x=door.x

var invisibleBlock =createSprite(200,15)
invisibleBlock.velocityY=+2
invisibleBlock.width=climber.width
invisibleBlock.height=1.5
invisibleBlock.x=door.x

ghost.depth = door.depth;
ghost.depth =+1

door.lifetime=850
climber.lifetime=850
invisibleBlockGroup.lifetime=850

doorsGroup.add(door)
invisibleBlock.debug =true;
climbersGroup.add(climber)
invisibleBlockGroup.add(invisibleBlock)
 }
}

function draw() {
  background(200);
  if(gameState == "play"){
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY= -3
    }
    ghost.velocityY=ghost.velocityY+0.5

    if(keyDown(RIGHT_ARROW)){
      ghost.x=ghost.x+3
    }

    if(keyDown(LEFT_ARROW)){
      ghost.x=ghost.x-3
      
      
      if(tower.y > 400){
        tower.y = 300
      }
    }


    createdoor()
    drawSprites()
    if(invisibleGround.isTouching(ghost)){
     
      gameState="END"
    }

    if(climbersGroup.isTouching(ghost)){

      ghost.velocityY=0
      gameState="END"
    }
  }
if(gameState=="END"){
  spookySound.stop()
  background("orange")
  fill("red")
  textSize(35)
  text("GAME OVER",150,300)
}
    
    

    
}
