function logoutOnPageUnload() {
    // Add an event listener for the beforeunload event
    window.addEventListener('beforeunload', function (event) {
        sessionStorage.removeItem("uid") 
        window.location.href = "./login.html"
    })
}

let logoutBtn = document.getElementById('logout')
logoutBtn.addEventListener('click', logOutUser)

function logOutUser() {
    
    firebase.auth().signOut().then(() =>{
        sessionStorage.removeItem("uid")
        // alert('logging out') 
        window.location.href = "./login.html"

    })
}