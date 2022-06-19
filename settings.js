document.getElementById('button').addEventListener("click", submitPreferences)
document.getElementById('button').addEventListener("click", goToMemory)
document.g

function submitPreferences() {
    let preferedApi = document.getElementById('image-pick').value;
    let cardOpen = document.getElementById('card-color-open').value;
    let cardClosed = document.getElementById('card-color-closed').value;

    const preferences = {"api": preferedApi, "color_found": cardOpen, "color_closed": cardClosed};
    const token = localStorage.getItem('player_token');

    fetch('http://localhost:8000/api/player/{id}/preferences',{ method:'POST',
        headers:{'Content-Type':'application/json','player_token':token},
        body:JSON.stringify(preferences)
    })
        .then( resp => resp.json() )
        .then( json => {

            }
        )
}

function goToMemory() {
    location.href = "memory.html";
}

function getEmail(){
    var token = localStorage.getItem('player_token');
    console.log(token)
    fetch('http://localhost:8000/api/player/{id}/email',{ method:'get',
        headers:{'Content-Type':'application/json','player_token':token}
    })
        .then( resp => resp.json() )
        .then( json => {
                // let jwt = data.token;
                console.log(token)
                console.log(json.data)
            }
        )
}