const cards = document.querySelectorAll('.cell')
const victoryImg = document.getElementById("victory-img")
const newGameButton = document.getElementById("new-game-button")
const imagesUrl = "https://picsum.photos/300";
const dogImagesUrl = "https://dog.ceo/api/breeds/image/random"

const options = {
    method: "GET"
}

let cardFlipped = false;
let firstCard, secondCard
let boardLocked = false;
let cardsFlipped = 0;
let loadedImages = [];

cards.forEach(card => card.addEventListener("click", flipCard))
victoryImg.addEventListener("click", resetBoard)
newGameButton.addEventListener("click", kaas)

function flipCard() {
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

    document.getElementById("card-dropdown").selectedIndex = localStorage.getItem("picture-choice")

}

function kaas() {
    console.log(sessionStorage.getItem("picture-choice")) ;
}

function shuffleCards() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 36);
     })
}

function loadStartingImages() {
    if (sessionStorage.getItem("picture-choice") === 'random') {
        loadPicsumImages()
    } else {
        loadDogImages()
    }
}

async function loadDogImages() {
    boardLocked = true;
    for (let i = 0; i < 18; i++) {
        await fetch(dogImagesUrl)
            .then((response) => response.json())
            .then((data) => {
                loadedImages.push(data.message)
            })
    }
    asignImage();
    boardLocked = false;
}

    async function loadPicsumImages() {
        boardLocked = true;
        for (let i = 0; i < 18; i++) {
            let response = await fetch(imagesUrl, options)

            if (response.status === 200) {
                const imgBlob = await response.blob()
                const imageObjectURL = URL.createObjectURL(imgBlob)

                const image = document.createElement("img")
                image.src = imageObjectURL;

                loadedImages.push(imageObjectURL)

            } else {
                console.log("HTTP-Error" + response.status)
            }
        }

        asignImage();
        boardLocked = false;
    }

    function asignImage() {
        for (let i = 0; i < 18; i++) {
            let j = i + 18;
            let img = document.createElement("img");
            let img2 = document.createElement("img");
            img.src = loadedImages[i];
            img2.src = loadedImages[i];
            cards[i].appendChild(img);
            cards[j].appendChild(img2);
        }

        shuffleCards();
    }

    function removeImages() {
    for (let i =0; i < cards.length; i++) {
        if (cards[i].firstChild) {
            cards[i].removeChild(cards[i].firstChild)
            }
        }
    }

    function changeColor() {
        var defaultColor = document.getElementById("card-color").value;
        document.documentElement.style.setProperty('--colorclosed', defaultColor);
    }
    function changeCardPictures() {
        let menu = document.getElementById("card-dropdown");
        let menuValue = menu.value;

        sessionStorage.clear();
        sessionStorage.setItem("picture-choice", menuValue)

        if (sessionStorage.getItem("picture-choice") === "dogs") {
            loadedImages = [];
            removeImages()
            loadDogImages();
        } else if (sessionStorage.getItem("picture-choice") === "random") {
            loadedImages = [];
            removeImages()
            loadPicsumImages();
        }
        else {
            loadedImages = [];
            removeImages()
            loadDogImages();
        }
}





