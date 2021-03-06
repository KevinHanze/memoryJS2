const kaarten = localStorage.getItem("sizes")*localStorage.getItem("sizes")
const lb = localStorage.getItem("sizes")
const afbeeldingen = kaarten/2;


function Kaartmaker(node, count, deep) {
    for (var i = 0, copy; i<count -1; i++){
        copy = node.cloneNode(deep);
        var x=i+2;
        copy.id = 'card'+x;
        node.parentNode.insertBefore(copy, node);
    }
}
if (localStorage.getItem("sizes")=== null){
    localStorage.setItem("sizes",'36');
    var test = localStorage.getItem("sizes");
    Kaartmaker(document.querySelector('.cell'),test,true);
    var lengte = 'repeat('+lb + ", 90px)";
    document.documentElement.style.setProperty('--columns',lengte);
}
else {
    Kaartmaker(document.querySelector('.cell'), localStorage.getItem("sizes")*localStorage.getItem("sizes"), true)
    var lengte2 = 'repeat('+lb + ", 90px)";
    document.documentElement.style.setProperty('--columns',lengte2);
}


const cards = document.querySelectorAll('.cell')
const pairs = document.getElementById('pairs');
const victoryImg = document.getElementById("victory-img")
const newGameButton = document.getElementById("new-game-button")
const imagesUrl = "https://picsum.photos/300";
const dogImagesUrl = "https://dog.ceo/api/breeds/image/random"
const settings = document.getElementById('settings-icon');
const time = document.getElementById('time');



const options = {
    method: "GET"
}

let cardFlipped = false;
let firstCard, secondCard
let boardLocked = false;
let cardsFlipped = 0;
let loadedImages = [];
let pairsFound = 0;
let secondsPlayed = 0;
let timerStarted = false;

cards.forEach(card => card.addEventListener("click", flipCard))
victoryImg.addEventListener("click", resetBoard)
newGameButton.addEventListener("click", resetBoard)
settings.addEventListener("click", goToSettings)

function goToSettings() {
    location.href = "settings.html";
}

function setCounter() {
    secondsPlayed += 1;
    time.innerHTML = "Verlopen tijd: " + secondsPlayed;
    setTimeout(setCounter, 1000);
    let timeBar = document.getElementById('bar');
    let timeLeft = 100 - secondsPlayed;
    timeBar.style.width=timeLeft+"%";
}

function updatePairs() {
    pairs.innerHTML = "Gevonden kaart-paren: " + pairsFound;
}

function flipCard() {
    if (boardLocked) {return;}
    if (this === firstCard) {return;}
    this.classList.toggle('flip')
    if (!timerStarted) {
        timerStarted = true;
        setCounter();
    }
    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
    } else {
        boardLocked = true;
        cardFlipped = false;
        secondCard = this;
        if (firstCard.innerHTML === secondCard.innerHTML) {
            flip();
            pairsFound++;
            setTimeout(updatePairs(), 500)
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

function getSettings() {
    var token = localStorage.getItem('player_token');
    fetch('http://localhost:8000/{id}/preferences',{ method:'get',
        headers:{'Content-Type':'application/json','player_token':token}
    })
        .then( resp => resp.json() )
        .then( json => {
                console.log(json.data)
            }
        )
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
    for (let i = 0; i < afbeeldingen; i++) {
        await fetch(dogImagesUrl)
            .then((response) => response.json())
            .then((data) => {
                loadedImages.push(data.message)
            })
    }
    asignImage();
    boardLocked = false;
}
function getPlayers(){

    fetch('http://localhost:8000/scores',{ method:'GET'})
        .then( resp => resp.json() )
        .then( json => {
            console.log(json)
            var tbody = document.getElementById('tbody')
            json.sort(function (a, b){
                return b.score - a.score
            })
            for(var i =0; i<5; i++){
                var tr = "<tr>";
                tr += "<td>" +json[i].username + "</td>"+"<td>"+json[i].score+"</td></tr>"
                tbody.innerHTML += tr;
            }
        })
}

    async function loadPicsumImages() {
        boardLocked = true;
        for (let i = 0; i < afbeeldingen; i++) {
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
        for (let i = 0; i < afbeeldingen; i++) {
            let j = i + afbeeldingen;
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


function changeSize() {
    {
        let size = document.getElementById("boardsize-dropdown").value;
        localStorage.setItem("sizes", size);
        console.log(size, localStorage.getItem("sizes"))
        window.location.reload();
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
        } else {
            loadedImages = [];
            removeImages()
            loadDogImages();
        }

        window.location.reload();
    }

function goToLogin() {
    location.href = "login.html";
}



