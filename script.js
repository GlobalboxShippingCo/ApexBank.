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

        let elapsed = Date.now() - transaction.createdAt;

if (transaction.status === "Pending" && elapsed >= 10 * 60 * 1000) {
    transaction.status = "Successful";
}

if (transaction.status === "Successful" && elapsed >= 11 * 60 * 1000) {
    transaction.status = "Approved";
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

            let color = "green";
let icon = "🟢";

if (transaction.status === "Pending") {
    color = "orange";
    icon = "🟡";
} else if (transaction.status === "Successful") {
    color = "green";
    icon = "🟢";
} else if (transaction.status === "Approved") {
    color = "blue";
    icon = "✅";
}

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

    loadBeneficiaries();
    loadBeneficiaryDropdown();
    loadStatement();

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

// =============================
// Beneficiaries
// =============================

function saveBeneficiary() {

    let name =
        document.getElementById("beneficiaryName").value;

    let bank =
        document.getElementById("beneficiaryBank").value;

    let account =
        document.getElementById("beneficiaryAccount").value;

    if (name === "" || bank === "" || account === "") {
        alert("Please complete all fields.");
        return;
    }

    let beneficiaries =
        JSON.parse(localStorage.getItem("beneficiaries")) || [];

        console.log(beneficiaries);

    beneficiaries.push({
        name: name,
        bank: bank,
        account: account
    });

    localStorage.setItem(
        "beneficiaries",
        JSON.stringify(beneficiaries)
    );

    alert("Beneficiary saved successfully!");

    document.getElementById("beneficiaryName").value = "";
    document.getElementById("beneficiaryBank").value = "";
    document.getElementById("beneficiaryAccount").value = "";

    loadBeneficiaries();
}

function loadBeneficiaries() {

    let beneficiaryBody =
        document.getElementById("beneficiaryBody");

    if (!beneficiaryBody) return;

    beneficiaryBody.innerHTML = "";

    let beneficiaries =
        JSON.parse(localStorage.getItem("beneficiaries")) || [];

    beneficiaries.forEach(function(beneficiary, index){

        beneficiaryBody.innerHTML += `
            <tr>
                <td>${beneficiary.name}</td>
                <td>${beneficiary.bank}</td>
                <td>${beneficiary.account}</td>
                <td>
                    <button onclick="deleteBeneficiary(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

function deleteBeneficiary(index){

    let beneficiaries =
        JSON.parse(localStorage.getItem("beneficiaries")) || [];

    beneficiaries.splice(index,1);

    localStorage.setItem(
        "beneficiaries",
        JSON.stringify(beneficiaries)
    );

    loadBeneficiaries();

}

function loadBeneficiaryDropdown() {

    let select =
        document.getElementById("beneficiarySelect");

    if (!select) return;

    select.innerHTML =
        '<option value="">-- Select Beneficiary --</option>';

    let beneficiaries =
        JSON.parse(localStorage.getItem("beneficiaries")) || [];

    beneficiaries.forEach(function(beneficiary){

        select.innerHTML += `
            <option value="${beneficiary.account}">
                ${beneficiary.name} - ${beneficiary.bank}
            </option>
        `;

    });

}

function selectBeneficiary(){

    let account =
        document.getElementById("beneficiarySelect").value;

    let beneficiaries =
        JSON.parse(localStorage.getItem("beneficiaries")) || [];

    let beneficiary =
        beneficiaries.find(function(item){

            return item.account === account;

        });

    if(!beneficiary) return;

    document.getElementById("recipient").value =
        beneficiary.name;

    document.getElementById("bank").value =
        beneficiary.bank;

    document.getElementById("account").value =
        beneficiary.account;

}

// =============================
// Statement
// =============================

function loadStatement() {

    let statementBody =
        document.getElementById("statementBody");

    if (!statementBody) return;

    // Customer Name
let customer =
    document.getElementById("customerName");

if (customer) {
    customer.textContent =
        localStorage.getItem("fullname") || "Customer";
}

// Account Number
let account =
    document.getElementById("statementAccount");

if (account) {
    account.textContent =
        localStorage.getItem("accountNumber") || "N/A";
}

// Current Balance
let balance =
    Number(localStorage.getItem("balance")) || 0;

let balanceElement =
    document.getElementById("statementBalance");

if (balanceElement) {
    balanceElement.textContent =
        "$" + balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
}

    // Transactions
    let transactions =
        JSON.parse(localStorage.getItem("transactions")) || [];

    statementBody.innerHTML = "";

    transactions.forEach(function(transaction){

        let color =
            transaction.status === "Pending"
                ? "orange"
                : "green";

        statementBody.innerHTML += `
            <tr>
                <td>${transaction.reference}</td>
                <td>${transaction.date}</td>
                <td>${transaction.recipient}</td>
                <td>${transaction.amount}</td>
                <td style="color:${color};font-weight:bold;">
                    ${transaction.status}
                </td>
            </tr>
        `;

    });

}