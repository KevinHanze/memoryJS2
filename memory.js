const cards = document.querySelectorAll('.cell')
const victoryImg = document.getElementById("victory-img")
const newGameButton = document.getElementById("new-game-button")

let cardFlipped = false;
let firstCard, secondCard
let boardLocked = false;
let cardsFlipped = 0;

cards.forEach(card => card.addEventListener("click", flipCard))
victoryImg.addEventListener("click", resetBoard)
newGameButton.addEventListener("click", resetBoard)

function flipCard(event) {
    if (boardLocked) {return;}
    if (this === firstCard) {return;}
    this.classList.toggle('flip')
    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
    } else {
        boardLocked = true;
        cardFlipped = false;
        secondCard = this;
        if (firstCard.innerHTML === secondCard.innerHTML) {
            flip();
        } else {
            resetCards()
        }
    }
}

function hasWon() {
    return document.getElementsByClassName('cell').length === cardsFlipped;
}

function showVictoryScreen() {
    victoryImg.style.display = "block";
}

function flip() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)
    setTimeout(() => {
        firstCard.classList.toggle('found')
        secondCard.classList.toggle('found')
    }, 500)
    cardsFlipped+=2;
    console.log(cardsFlipped)
    boardLocked=false;
    if (hasWon() === true) {
        setTimeout(() => {showVictoryScreen()}, 600)

    }
}

function resetCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
    }, 1000)
    boardLocked = false;
}

function resetBoard() {
    victoryImg.style.display = 'none';
    cardFlipped =false;
    boardLocked = false;
    firstCard = null;
    secondCard = null;

    window.location.reload();
}

function asignLetters() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 36);
     })
}

function fetchImage() {
    const imgUrl = "https://picsum.photos/200";
    (async () => {
        const response = await fetch(imgUrl);
        const imageBlob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            const base64data = reader.result;
            console.log(base64data);
        }
    })()
}



