const game=document.getElementById("game");
const player=document.getElementById("player");
const scoreText=document.getElementById("score");
const gameOverBox=document.getElementById("gameOver");

const lanes=[40,180,320];
let lane=1;
let score=0;
let jump=false;
let over=false;

function movePlayer(){
player.style.left=lanes[lane]+"px";
}

document.addEventListener("keydown",e=>{

if(over && e.key==="Enter"){
location.reload();
}

if(e.key==="ArrowLeft" && lane>0){
lane--;
movePlayer();
}

if(e.key==="ArrowRight" && lane<2){
lane++;
movePlayer();
}

if(e.key==="ArrowUp" && !jump){
doJump();
}
});

function doJump(){
jump=true;
player.style.bottom="180px";

setTimeout(()=>{
player.style.bottom="30px";

setTimeout(()=>{
jump=false;
},150);

},400);
}

function createObstacle(){

if(over) return;

const obs=document.createElement("div");
obs.classList.add("obstacle");

const lanePos=Math.floor(Math.random()*3);

obs.style.left=lanes[lanePos]+"px";
obs.style.top="-120px";

game.appendChild(obs);

let y=-120;

const run=setInterval(()=>{

if(over){
clearInterval(run);
return;
}

y+=8;
obs.style.top=y+"px";

if(
y>520 &&
y<650 &&
lane===lanePos &&
!jump
){
gameOver();
}

if(y>750){
clearInterval(run);
obs.remove();
score++;
scoreText.innerText=score;
}

},20);
}

function createCoin(){

if(over) return;

const coin=document.createElement("div");
coin.classList.add("coin");

const lanePos=Math.floor(Math.random()*3);

coin.style.left=(lanes[lanePos]+15)+"px";
coin.style.top="-40px";

game.appendChild(coin);

let y=-40;

const run=setInterval(()=>{

if(over){
clearInterval(run);
return;
}

y+=6;
coin.style.top=y+"px";

if(
y>560 &&
y<650 &&
lane===lanePos
){
score+=100;
scoreText.innerText=score;

clearInterval(run);
coin.remove();
}

if(y>750){
clearInterval(run);
coin.remove();
}

},20);
}

function gameOver(){
over=true;
gameOverBox.style.display="block";
}

setInterval(createObstacle,1200);
setInterval(createCoin,900);