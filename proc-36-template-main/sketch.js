var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var feedDog,feedTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedDog=createButton("Feed The Dog")
  feedDog.position(680,95)
  feedDog.mousePressed(feedFood)

}

function draw() {
  background(46,139,87);
  foodObj.display();

 
  lastFed=database.ref('feedTime')
  lastFed.on("value",(data)=>{
  lastFed=data.val();
   })
    
  if(lastFed<=12){
    textSize(15)
    fill("white") 
    text("last fed time: "+ lastFed+"PM",250,30) 
  }else if(lastFed===0){
    textSize(15)
    fill("white") 
    text("last fed time:12AM ",250,30)
  } else{
    textSize(15)
    fill("white") 
    text("last fed time: "+ lastFed+"AM",250,30)
  }    

 
  drawSprites();
}

 function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

 function updateLastFedTime(ft){

   database.ref('feedTime').update({
     feedTime:ft,
     feedTime:hour()
   })
 }

  function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
  }

function feedFood(){

  dog.addImage(happyDog) 
  updateLastFedTime();
  foodS=foodS-1;
  database.ref('/').update({
    Food:foodS
  })
}

