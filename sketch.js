  //Creating variables
  var ground;
  var monkey , monkey_running
  var banana ,bananaImage, obstacle, obstacleImage
  var FoodGroup, obstacleGroup
  var score;


function preload()
{
  //PreLoading Images
  monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}


function setup()
{
  createCanvas(400,400);
  //Creating Sprites
  //Creating ground
  ground=createSprite(200,380,900,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //Creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  var survivalTime=0;
  
  // Creating each group
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
}


function draw()
{
  background(255);
 
//Making the ground move
  if (ground.x < 0)
{
  ground.x = ground.width/2;
}
  
  //Jump when space is pressed
  if(keyDown("space")&& monkey.y >= 100)
{
  monkey.velocityY = -12;
}
    
  //Adding gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //Making collide with ground
  monkey.collide(ground);
    
  //Calling objects
  spawnObstacles();
  spawnFood();
  
  //Adding survival time
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+ survivalTime,100,50);
    
  if(obstacleGroup.isTouching(monkey))
{
      
  //Setting velocity of each game object to 0
  ground.velocityX = 0;
  monkey.velocityY = 0;
    
  //Setting lifetime and velocity to 0
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
    
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0); 
}
  drawSprites();


function spawnFood()
{
  if(frameCount%80===0)
{
  //Creating banana
  banana=createSprite(400,70,20,20);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.velocityX = -3;
  banana.scale=0.1;
  banana.lifetime = 130;
    
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
    
 FoodGroup.add(banana);  
}
}
  
  
//Spawning random obstacles
function spawnObstacles()
{
  if(frameCount%300===0){
  obstacle=createSprite(300,310,20,20);
  obstacle.y = Math.round(random(340,340));
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -3;
  obstacle.scale=0.2;
  obstacle.lifetime = 130;
  
  obstacleGroup.add(obstacle)
  
}
}
}