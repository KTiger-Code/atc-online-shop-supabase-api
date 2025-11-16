const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// GET /api/items - ดึงข้อมูลทั้งหมด
app.get('/api/items', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('GET error:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/items - สร้างรายการใหม่
app.post('/api/items', async (req, res) => {
    try {
        const { title, detail } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'Title is required' });
        }

        const { data, error } = await supabase
            .from('items')
            .insert([{ title: title.trim(), detail: detail?.trim() || '' }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('POST error:', error);
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/items/:id - แก้ไขรายการ
app.put('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, detail } = req.body;

        const updateData = {};
        if (title !== undefined) updateData.title = title.trim();
        if (detail !== undefined) updateData.detail = detail.trim();
        updateData.updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('items')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(data);
    } catch (error) {
        console.error('PUT error:', error);
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/items/:id - ลบรายการ
app.delete('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('items')
            .delete()
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully', data });
    } catch (error) {
        console.error('DELETE error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`🔗 Supabase connected to: ${process.env.SUPABASE_URL}`);
});
