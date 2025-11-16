const API = '/api/items';

// Utility function to escape HTML
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Update stats
function updateStats(items) {
    document.getElementById('totalItems').textContent = items.length;
}

// Load all items
async function loadItems() {
    try {
        const list = document.getElementById('list');
        list.innerHTML = '<div class="loading">⏳ Loading...</div>';
        
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const items = await res.json();
        
        updateStats(items);
        
        if (items.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <div>No items yet. Add your first item!</div>
                </div>
            `;
            return;
        }
        
        list.innerHTML = items.map(item => `
            <li class="item" data-id="${item.id}">
                <div class="item-content">
                    <div class="item-title">${escapeHtml(item.title)}</div>
                    <div class="item-detail">${escapeHtml(item.detail)}</div>
                    <div class="item-meta">Created: ${formatDate(item.created_at)}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" data-id="${item.id}">✏️ Edit</button>
                    <button class="btn-delete" data-id="${item.id}">🗑️ Delete</button>
                </div>
            </li>
        `).join('');
        
        // Add event listeners
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => editItem(btn.dataset.id));
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteItem(btn.dataset.id));
        });
        
    } catch (error) {
        console.error('Load error:', error);
        document.getElementById('list').innerHTML = 
            '<div class="empty-state" style="color: #dc3545;">❌ Failed to load items</div>';
    }
}

// Add new item
async function addItem() {
    try {
        const title = document.getElementById('title').value.trim();
        const detail = document.getElementById('detail').value.trim();
        
        if (!title) {
            alert('⚠️ Please enter a title');
            return;
        }
        
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, detail })
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to add item');
        }
        
        // Clear inputs
        document.getElementById('title').value = '';
        document.getElementById('detail').value = '';
        
        // Reload list
        await loadItems();
        
    } catch (error) {
        console.error('Add error:', error);
        alert('❌ ' + error.message);
    }
}

// Edit item
async function editItem(id) {
    try {
        const newTitle = prompt('Enter new title:');
        if (newTitle === null) return; // Cancelled
        
        if (!newTitle.trim()) {
            alert('⚠️ Title cannot be empty');
            return;
        }
        
        const res = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle.trim() })
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to update item');
        }
        
        await loadItems();
        
    } catch (error) {
        console.error('Edit error:', error);
        alert('❌ ' + error.message);
    }
}

// Delete item
async function deleteItem(id) {
    try {
        if (!confirm('🗑️ Are you sure you want to delete this item?')) return;
        
        const res = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        });
        
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || 'Failed to delete item');
        }
        
        await loadItems();
        
    } catch (error) {
        console.error('Delete error:', error);
        alert('❌ ' + error.message);
    }
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', addItem);

// Allow Enter key to add item
document.getElementById('title').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

document.getElementById('detail').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

// Initial load
loadItems();
