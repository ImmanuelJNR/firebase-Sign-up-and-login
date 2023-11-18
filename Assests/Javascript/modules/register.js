const form = document.getElementById('myform')
form.addEventListener('submit', submitToDB)

function submitToDB(event) {
    event.preventDefault()

    // alert('wow') 

    // variables
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const message = document.getElementById('signup-message-box')
    const btnRegister = document.getElementById('register');

    // Clear input fields
    email.value = '';
    password.value = '';

    // Change button text to "Processing..."
    btnRegister.innerText = 'Processing...';

    // validation
    if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))){
        message.innerText = 'invalid email'
        message.classList.add('error-message')
        // alert("error")

        btnRegister.innerText = 'Sign Up';
        return; // Exit the function early if validation fails;
    }

    if (password.length < 6){
        message.innerText = 'password length must be greater than six'
        message.classList.add('error-message')
        // alert("error")

        // Reset button text
        btnRegister.innerText = 'Sign Up';
        return; // Exit the function early if validation fails
    }

    // check if user exist

    firebase.firestore().collection("users").where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().email === email){
                message.innerText = 'User already exist'
                message.classList.add('error-message')

                // Reset button text
                btnRegister.innerText = 'Sign Up';
                return; // Exit the function early if validation fails
            }
        })
    }).catch(error => {
        console.log(error)
    })

    // store user in data base
    {
        const today = new Date()
        
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
            firebase.firestore().collection("users").doc().set({
                email: email,
                password : password,
                date: today.getFullYear() + " " + (today.getMonth() +1) + " " + today.getDate()
            }).then(function () {
                message.innerText = 'sign up successful'
                message.classList.add('success-message')

                 // Redirect to the login page after successful signup
                window.location.href = './Pages/login.html';

                
            })
        }).catch(error => {
            //  alert("omor! error dey oo")
                    // Reset button text
            btnRegister.innerText = 'Sign Up';
        })
    }

    
}



