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

  // Make an API call to create a new expense
  axios.post('https://crudcrud.com/api/5d5e9ee469384a84a021359636b0af75/expenses', expense)
    .then(response => {
      expenses.push(response.data); // Store the newly created expense in the expenses array
      displayExpenses();
      clearFields();
    })
    .catch(error => {
      console.log(error);
    });
}

function displayExpenses() {
  // Clear the expenses list
  const expensesDiv = document.getElementById('expenses');
  expensesDiv.innerHTML = '';

  // Retrieve the expenses from the backend
  axios.get('https://crudcrud.com/api/5d5e9ee469384a84a021359636b0af75/expenses')
    .then(response => {
      expenses = response.data; // Update the expenses array with the retrieved data

      // Render the expenses in the expensesDiv
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
          editExpense(i);
        };

        expenseItem.appendChild(amountInput);
        expenseItem.appendChild(descriptionSpan);
        expenseItem.appendChild(categorySpan);
        expenseItem.appendChild(deleteBtn);
        expenseItem.appendChild(editBtn);

        expensesDiv.appendChild(expenseItem);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function deleteExpense(index) {
  const expense = expenses[index];

  // Make an API call to delete the expense
  axios.delete(`https://crudcrud.com/api/5d5e9ee469384a84a021359636b0af75/expenses/${expense._id}`)
    .then(response => {
      expenses.splice(index, 1); // Remove the expense from the expenses array
      displayExpenses();
    })
    .catch(error => {
      console.log(error);
    });
}

//function editExpense(index) {
//  const expense = expenses[index];
//  expense.amount = parseFloat(amount);
//
//  // Make an API call to update the expense
//  axios.put(`https://crudcrud.com/api/5d5e9ee469384a84a021359636b0af75/expenses/${expense._id}`, expense)
//    .then(response => {
//      displayExpenses();
//    })
//    .catch(error => {
//      console.log(error);
//    });
//
//  const amountInput = document.getElementById('expense-amount');
//  const descriptionInput = document.getElementById('expense-description');
//  const categoryInput = document.getElementById('expense-category');
//
//  amountInput.value = expense.amount;
//  descriptionInput.value = expense.description;
//  categoryInput.value = expense.category;
//
//  deleteExpense(index);
//}
function editExpense(index) {
  const expense = expenses[index];

  const amountInput = document.getElementById('expense-amount');
  const descriptionInput = document.getElementById('expense-description');
  const categoryInput = document.getElementById('expense-category');

  const updatedAmount = parseFloat(amountInput.value);
  const updatedDescription = descriptionInput.value;
  const updatedCategory = categoryInput.value;

  if (!updatedAmount || !updatedDescription || !updatedCategory) {
    alert('Please fill in all the fields.');
    return;
  }

  expense.amount = updatedAmount;
  expense.description = updatedDescription;
  expense.category = updatedCategory;

  // Make an API call to update the expense
  axios.put(`https://crudcrud.com/api/5d5e9ee469384a84a021359636b0af75/expenses/${expense._id}`, expense)
    .then(response => {
      displayExpenses();
    })
    .catch(error => {
      console.log(error);
    });

  clearFields();
}
function clearFields() {
  const amountInput = document.getElementById('expense-amount');
  const descriptionInput = document.getElementById('expense-description');
  const categoryInput = document.getElementById('expense-category');

  amountInput.value = '';
  descriptionInput.value = '';
  categoryInput.value = '';
}

// Initial rendering of expenses
displayExpenses();
