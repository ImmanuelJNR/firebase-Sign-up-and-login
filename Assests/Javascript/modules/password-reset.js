let forgotPassword = document.getElementById("forgotPassword")

forgotPassword.addEventListener('click', passwordreset)

function passwordreset(){
    const email = document.getElementById('login-email').value

    firebase.auth().sendPasswordResetEmail(email).then(() => {
        alert("password reset link has been sent to your eamil")
    }).catch((error) => {
        console.log("error")
        // message.innerText = 'invalid email'
        // message.classList.add('error-message')
    })
}