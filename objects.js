function blip() {
  var blip = new Audio("sounds/blip.mp3");
  blip.play();
}

function music() {
  var music = new Audio("sounds/muziek.mp3");
  music.play();
}




function Star(spd,ang,rotSpd,sz,pos){
  this.size = sz;
  this.speed = spd;
  this.angle = ang;
  this.rotationSpeed = rotSpd;
  this.positionX = pos;
  this.positionY = 0;
  this.Draw = function(context){
    context.save();
    context.translate(this.positionX+Math.round(this.size/2),this.positionY+Math.round(this.size/2));
    context.rotate(this.angle);
    var img = new Image();
    img.src = "images/star.png";
    context.drawImage(img,-this.size/2,-this.size/2,this.size,this.size);
    context.restore();
  }
  this.Move = function(){
    this.positionY += this.speed;
    this.angle += this.rotationSpeed;
  }
  this.MoveBack = function(X){
    this.positionX = X;
    this.positionY = 0;
  }
  this.ColisionDetectObject = function(object){
    Xmin = object.posX;
    Xmax = object.posX+object.size;
    Ymin = object.posY;
    Ymax = object.posY+object.size;
    Xleft = this.positionX;
    Xright = this.positionX + this.size;
    Yup = this.positionY;
    Ydown = this.positionY + this.size;

    //console.log(Xmin + Xleft +Xright + )
    if ((((Xmin<Xleft)&&(Xleft<Xmax))||((Xmin<Xright)&&(Xright<Xmax)))&&(((Ymin<Yup)&&(Yup<Ymax))||((Ymin<Ydown)&&(Ydown<Ymax)))) {
      //console.log("true");
      return true;
    }
    else {
      //console.log("false")
      return false;
    }
  }
}
function Stars(){
  this.sterren =[];
  this.minSpeed = 3;
  this.maxSpeed = 7;
  this.minAng = 0;
  this.maxAng = 2;
  this.minRotSpeed = 0.1;
  this.maxRotSpeed = 0.3;
  this.minSize = 20;
  this.maxSize = 70;
  this.minPos = 0;
  this.maxPos = 800;
  this.score = 0;
  this.Create = function(am){
    for (var i = 0; i < am; i++) {
      this.sterren.push(new Star(Math.round(Math.random()*(this.maxSpeed-this.minSpeed)+this.minSpeed),Math.round(Math.random()*(this.maxAng-this.minAng)+this.minAng),Math.random()*(this.maxRotSpeed-this.minRotSpeed)+this.minRotSpeed,Math.round(Math.random()*(this.maxSize-this.minSize)+this.minSize),Math.round(Math.random()*(this.maxPos-this.minPos)+this.minPos)));
    }
  }
  this.Draw = function(ctx){
    for (var i = 0; i < this.sterren.length; i++) {
      this.sterren[i].Draw(ctx);
    }
  }
  this.Move = function(){
    for (var i = 0; i < this.sterren.length; i++) {
      this.sterren[i].Move();
    }
  }
  this.ColisionDetect = function(object){
    for (var i = 0; i < this.sterren.length; i++) {
      var botsing = this.sterren[i].ColisionDetectObject(object);
      if (botsing) {
        //console.log("botsing");
        this.sterren[i].MoveBack(Math.round(Math.random()*this.maxPos));
        this.score++;
        blip();
      }
      if (this.sterren[i].positionY>500) {
        this.sterren.splice(i,1);
      }
    }
  }
}


function Smiley(){
  this.posX = 0;
  this.posY = 410;
  this.size = 70;

  this.Move = function(posX,level){
    this.posX = posX;
    this.posY = 410-(level*5);
  }

  this.Draw = function(context){
    var img = new Image();
    img.src = "images/Smiley.svg";
    context.drawImage(img,this.posX,this.posY,this.size,this.size);
    //console.log("getekend" + this.posX + this.posY+this.size);
  }
}
