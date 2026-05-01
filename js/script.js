// Elemen DOM
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalBalance = document.getElementById('total-balance');
const ctx = document.getElementById('expenseChart').getContext('2d');
const themeToggle = document.getElementById('theme-toggle');
const addCategoryBtn = document.getElementById('add-category-btn');
const categoryModal = document.getElementById('category-modal');
const closeModal = document.querySelector('.close-modal');
const saveCategoryBtn = document.getElementById('save-category');
const sortBySelect = document.getElementById('sort-by');
const filterCategorySelect = document.getElementById('filter-category');
const globalLimitInput = document.getElementById('global-limit');
const applyLimitBtn = document.getElementById('apply-limit');
const transactionCount = document.getElementById('transaction-count');

// State data dari Local Storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [
    { name: 'Food', color: '#2ecc71' },
    { name: 'Transport', color: '#e67e22' },
    { name: 'Fun', color: '#3498db' }
];
let spendingLimits = JSON.parse(localStorage.getItem('spendingLimits')) || {};
let globalSpendingLimit = parseFloat(localStorage.getItem('globalSpendingLimit')) || 0;
let myChart;

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Initialize categories dropdowns
function initCategories() {
    const categorySelect = document.getElementById('category');
    const filterSelect = document.getElementById('filter-category');
    
    // Clear existing options except "All Categories" in filter
    categorySelect.innerHTML = '';
    filterSelect.innerHTML = '<option value="all">All Categories</option>';
    
    categories.forEach(category => {
        // Add to category select
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        option.style.color = category.color;
        categorySelect.appendChild(option);
        
        // Add to filter select
        const filterOption = document.createElement('option');
        filterOption.value = category.name;
        filterOption.textContent = category.name;
        filterSelect.appendChild(filterOption);
    });
}

// Modal functions
addCategoryBtn.addEventListener('click', () => {
    categoryModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    categoryModal.style.display = 'none';
});

saveCategoryBtn.addEventListener('click', () => {
    const name = document.getElementById('new-category-name').value.trim();
    const color = document.getElementById('new-category-color').value;
    
    if (name && !categories.find(c => c.name === name)) {
        categories.push({ name, color });
        localStorage.setItem('categories', JSON.stringify(categories));
        initCategories();
        categoryModal.style.display = 'none';
        
        // Clear modal inputs
        document.getElementById('new-category-name').value = '';
        document.getElementById('new-category-color').value = '#3498db';
        
        alert(`Category "${name}" added successfully!`);
    } else if (categories.find(c => c.name === name)) {
        alert('Category already exists!');
    } else {
        alert('Please enter a category name!');
    }
});

// Fungsi update total balance
function updateBalance() {
    const total = transactions.reduce((acc, item) => acc + item.amount, 0);
    totalBalance.innerText = `$${total.toFixed(2)}`;
    
    // Update transaction count
    transactionCount.textContent = `${transactions.length} transaction${transactions.length !== 1 ? 's' : ''}`;
}

// Sort transactions
function sortTransactions() {
    const sortBy = sortBySelect.value;
    
    switch(sortBy) {
        case 'date':
            // Already sorted by date added (newest first)
            break;
        case 'amount-asc':
            transactions.sort((a, b) => a.amount - b.amount);
            break;
        case 'amount-desc':
            transactions.sort((a, b) => b.amount - a.amount);
            break;
        case 'category':
            transactions.sort((a, b) => a.category.localeCompare(b.category));
            break;
    }
}

// Filter transactions
function filterTransactions() {
    const filterBy = filterCategorySelect.value;
    if (filterBy === 'all') return transactions;
    return transactions.filter(t => t.category === filterBy);
}

// Check if transaction exceeds limit
function checkLimit(transaction) {
    const categoryLimit = spendingLimits[transaction.category];
    
    // Calculate total spending for this category (including current transaction)
    const categoryTransactions = transactions.filter(t => t.category === transaction.category);
    const categoryTotal = categoryTransactions.reduce((acc, t) => acc + t.amount, 0);
    
    // Check both category limit and global limit
    // For category limit, check if total category spending exceeds limit
    const exceedsCategoryLimit = categoryLimit && categoryTotal > categoryLimit;
    
    // For global limit, check if individual transaction amount exceeds limit
    const exceedsGlobalLimit = globalSpendingLimit && transaction.amount > globalSpendingLimit;
    
    return exceedsCategoryLimit || exceedsGlobalLimit;
}

