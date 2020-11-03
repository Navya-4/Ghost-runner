var tower, towerImage;
var door, doorImage;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var sound;
var block, blockGroup;
var gameState = "play";

function preload (){
  
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  ghostImage = loadImage ("ghost-standing.png");
  climberImage = loadImage ("climber.png");
}


function setup (){
  createCanvas (400,400);
  tower = createSprite (200,200,20,20);
  tower.addImage (towerImage);
  tower.velocityY = 2;
  
  climberGroup = new Group ();
  blockGroup = new Group ();
  
  ghost = createSprite  (200,200,20,20);
  ghost.addImage (ghostImage);
  ghost.scale = 0.35;
  
}

function draw (){
  
  background ("black");
  if (gameState === "play"){
    
  
  
  if (tower.y > 400){
    
    tower.y = height/2;
  }
   
  ghost.velocityX = 0;
  
  if (keyDown("left")){
    ghost.velocityX = -4;
  }
  
  if (keyDown("right")){
    ghost.velocityX = 4;
  }
  
  if (keyDown("space")){
    ghost.velocityY = -10;
  }
  
  ghost.velocityY = ghost.velocityY + 0.3;
  
  
  
  console.log (gameState);
  
  balcony();
    if (ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
  }
    
    if (ghost.isTouching(blockGroup) || ghost.y>400){
    gameState = "end";
  
  }
    
  drawSprites ();
  }
  
  if (gameState === "end"){
    fill ("white");
    text ("Game Over",150,200);
  }
}



function balcony (){
  
  if (frameCount % 200 === 0){
    
    door = createSprite (200,-20,20,20);
    door.addImage (doorImage);
    door.velocityY = 2;
    
    door.x = Math.round (random(50,350));
    
    door.lifetime = 200;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
      
    climber = createSprite (door.x,20,20,20);
    climber.addImage (climberImage);
    climber.velocityY = 2;
    climber.scale = 0.7;
    
    climber.lifetime = 200;
    
    climberGroup.add (climber);
    
    
    block = createSprite (climber.x,40,80,5);
    block.velocityY = 2;
    block.visible = false;
    
    block.lifetime = 200;
    
    blockGroup.add (block);
  }
  
  
  
}