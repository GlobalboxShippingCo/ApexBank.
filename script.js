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

document.addEventListener("DOMContentLoaded", function () {

    // Welcome Message
    let welcome = document.getElementById("welcome");

    if (welcome) {
        welcome.innerText = "Welcome Back, Corrie 👋";
    }

    // Account Number
    let accountElement = document.getElementById("accountNumber");

    if (accountElement) {
        accountElement.innerText =
            localStorage.getItem("accountNumber");
    }

    // Notification
    let notification =
        localStorage.getItem("notification");

    let notificationElement =
        document.getElementById("notification");

    if (notification && notificationElement) {
        notificationElement.textContent = notification;
    }

    // Balance
    let balance =
        Number(localStorage.getItem("balance")) || 24750.50;

    let balanceElement =
        document.getElementById("balance");

    if (balanceElement) {
        balanceElement.innerText =
            "$" + balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
    }

    // Load Transactions
    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    // Change Pending to Successful after 10 minutes
    transactions.forEach(function (transaction) {

        if (
            transaction.status === "Pending" &&
            Date.now() - transaction.createdAt >= 10 * 60 * 1000
        ) {
            transaction.status = "Successful";
        }

    });

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    // Display Transactions
    let transactionBody =
        document.getElementById("transactionBody");

    if (transactionBody) {

        transactionBody.innerHTML = "";

        transactions.forEach(function (transaction) {

            let color =
                transaction.status === "Pending"
                    ? "orange"
                    : "green";

            let icon =
                transaction.status === "Pending"
                    ? "🟡"
                    : "🟢";

            transactionBody.innerHTML += `
                <tr>
                    <td>${transaction.reference}</td>
                    <td>${transaction.date}</td>
                    <td>${transaction.recipient}</td>
                    <td>${transaction.amount}</td>
                    <td style="color:${color};font-weight:bold;">
                        ${icon} ${transaction.status}
                    </td>
                </tr>
            `;

        });

    }

});



// =============================
// Transfer
// =============================

function transfer() {

    let recipient = document.getElementById("recipient").value;
    let account = document.getElementById("account").value;
    let bank = document.getElementById("bank").value;
    let amount = Number(document.getElementById("amount").value);
    let narration = document.getElementById("description").value;

    if (!recipient || !account || !bank || !amount || amount <= 0) {
        alert("Please complete all fields.");
        return;
    }

    let balance = Number(localStorage.getItem("balance")) || 0;

    if (amount > balance) {
        alert("Insufficient Balance");
        return;
    }

    balance -= amount;
    localStorage.setItem("balance", balance);

    let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

let reference = "TRX" + Date.now();

transactions.unshift({
    reference: reference,
    date: new Date().toLocaleString(),
    recipient: recipient,
    bank: bank,
    amount: "-$" + amount.toFixed(2),
    status: "Pending",
    createdAt: Date.now()
});

localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
);

    let message = "You transferred $" + amount.toFixed(2) + " to " + recipient + " (" + bank + ")";
    localStorage.setItem("notification", message);

    alert("Transfer Successful!");
    window.location.href = "dashboard.html";
}

function toggleMenu(){

    let sidebar =
        document.getElementById("sidebar");

    sidebar.classList.toggle("show");

}