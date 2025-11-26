require('dotenv').config();  

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./routes/user.routes');
const productsRoutes = require('./routes/products.routes');  
const authRoutes = require('./routes/auth.routes');

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to User & Products API' });
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);  
app.use('/api/login', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

