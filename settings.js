document.getElementById('button').addEventListener("click", submitPreferences)
document.getElementById('button').addEventListener("click", goToMemory)

function submitPreferences() {
    let preferedImage = document.getElementById('image-pick').value;
    let cardOpen = document.getElementById('card-color-open').value;
    let cardClosed = document.getElementById('card-color-closed').value;


}

function goToMemory() {
    location.href = "memory.html";
}

