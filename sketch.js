var manImage
var thunder1,thunder2,thunder3,thunder4
var man
var ground,thunder,thunderGroup
var batman,batmanImage,batarang,batarangImage
var twoface,twofaceImage
var lasersGroup, batarangG
var laser, batarang
var gameState = "Play"
var score = 0;
var laser1S=0;
var laser2S=0;
var laser3S=0;
var laser4S=0;
var laser5S=0;
function preload(){
   manImage = loadAnimation("walking_8.png","walking_7.png","walking_6.png","walking_5.png","walking_4.png","walking_3.png","walking_2.png","walking_1.png") 
   thunder1 = loadImage("1.png")
   thunder2 = loadImage("2.png")
   thunder3 = loadImage("3.png")
   thunder4 = loadImage("4.png")
   batmanImage = loadImage("Batman-PNG-File.png")
   twofaceImage = loadImage("5.png")
   batarangImage = loadImage("batarang.png")
}

function setup(){
   createCanvas(600,600)
   man = createSprite(150,450)
   man.addAnimation("Walking",manImage)
   man.scale = 0.4

   ground = createSprite(300,590,600,10)
   roof = createSprite(300,10,600,10)

   batman = createSprite(50,300)
   batman.addImage(batmanImage)
   batman.scale = 0.1

   twoface = createSprite(550,300)
   twoface.addImage(twofaceImage)
   twoface.scale = 0.1
   twoface.velocityY=-5

   thunderGroup = new Group();

   lasersGroup = new Group();

   batarangG = new Group();

   spawnLasers()
}

function draw(){
  if(gameState==="Start"){
    background(0)
    spawnThunder();
    fill("red")
    drawSprites();  
    text("Bruce has lost his parents and is ready to take the vengence",10,200)
    text("He is Ready To Become the Batman in order to kill the enemies",10,220)
    text("Press S to Start",10,240)
    batman.visible = false
    // if(KeyWentDown("s")){
    //   gameState = "Play"
    // }
  }
  if(gameState==="Play"){
    background(150);
    fill(0)
   
    man.visible = false
    thunderGroup.destroyEach()
    //if(KeyDown("UP_ARROW")){
    //  batman.y-=5
    //}
    //if(KeyDown("DOWN_ARROW")){
      batman.y = mouseY
   // }
    twoface.bounceOff(roof)
    twoface.bounceOff(ground)
    
    laser1.bounceOff(roof)
    laser1.bounceOff(ground)
    laser2.bounceOff(roof)
    laser2.bounceOff(ground)
    laser3.bounceOff(roof)
    laser3.bounceOff(ground)
    laser4.bounceOff(roof)
    laser4.bounceOff(ground)
    laser5.bounceOff(roof)
    laser5.bounceOff(ground)
    
    if(mousePressedOver(batman)){
      createBatarang();
    }

    if(batarangG.isTouching(laser1)){
      //lasersGroup.destroyEach();
      batarangG.destroyEach();
      laser1S += 1;
    }
    if(batarangG.isTouching(laser2)){
      //lasersGroup.destroyEach();
      batarangG.destroyEach();
      laser2S += 1;
    }
    if(batarangG.isTouching(laser3)){
      //lasersGroup.destroyEach();
      batarangG.destroyEach();
      laser3S += 1;
    }
    if(batarangG.isTouching(laser4)){
      //lasersGroup.destroyEach();
      batarangG.destroyEach();
      laser4S += 1;
    }
    if(batarangG.isTouching(laser5)){
      //lasersGroup.destroyEach();
      batarangG.destroyEach();
      laser5S += 1;
    }

    if(laser1S >= 10){
      laser1.destroy();
    }
    if(laser2S >= 10){
      laser2.destroy();
    }
    if(laser3S >= 10){
      laser3.destroy();
    }
    if(laser4S >= 10){
      laser4.destroy();
    }
    if(laser5S >= 10){
      laser5.destroy();
    }

    if(batarangG.isTouching(twoface)){
      batarangG.destroyEach();
      score = score+1;
    }

    if(score >= 15){
      batarangG.destroyEach();
      lasersGroup.destroyEach();
      twoface.destroy();
      gameState = "end"
    }
    text("TwoFaceDeath:"+score, 350,50)
    text("Blade1Death:"+laser1S, 350,65)
    text("Blade2Death:"+laser2S, 350,80)
    text("Blade3Death:"+laser3S, 350,95)
    text("Blade4Death:"+laser4S, 350,110)
    text("Blade5Death:"+laser5S, 350,125)
    drawSprites();
  }

  if(gameState === "end"){
    textSize(25);
    text("Mission Accomplished!!!", 250,250);
  }
  
}   

function spawnThunder(){
  if(frameCount%60===0){
    thunder = createSprite(Math.round(random(50,350)),50)
    var rand = Math.round(random(1,4))
    if(rand===1){
        thunder.addImage(thunder1)
    }
    else if(rand===2){
      thunder.addImage(thunder2)
    }
    else if(rand===3){
      thunder.addImage(thunder3)
    }
    else if(rand===4){
      thunder.addImage(thunder4)
    } 
    thunder.scale = 0.5
    thunder.lifetime = 20
    thunderGroup.add(thunder)
  }
 
}

function createBatarang() {
  batarang=createSprite(50,200,50,10);
  batarang.addImage(batarangImage);
  batarang.velocityX=3;
  batarang.scale=0.4;
  batarang.y=batman.y;
  batarang.x=batman.x;
  //batarang.debug=true;
  batarang.setCollider("rectangle",0,0,100,20)
  //batarang.rotation;
  batarang.rotationSpeed=6;
  batarangG.add(batarang);  
}

function spawnLasers() {
  laser1 = createSprite(120,120,Math.round(random(5,20)),Math.round(random(30,60)));
  laser2 = createSprite(210,120,Math.round(random(5,20)),Math.round(random(30,60)));
  laser3 = createSprite(300,120,Math.round(random(5,20)),Math.round(random(30,60)));
  laser4 = createSprite(390,120,Math.round(random(5,20)),Math.round(random(30,60)));
  laser5 = createSprite(480,120,Math.round(random(5,20)),Math.round(random(30,60)));

  laser1.shapeColor = color(0);;
  laser2.shapeColor = color(255);;
  laser3.shapeColor = color(190);;
  laser4.shapeColor = color(50);;
  laser5.shapeColor = color(100);;
  
  laser1.rotationSpeed=random(10, 20);
  laser2.rotationSpeed=random(10, 30);
  laser3.rotationSpeed=random(5, 15);
  laser4.rotationSpeed=random(40, 50);
  laser5.rotationSpeed=random(20, 30);

  //laser.lifetime = 1000;
  laser1.velocityY=random(-5,-15);
  laser2.velocityY=random(-5,-15);
  laser3.velocityY=random(-5,-15);
  laser4.velocityY=random(-5,-15);
  laser5.velocityY=random(-5,-15);
}


