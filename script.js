let balance = 0;

function updateBalance() {
    document.getElementById("balance").innerText =
        "$" + balance.toFixed(2);
}

function deposit() {

    let amount =
        Number(document.getElementById("amount").value);

    balance += amount;

    updateBalance();

    addHistory(
        "Deposited $" + amount
    );
}

function withdraw() {

    let amount =
        Number(document.getElementById("amount").value);

    if (amount > balance) {
        alert("Insufficient funds");
        return;
    }

    balance -= amount;

    updateBalance();

    addHistory(
        "Withdrew $" + amount
    );
}

function addHistory(text) {

    let li = document.createElement("li");

    li.textContent = text;

    document
        .getElementById("history")
        .appendChild(li);
}

function register() {

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let accountNumber =
        Math.floor(1000000000 + Math.random() * 9000000000);

    localStorage.setItem("fullname", fullname);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("accountNumber", accountNumber);

    alert("Account created successfully!");

    window.location.href = "login.html";
}

function login() {

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;

    let savedEmail =
        localStorage.getItem("email");

    let savedPassword =
        localStorage.getItem("password");

    if (
        email === savedEmail &&
        password === savedPassword
    ) {

        alert("Login Successful");

        window.location.href =
            "dashboard.html";

    } else {

        alert("Invalid Email or Password");

    }
}

window.onload = function() {

    let fullname =
        localStorage.getItem("fullname");

    let welcome =
        document.getElementById("welcome");

    if (welcome) {
        welcome.innerText =
            "Hello, " + fullname;
    }
}

function login() {
    window.location.href = "dashboard.html";
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if(email === "" || password === "") {
        alert("Please enter your email and password");
        return;
    }

    window.location.href = "dashboard.html";
}

function logout() {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {

    let account =
        localStorage.getItem("accountNumber");

    let accountElement =
        document.getElementById("accountNumber");

    if (accountElement) {
        accountElement.textContent = account;
    }

});