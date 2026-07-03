// =============================
// Register
// =============================

function register() {

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(fullname === "" || email === "" || password === ""){
        alert("Please fill in all fields.");
        return;
    }

    let accountNumber =
        Math.floor(1000000000 + Math.random() * 9000000000);

    localStorage.setItem("fullname", fullname);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("accountNumber", accountNumber);

    // Default balance
    localStorage.setItem("balance", 24750.50);

    alert("Account created successfully!");

    window.location.href = "login.html";
}



// =============================
// Login
// =============================

function login(){

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;

    let savedEmail =
        localStorage.getItem("email");

    let savedPassword =
        localStorage.getItem("password");

    if(email === savedEmail && password === savedPassword){

        alert("Login Successful!");

        window.location.href="dashboard.html";

    }else{

        alert("Invalid Email or Password");

    }

}



// =============================
// Logout
// =============================

function logout(){

    window.location.href="login.html";

}



// =============================
// Dashboard
// =============================

document.addEventListener("DOMContentLoaded", function(){

    let welcome =
        document.getElementById("welcome");

    if(welcome){

        welcome.innerText =
            "Welcome Back, Corrie 👋";

    }

    let accountElement =
        document.getElementById("accountNumber");

    if(accountElement){

        accountElement.innerText =
            localStorage.getItem("accountNumber");

            let notification =
    localStorage.getItem("notification");

let notificationElement =
    document.getElementById("notification");

if (notification && notificationElement) {
    notificationElement.textContent = notification;
}

    }

    let balance =
        Number(localStorage.getItem("balance")) || 24750.50;

    let balanceElement =
        document.getElementById("balance");

    if(balanceElement){

        balanceElement.innerText =
            "$" + balance.toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2
            });

    }

});



// =============================
// Transfer
// =============================

function transfer(){

    let recipient =
        document.getElementById("recipient").value;

    let account =
        document.getElementById("account").value;

    let bank =
        document.getElementById("bank").value;

    let amount =
        Number(document.getElementById("amount").value);

    let narration =
        document.getElementById("description").value;

    if(
        recipient==="" ||
        account==="" ||
        bank==="" ||
        narration==="" ||
        amount<=0
    ){

        alert("Please complete all fields.");

        return;

    }

    let balance =
        Number(localStorage.getItem("balance"));

    if(amount>balance){

        alert("Insufficient Balance");

        return;

    }

    balance -= amount;

    localStorage.setItem("balance",balance);

    let message =
    "You transferred $" +
    amount.toFixed(2) +
    " to " +
    recipient +
    " (" + bank + ").";

localStorage.setItem("notification", message);

alert("Transfer Successful!");

window.location.href = "dashboard.html";
}