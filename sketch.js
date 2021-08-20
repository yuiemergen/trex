var score=0

var gamestate="play"
var trex,trex_running


var ground, groundImage
var ground2
var cloud,cloudImage
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6
var cloudgroup,cactusgroup

var trexdead
var gameover
var gameoverImage
var restart
var restartImage
var jumpSound,dieSound,checkpointSound

// preload function is specially used just for loading all our images and animations and sound effects
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexdead=loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  cactus1=loadImage("obstacle1.png")
  cactus2=loadImage("obstacle2.png")
  cactus3=loadImage("obstacle3.png")
  cactus4=loadImage("obstacle4.png")  
  cactus5=loadImage("obstacle5.png")   
  cactus6=loadImage("obstacle6.png")   
  gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  
  
  //loading the sounds
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200);
  trex = createSprite(50,181,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("dead",trexdead)
  // changing the size of trex
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,5);
 ground.addImage(groundImage);

  ground2 = createSprite(200,190,400,5)
  ground2.visible = false
  
  gameover=createSprite(300,100)
  gameover.addImage(gameoverImage)
  gameover.scale=0.5
  
   restart=createSprite(300,140)
  restart.addImage(restartImage)
  restart.scale=0.5
  
 // var c = Math.round(random(1,9))
//  console.log(c)
  cloudgroup=new Group();
  cactusgroup=new Group();
  //makeing the collision radius visible
 // trex.debug=true
  trex.setCollider("circle",0,0,40)
  
}
function draw(){
  background("lightyellow");
  
  
  if(gamestate=="play"){
    
    gameover.visible=false
    restart.visible=false
    //moving the ground
  ground.velocityX = -2;
    
   //it make the score increase
 score=score+Math.round(getFrameRate()/60) 
    
     // scrolling the ground
  if(ground.x < 0){
    ground.x = 200;
  }
     //making trex jump
  if(keyDown("space")&& trex.y>140){
     trex.velocityY = -10;
    jumpSound.play()
     }
    //checkpoint sound will play every time we cross another 100 points
    if(score%100==0 &&score>0){
      checkpointSound.play()
    }
     //adding gravity to trex
  trex.velocityY = trex.velocityY + 0.7;
   //it make the cloud,s and cactus,s 
     spawnCloud()
  spawncactus()
    
  //checking if trex is hiting the cactus
    if(cactusgroup.isTouching(trex)){
      gamestate="end"
      dieSound.play()
      trex.velocityY=0
    }
  }
  
  if(gamestate=="end"){
    
     gameover.visible=true
    restart.visible=true
    //stopping the gruond
    ground.velocityX = 0
    //freezing all the cactus and the cloud when trex dies
    cloudgroup.setVelocityXEach(0)
    cactusgroup.setVelocityXEach(0)
    
 //stoping the cloud and the cactus from disappearing
    cloudgroup.setLifetimeEach(-1)
   cactusgroup.setLifetimeEach(-1) 
   //make trex look dead
    trex.changeAnimation("dead",trexdead)
    //checking if the restart button has been pressed
    if(mousePressedOver(restart)){
      reset()
    }
  }
  //displaying the score
  text("Score : "+score,450,30)
   
  
  // displaying the value of "anything" in the console window
 
 
 
  //making trex stay on the ground
  trex.collide(ground2);
  
 
  //display your objects
  drawSprites();
}
function reset(){
gamestate="play" 
  cloudgroup.destroyEach()
  cactusgroup.destroyEach()
  trex.changeAnimation('running')
  score=0
}
function spawnCloud(){
 if (frameCount%100===0){
 cloud = createSprite(600,100,40,10)
 cloud.addImage(cloudImage)  
   
 cloud.velocityX = - 4
  cloud.y=Math.round(random(10,110))
   //makeing cloud disappear
  cloud.lifetime=200
   //makeing the depth of trex more then the cloud
   trex.depth=cloud.depth+1
   //adding all the clouds in the cloudgroup
   cloudgroup.add(cloud)
   
 }
 
}
function spawncactus(){
if (frameCount%100===0){
 cactus = createSprite(600,160,10,40) 
cactus.scale=0.5
cactus.lifetime=200  
  cactus.velocityX = -4
  var apple=Math.round(random(1,6))
  switch(apple){
    case 1:cactus.addImage(cactus1)
      break;
        case 2:cactus.addImage(cactus2)
      break;
      case 3:cactus.addImage(cactus3)
      break;
      case 4:cactus.addImage(cactus4)
      break;
      case 5:cactus.addImage(cactus5)
      break;
      case 6:cactus.addImage(cactus6)
      break;
      default:break;
  }  
   //adding all the cactus in the cactusgroup
   cactusgroup.add(cactus)
}  
  
  
  
}


