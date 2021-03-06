function Sprite(){
  this.g = 10;
  this.x = 50;
  this.y = 370;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 25;
  this.height = 40;
  this.angle = 0;
  this.vang = 0;
  this.color = "blue";
  this.imagem = new Image();
  this.imagem.src = "nave.png"
}

Sprite.prototype.desenhar = function (ctx){
  ctx.save()
  /*ctx.translate(this.x, this.y);
  ctx.rotate(92.7);
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.moveTo(-this.width/2, -this.height/2);
  ctx.lineTo(-this.width/2, +this.height/2);
  ctx.lineTo(+this.width/2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();*/
  
  ctx.drawImage(this.imagem, this.x, this.y);

  //ctx.strokeStyle = "red";
  //ctx.strokeRect(this.x, this.y, this.width, this.height);
  ctx.restore();
}

Sprite.prototype.mover = function (dt){
  //Aceleração
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;

  //Velocidade
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;

  this.angle = this.angle + this.vang *dt;
}

//Colisão retangular
Sprite.prototype.colodiuCom = function(alvo){
  if(this.x + this.width < alvo.x)return false;
  if(this.x > alvo.x + this.width)return false;
  if(this.y + this.height < alvo.y)return false;
  if(this.y > alvo.y + this.height)return false;
  return true;
}

Sprite.prototype.perseguir = function(alvo, dt){
  this.ax = 10*dt*(alvo.x - this.x) - 0.05*this.vx;
  this.ay = 10*dt*(alvo.y - this.y) - 0.05*this.vy;
}

Sprite.prototype.moverAng = function (dt){

  this.angle = this.angle + this.vang * dt;
  this.ax = this.am * Math.cos(Math.PI * this.angle / 180);
  this.ax = this.am * Math.sin(Math.PI * this.angle / 180);

  //Aceleração
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;

  //Velocidade
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
}

Sprite.prototype.perseguirAng = function(alvo, dt){
  var dX = alvo.x - this.x;
  var dY = alvo.y - this.y;
  var dist = Math.sqrt(dX*dX+dY*dY);
  var dA = 180*Math.acos(dX/dist)/Math.PI;
  this.vang = 100*(dA - this.angle)*dt;
}
