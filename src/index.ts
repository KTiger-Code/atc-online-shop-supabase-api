import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { setupRoutes } from './routes';
import { supabaseUrl, supabaseKey } from './config/supabase';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.json());

// Setup routes
setupRoutes(app, supabase);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});