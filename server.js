const express = require('express');
const app = express();
const PORT = 8001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./routes/user.routes');
const productsRoutes = require('./routes/products.routes');  

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to User & Products API' });
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);  

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

