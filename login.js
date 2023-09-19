
const myForm = document.querySelector("#myForm");
const myInput = document.getElementById("myInput");
const errorMessage = document.getElementById("error-message")
const email = document.getElementById("email")
const password = document.getElementById("password")

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
});
async function login (){
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;  
        
        const data = {
            email: email,
            password: password
    }
    console.log(email);
    console.log(password);
    
const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
 });

if(!response.ok) {
    errorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe";
    errorMessage.style.display = "block";
}
if(response.ok) {
    const data = await response.json();
    saveToken(data.token);
    window.location.replace("index.html");
    checkLoginStatus();
} else {
    isLoggingOut = false;
}
} catch (error) {
    console.error(error);
}

function saveToken(token) {
    localStorage.setItem("token", token);
}
}

