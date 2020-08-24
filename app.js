const resetButton = document.getElementById('reset-button');
const colors =[];
for (let i = 0 ; i < 10 ;i++){
    colors.push('square-' +i);
}
console.log(colors);

function GameSquare(el,color){
    this.el = el ;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click",this,false);
    this.setColor(color);
}

/* handleEvent */
GameSquare.prototype.handleEvent = function (e){
switch (e.type){
    case"click":
    if (this.isOpen || this.isLocked){
        return
    }
    this.isOpen = true;
    this.el.classList.add('flip');
}
}



/* reset game */




GameSquare.prototype.reset = function (){
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
}

GameSquare.prototype.lock = function (){
    this.islocked = true;
    this.isOpen = true;
}

/* set color on the squares */

GameSquare.prototype.setColor = function (color){
this.el.children[0].children[1].classList.remove(this.color);
this.color = color;
this.el.children[0].children[1].classList.add(color);
}



/* setting up the game */
const gameSquares = [];


/* set the game up  */
function setupGame(){
const gameElemsArr = document.getElementsByClassName('game-square');
for(let i = 0; i < gameElemsArr.length;i++){
    gameSquares.push(new GameSquare(gameElemsArr[i],colors[0]));
}
};

setupGame();
console.log(gameSquares);