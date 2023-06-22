let expenses = [];

function addExpense() {
  const amountInput = document.getElementById('expense-amount');
  const descriptionInput = document.getElementById('expense-description');
  const categoryInput = document.getElementById('expense-category');

  const amount = parseFloat(amountInput.value);
  const description = descriptionInput.value;
  const category = categoryInput.value;

  if (!amount || !description || !category) {
    alert('Please fill in all the fields.');
    return;
  }

  const expense = {
    amount,
    description,
    category
  };

  expenses.push(expense);
  displayExpenses();
  clearFields();
}

function displayExpenses() {
  const expensesDiv = document.getElementById('expenses');
  expensesDiv.innerHTML = '';

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');

    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.value = expense.amount;

    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = 'Description: ' + expense.description;

    const categorySpan = document.createElement('span');
    categorySpan.textContent = 'Category: ' + expense.category;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete Expense';
    deleteBtn.onclick = function () {
      deleteExpense(i);
    };

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit Expense';
    editBtn.onclick = function () {
      updateExpense(i, amountInput.value);
    };

    expenseItem.appendChild(amountInput);
    expenseItem.appendChild(descriptionSpan);
    expenseItem.appendChild(categorySpan);
    expenseItem.appendChild(deleteBtn);
    expenseItem.appendChild(editBtn);

    expensesDiv.appendChild(expenseItem);
  }
}

function updateExpense(index, amount) {
  const expense = expenses[index];
  expense.amount = parseFloat(amount);
  displayExpenses();
}


function deleteExpense(index) {
  expenses.splice(index, 1);
  displayExpenses();
}

function editExpense(index) {
  const expense = expenses[index];

  const amountInput = document.getElementById('expense-amount');
  const descriptionInput = document.getElementById('expense-description');
  const categoryInput = document.getElementById('expense-category');

  amountInput.value = expense.amount;
  descriptionInput.value = expense.description;
  categoryInput.value = expense.category;

  deleteExpense(index);
}

function clearFields() {
  const amountInput = document.getElementById('expense-amount');
  const descriptionInput = document.getElementById('expense-description');
  const categoryInput = document.getElementById('expense-category');

  amountInput.value = '';
  descriptionInput.value = '';
  categoryInput.value = '';
}
