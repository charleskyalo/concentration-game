/* keeping track of the first square you clicked on */


/*change background  randomly and assign it */

const body = document.getElementById('bd');
const images = ["imgs/nasa1.jpg", "imgs/nasa2.jpg", "imgs/nasa3.jpg"];


function randomBackground() {
    let randomImgIndex = random(images.length);
    let randomImg = images[randomImgIndex];
    let randomImgUrl = `url('${randomImg}')`;
    return body.style.backgroundImage = `${randomImgUrl}`;
}

const resetButton = document.getElementById('reset-button');
const colors = [];
for (let i = 0; i < 10; i++) {
    colors.push('square-' + i);
}


function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
    this.setColor(color);
}

/* handleEvent */
GameSquare.prototype.handleEvent = function (e) {
    switch (e.type) {
        case "click":
            if (this.isOpen || this.isLocked) {
                return;
            }
            this.isOpen = true;
            this.el.classList.add('flip');
            checkGame(this);
    }
}


/* reset game */

GameSquare.prototype.reset = function () {
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
}

/* lock the game */

GameSquare.prototype.lock = function () {
    this.islocked = true;
    this.isOpen = true;
}

/* set color on the squares */

GameSquare.prototype.setColor = function (color) {
    this.el.children[0].children[1].classList.remove(this.color);
    this.color = color;
    this.el.children[0].children[1].classList.add(color);
}



/* setting up the game */
const gameSquares = [];


/* set the game up  */
function setupGame() {
    const gameElemsArr = document.getElementsByClassName('game-square');
    let randomColors = getSomeColors();
    for (let i = 0; i < gameElemsArr.length; i++) {
        /* get a random color */
        let randomColorIndex = random(randomColors.length);
        let color = randomColors.splice(randomColorIndex, 1)[0];
        gameSquares.push(new GameSquare(gameElemsArr[i], color));
    }
};


/* randomize the colors */
function random(n) {
    return Math.floor(Math.random() * n)
}

function getSomeColors() {
    let colorsCopy = colors.slice();
    let randomColors = [];
    for (let i = 0; i < 8; i++) {
        let index = random(colorsCopy.length);
        randomColors.push(colorsCopy.splice(index, 1)[0]);
    }
    return randomColors.concat(randomColors.slice());
}


/* game logic */
let firstSquare = null;

function checkGame(gameSquare) {
    if (firstSquare === null) {
        firstSquare = gameSquare;
        return;
    }

    if (firstSquare.color === gameSquare.color) {
        firstSquare.lock();
        gameSquare.lock();
    } else {
        let a = firstSquare;
        let b = gameSquare;
        setTimeout(() => {
            a.reset();
            b.reset();
            firstSquare = null;
        }, 400);

    }
    firstSquare = null;
}

/* reset colors */

function randomizeColors() {
    let randomColors = getSomeColors();
    gameSquares.forEach(function (gameSquare) {
        let color = randomColors.splice(random(randomColors.length, 1)[0]);
        gameSquare.setColor(color);
    });
}
/* clear game */

function clearGame() {
    gameSquares.forEach(function (gameSquare) {
        gameSquare.reset();
    });
    setTimeout(function () {
        randomizeColors();
    }, 500);
}
resetButton.addEventListener("click", clearGame);
randomBackground();
setupGame();