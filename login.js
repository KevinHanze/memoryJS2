//document.getElementById("submit").addEventListener("submit",login(event))
function login(event){
    event.preventDefault()
    // var formData = new FormData(document.getElementById("loginform").value);
    // console.log(formData)
    var username = document.getElementById('username').value;
    var passw = document.getElementById('password').value;
    const logindata = {"username": username, "password":passw}
    fetch('http://localhost:8000/api/login_check',{ method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(logindata)
    })
        .then(resp => resp.json())
        .then( json => {
            const current= new Date()
            const test = {
                token: json.token,
                expiry: current.getTime()+ 3600
            }
            localStorage.setItem('player_token', JSON.stringify(test))
            }
        )

}

function getSettings(){
    var token = localStorage.getItem('player_token');
    console.log(token)
    fetch('http://localhost:8000/api/player/{id}',{ method:'get',
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
function register(){
    var name = document.getElementById('name').value;
    var passwo = document.getElementById('passw').value;
    var email = document.getElementById('email').value;
    const logindata = {"username": name, "email":email, "password":passwo}
    console.log(logindata)
    fetch('http://localhost:8000/register',{ method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(logindata)
    })
        .then( resp => resp.json() )
        .then( json => {

            }
        )
    location.href = "login.html";
}