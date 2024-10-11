document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list"); // Ensure this exists
  const totalAmountDisplay = document.getElementById("total");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();
  updateTotal();  // Update total when page loads

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    console.log("Name:", name, "Amount:", amount); // Debugging

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };

      expenses.push(newExpense);
      console.log("New Expense:", newExpense); // Debugging

      saveExpensesToLocal();
      renderExpenses();
      updateTotal();

      // Clear inputs
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = ""; // Clear the current list
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)} 
        <button data-id="${expense.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);  // Update total
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);

      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  });
});
