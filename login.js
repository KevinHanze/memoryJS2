function login(){
    var username = document.getElementById('username').value;
    var passw = document.getElementById('password').value;
    const logindata = {"username": username, "password":passw}
    console.log("logindata", logindata)
    fetch('http://localhost:8000/api/login_check',{ method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(logindata)
    })
        .then( resp => resp.json() )
        .then( json => console.log(json))
        .catch(err => console.log(err))
}
function register(){
    var username = document.getElementById('name').value;
    var passw = document.getElementById('passw').value;
    var email = document.getElementById('email').value;
    const logindata = {"username": username, "email":email, "password":passw}
    fetch('http://localhost:8000/api/register',{ method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(logindata)
    })
        .then( resp => resp.json() )
        .then( resp => {
                // let jwt = data.token;
                localStorage.setItem('player_token', JSON.stringify(resp))
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
        .then( resp => {
                // let jwt = data.token;
            console.log(token)
                console.log(resp.data)
        }
    )
}
