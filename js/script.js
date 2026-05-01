// Elemen DOM
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalBalance = document.getElementById('total-balance');
const ctx = document.getElementById('expenseChart').getContext('2d');

// State data dari Local Storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let myChart;

// Fungsi update total balance
function updateBalance() {
    const total = transactions.reduce((acc, item) => acc + item.amount, 0);
    totalBalance.innerText = `$${total.toFixed(2)}`;
}

// Fungsi render list transaksi
function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((t, index) => {
        const li = document.createElement('li');
        li.className = 'transaction-item';
        li.innerHTML = `
            <div class="item-info">
                <p>${t.name}</p>
                <span>$${t.amount.toFixed(2)} | ${t.category}</span>
            </div>
            <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionList.appendChild(li);
    });
}

// Fungsi update Chart.js
function updateChart() {
    const categories = ['Food', 'Transport', 'Fun'];
    const dataValues = categories.map(cat => {
        return transactions
            .filter(t => t.category === cat)
            .reduce((acc, t) => acc + t.amount, 0);
    });

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: dataValues,
                backgroundColor: ['#2ecc71', '#e67e22', '#3498db']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Tambah transaksi
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('item-name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (name && amount && category) {
        const newTransaction = { name, amount, category };
        transactions.push(newTransaction);
        
        saveAndRefresh();
        transactionForm.reset();
    }
});

// Hapus transaksi
function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveAndRefresh();
}

// Simpan ke Local Storage dan Refresh UI
function saveAndRefresh() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateBalance();
    renderTransactions();
    updateChart();
}

// Inisialisasi awal
saveAndRefresh();
