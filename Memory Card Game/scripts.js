const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard =  false;
let lockedBoard = false;
let firstCard, secondCard;
function flipCard() {
    if(lockedBoard) return;//If two cards have been flipped and not a match, Can't flip another
    if(this === firstCard) return;//Can't flip the same card twice
    // console.log("I was clicked!");
    // console.log(this);
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //First Click
        hasFlippedCard = true;
        firstCard = this;
        return;
        // console.log(hasFlippedCard, firstCard);
    }

    //second click
    secondCard = this;

    checkForMatch();
    //do Cards match?
    // console.log(firstCard.dataset.framework);
    // console.log(secondCard.dataset.framework);
    function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch? disableCards() : unflipCards();

        function disableCards () {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            resetBoard();
            // console.log("Function was executed!")
        }
        function unflipCards() {
            lockedBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetBoard();
            }, 1500);
        }
    }
}

function resetBoard () {
        [hasFlippedCard, lockedBoard, firstCard, secondCard] = [false, false, null, null];
}
(function shuffle() {
        cards.forEach(card => {let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
})();

cards.forEach(card => card.addEventListener('click', flipCard));