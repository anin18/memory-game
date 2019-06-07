let cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', rotateCards));

let isTurned = false;
let lockedBoard = false;
let firstCard;
let secondCard;
let moves = 0;
let end = 0;
let counter = document.querySelector("#moves");
function rotateCards() {
    if(lockedBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('rotate');
    if (!isTurned) {
        isTurned = true; 
        firstCard = this;
        moveCounter();
    } else {
        isTurned = false;
        secondCard = this;

        console.log(firstCard.dataset.name);
        console.log(secondCard.dataset.name);

        checkEquality();
       
    }    
}

// check if are two cards equal
function checkEquality() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        removeClick();
    } else {
        turnBack();
    }     
}

// remove click if are two identical cards found
function removeClick() {
    firstCard.removeEventListener('click', rotateCards);
    secondCard.removeEventListener('click', rotateCards);
    end++;
    if (end === 12) {
        alert('GAME IS OVER! Number of your moves is ' + moves + '.');
    };
 startTimer();
    resetBoard();
}

// turn around cards if are the different
function turnBack() {
    lockedBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('rotate');
        secondCard.classList.remove('rotate');
      
        lockedBoard = false;
        resetBoard();
    }, 1000);
}


//move counter
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
       moves++;
    }
}

function resetBoard() {
    [isTurned, lockedBoard] =[false, false];
    [firstCard, secondCard] = [null, null];
   
}
//shuffle cards
(function shuffleCards() {
    cards.forEach(card=> {
        let position = Math.floor(Math.random()*24);
        card.style.order = position;
    });
})();
