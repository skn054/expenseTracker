const transText = document.querySelector("#trans__text");
const transAmount = document.querySelector("#trans__amount");
const submitBtn = document.querySelector("#submit");
const expenseTotalAmount = document.querySelector(".expense__total-amount");
const deposit = document.querySelector(".deposit");
const withdraw = document.querySelector(".withdraw");
const expenses = document.querySelector(".expenses");

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let localTransaction = localStorage.getItem('transactions') === null ? [] : localStorageTransactions;
// console.log(localTransaction);

// let localTransaction = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

function addTranstoList(tText, tAmount, tId) {
  let element = document.createElement("li");
  element.classList.add(tAmount > 0 ? "positive" : "negative");
  element.innerHTML = `<button class="delete-btn" onclick="deleteTransaction(event,${tId})">x</button><span>${tText}</span>${tAmount}`;
  expenses.appendChild(element);
}

function getRandomID() {
  return Math.floor(Math.random() * 100000000);
}

function deleteTransaction(e, tId) {
  localTransaction = localTransaction.filter(
    (transaction) => transaction.id !== tId
  );
  updateLocalStorage()
  init();
}

function newTransaction() {
  const tText = transText.value.trim();
  const tAmount = Number(transAmount.value);
  if (tText && tAmount) {
    const transaction = {
      id: getRandomID(),
      text: tText,
      amount: tAmount,
    };
    localTransaction.push(transaction);
    updateLocalStorage();
    init();
  } else {
    alert("Enter valid text and amount");
  }
}

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(localTransaction));
}

function clearTranscation() {
  expenses.innerHTML = "";
  deposit.innerText = "";
  withdraw.innerText = "";
  expenseTotalAmount.innerText = "";
  transText.value = "";
  transAmount.value = "";
}

function displayTransactions() {
  // display list of transactions
  localTransaction.forEach((transaction) => {
    addTranstoList(transaction.text, transaction.amount, transaction.id);
  });

  // display balance
  const total = localTransaction
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
  expenseTotalAmount.innerText = `$${total}`;

  // display income

  const pAmount = localTransaction
    .filter((transaction) => {
      return transaction.amount > 0;
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);

  deposit.innerText = `$${pAmount}`;

  // display expense

  const nAmount = localTransaction
    .filter((transaction) => {
      return transaction.amount < 0;
    })
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);

  withdraw.innerText = `$${nAmount}`;
}

function init() {
  console.log(localTransaction);
  clearTranscation();
  displayTransactions();
}

init();
submitBtn.addEventListener("click", newTransaction);
