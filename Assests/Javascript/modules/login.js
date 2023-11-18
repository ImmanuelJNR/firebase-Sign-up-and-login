const form = document.getElementById('login-form')
form.addEventListener('submit', login)

function login(event) {
    event.preventDefault()

    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    const message = document.getElementById('login-message-box')
    const btnlogin = document.getElementById('login-btn');


    // validation
    if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))){
        message.innerText = 'invalid email'
        message.classList.add('error-message')
        document.getElementById('login-email').value = ''
        document.getElementById('login-password').value = ''
        // alert("error")
    }else if(!password){
        message.innerText = 'Input password';
        message.classList.add('error-message');
        document.getElementById('login-email').value = ''
        document.getElementById('login-password').value = ''

    }else{
        // change btn text to "processing..."
        btnlogin.innerText = 'Processing...';

        document.getElementById('login-email').value = ''
        document.getElementById('login-password').value = ''

        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredentials) => {
            sessionStorage.setItem("uid", userCredentials.user.uid)

            message.innerText = 'Sign In successful';
            message.classList.remove('error-message');
            message.classList.add('success-message');

            // let btnlogin = document.getElementById('login-btn');
            // btnlogin.innerText = 'processing...';
    
            
            // Redirect to the next page after a delay (e.g., 2 seconds)
            setTimeout(function() {
                window.location.href = './welcome.html';
            }, 2000);

        }).catch((error) => {
            console.log("error")
            message.innerText = 'Email or password does not match'
            message.classList.add('error-message')

            btnlogin.innerText = 'Sign In';
            // message.innerText = 'Incorrect password'
            // message.classList.add('error-message')

            
        })
    }
}



