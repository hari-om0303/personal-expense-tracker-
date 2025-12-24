// ===== SELECT ELEMENTS =====
const title = document.getElementById('title');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const date = document.getElementById('date');
const note = document.getElementById('note');
const addexpensebtn = document.getElementById('add-expense-btn');

const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalamount = document.getElementById('total-amount');

// ===== STATE =====
let expences = [];
let editingId = null; // IMPORTANT: edit state

// ===== FORM SUBMIT (ADD / UPDATE) =====
form.addEventListener('submit', function (e) {
    e.preventDefault();

    //  geting values from input fields
    const expencetitle = title.value.trim();
    const expenceamount = amount.value.trim();
    const expencecategory = category.value;
    const expencedate = date.value;
    const expencenote = note.value;

    if (!expencetitle || !expenceamount || !expencedate) {
        alert("Please fill all required fields");
        return;
    }

    if (editingId === null) {
        // ===== ADD MODE =====
        const newExpence = {
            id: Date.now(),
            title: expencetitle,
            amount: parseFloat(expenceamount),
            category: expencecategory,
            date: expencedate,
            note: expencenote,
        };

        expences.push(newExpence);
    } else {
        // ===== EDIT MODE =====
        expences.forEach(exp => {
            if (exp.id === editingId) {
                exp.title = expencetitle;
                exp.amount = parseFloat(expenceamount);
                exp.category = expencecategory;
                exp.date = expencedate;
                exp.note = expencenote;
            }
        });

        editingId = null;
        addexpensebtn.textContent = "Add Expense";
    }

    renderExpences();
    updatetotal();
    form.reset();
});

// ===== RENDER EXPENSES =====
function renderExpences() {
    if (expences.length === 0) {
        expenseList.innerHTML = `
            <p class="empty-text">
                No expenses yet. Add your first expense above
            </p>
        `;
        return;
    }

    let html = "";

    expences.forEach(exp => {
        html += `
        <div class="expense-item">
            <div class="expense-main">
                <div class="expense-date">Date: ${exp.date}</div>
                <div class="expense-title">Title: ${exp.title}</div>
                <div class="expense-category">Category: ${exp.category}</div>
            </div>

            <div class="expense-note">Note: ${exp.note || ""}</div>
            <div class="expense-amount">Amount: ₹${exp.amount}</div>

            <div class="btn">
                <button class="boton1" data-id="${exp.id}">Edit</button>
                <button class="boton2" data-id="${exp.id}">Delete</button>
            </div>
        </div>
        `;
    });

    expenseList.innerHTML = html;
}

// ===== UPDATE TOTAL =====
function updatetotal() {
    const total = expences.reduce((sum, exp) => sum + exp.amount, 0);
    totalamount.textContent = `₹${total}`;
}


// ===== DELETE & EDIT (EVENT DELEGATION) =====
expenseList.addEventListener('click', function (e) {

    // ----- DELETE -----
    const deleteBtn = e.target.closest('.boton2');
    if (deleteBtn) {
        const idToDelete = Number(deleteBtn.dataset.id);
        expences = expences.filter(exp => exp.id !== idToDelete);

        renderExpences();
        updatetotal();
        return;
    }

    // ----- EDIT -----
    const editBtn = e.target.closest('.boton1');
    if (editBtn) {
        editingId = Number(editBtn.dataset.id);

        const exp = expences.find(exp => exp.id === editingId);
        if (!exp) return;

        title.value = exp.title;
        amount.value = exp.amount;
        category.value = exp.category;
        date.value = exp.date;
        note.value = exp.note;

        addexpensebtn.textContent = "Update Expense";
    }
});


renderExpences();
updatetotal();
