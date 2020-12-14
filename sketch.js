var dog,happyDog, database, foodS=0, foodStock;

function preload()
{
 dogImg = loadImage("images/dogImg1.png");
 happyDogImg = loadImage("images/dogImg.png");
}


function setup() {
  createCanvas(500,500);
  database=firebase.database();

  dog = createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale= 0.5

  foodStock=database.ref("Food");
  foodStock.on("value", readStock);
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
     x=0;
  }else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x

  })

}


function draw() {  

  background(46, 139, 87);
  
  drawSprites();
  fill("black")
  text("Food"+foodS,30,300)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);

  }
  else{
  dog.addImage(dogImg);
  }

  
  

}