// Fungsi render list transaksi
function renderTransactions() {
    const tbody = document.getElementById('transaction-list');
    tbody.innerHTML = '';
    
    // Sort and filter
    sortTransactions();
    const filteredTransactions = filterTransactions();
    
    // Calculate category totals for limit checking
    const categoryTotals = {};
    transactions.forEach(t => {
        if (!categoryTotals[t.category]) {
            categoryTotals[t.category] = 0;
        }
        categoryTotals[t.category] += t.amount;
    });
    
    filteredTransactions.forEach((t, index) => {
        const originalIndex = transactions.findIndex(tr => 
            tr.name === t.name && tr.amount === t.amount && tr.category === t.category
        );
        
        const row = document.createElement('tr');
        const categoryLimit = spendingLimits[t.category];
        const categoryTotal = categoryTotals[t.category] || 0;
        
        // Check limits
        const exceedsCategoryLimit = categoryLimit && categoryTotal > categoryLimit;
        const exceedsGlobalLimit = globalSpendingLimit && t.amount > globalSpendingLimit;
        const exceedsLimit = exceedsCategoryLimit || exceedsGlobalLimit;
        
        if (exceedsLimit) {
            row.classList.add('over-limit');
            
            // Add tooltip for limit information
            let limitInfo = '';
            if (exceedsCategoryLimit && exceedsGlobalLimit) {
                limitInfo = `Exceeds category limit ($${categoryLimit}) and global limit ($${globalSpendingLimit})`;
            } else if (exceedsCategoryLimit) {
                limitInfo = `Exceeds category limit: $${categoryLimit}`;
            } else if (exceedsGlobalLimit) {
                limitInfo = `Exceeds global limit: $${globalSpendingLimit}`;
            }
            row.title = limitInfo;
        }
        
        row.innerHTML = `
            <td>${t.name}</td>
            <td>$${t.amount.toFixed(2)}</td>
            <td>
                <span class="category-badge" style="background-color: ${categories.find(c => c.name === t.category)?.color || '#3498db'}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">
                    ${t.category}
                </span>
            </td>
            <td>${new Date().toLocaleDateString('id-ID')}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn delete-btn" onclick="deleteTransaction(${originalIndex})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Fungsi update Chart.js
function updateChart() {
    const categoryTotals = {};
    
    // Calculate totals per category
    transactions.forEach(t => {
        if (!categoryTotals[t.category]) {
            categoryTotals[t.category] = 0;
        }
        categoryTotals[t.category] += t.amount;
    });
    
    const categoryNames = Object.keys(categoryTotals);
    const dataValues = categoryNames.map(name => categoryTotals[name]);
    const backgroundColors = categoryNames.map(name => 
        categories.find(c => c.name === name)?.color || '#3498db'
    );
    
    if (myChart) {
        myChart.destroy();
    }
    
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categoryNames,
            datasets: [{
                data: dataValues,
                backgroundColor: backgroundColors,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        color: 'var(--text-color)',
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Tambah transaksi
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('item-name').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const limit = document.getElementById('spending-limit').value;
    
    if (name && amount && category) {
        const newTransaction = { 
            name, 
            amount, 
            category,
            date: new Date().toISOString()
        };
        
        // Save category limit if provided
        if (limit) {
            spendingLimits[category] = parseFloat(limit);
            localStorage.setItem('spendingLimits', JSON.stringify(spendingLimits));
        }
        
        transactions.push(newTransaction);
        
        saveAndRefresh();
        transactionForm.reset();
        document.getElementById('spending-limit').value = '';
    }
});

// Apply global limit
applyLimitBtn.addEventListener('click', () => {
    const limit = parseFloat(globalLimitInput.value);
    if (limit > 0) {
        globalSpendingLimit = limit;
        localStorage.setItem('globalSpendingLimit', globalSpendingLimit);
        saveAndRefresh();
        alert(`Global spending limit set to $${limit.toFixed(2)}`);
    } else if (limit === 0) {
        globalSpendingLimit = 0;
        localStorage.removeItem('globalSpendingLimit');
        saveAndRefresh();
        alert('Global spending limit removed');
    }
});

// Hapus transaksi
function deleteTransaction(index) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        transactions.splice(index, 1);
        saveAndRefresh();
    }
}

// Simpan ke Local Storage dan Refresh UI
function saveAndRefresh() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateBalance();
    renderTransactions();
    updateChart();
    updateFooterStats();
}

// Event listeners for sorting and filtering
sortBySelect.addEventListener('change', saveAndRefresh);
filterCategorySelect.addEventListener('change', saveAndRefresh);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === categoryModal) {
        categoryModal.style.display = 'none';
    }
});

// Inisialisasi awal
initTheme();
initCategories();
saveAndRefresh();

// Update footer stats
function updateFooterStats() {
    if (document.getElementById('total-transactions')) {
        document.getElementById('total-transactions').textContent = transactions.length;
        document.getElementById('total-categories').textContent = categories.length;
        
        const activeLimits = Object.keys(spendingLimits).length + (globalSpendingLimit > 0 ? 1 : 0);
        document.getElementById('active-limits').textContent = activeLimits;
        
        // Update current date
        const now = new Date();
        if (document.getElementById('current-date')) {
            document.getElementById('current-date').textContent = now.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}

// Set global limit input value
if (globalSpendingLimit > 0) {
    globalLimitInput.value = globalSpendingLimit;
}

// Initialize footer stats
updateFooterStats();