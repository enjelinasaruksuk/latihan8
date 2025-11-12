const express = require('express');
const app = express();
const PORT = 8001;

// Middleware built-in Express (TIDAK perlu install apapun)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./routes/user.routes');

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to User API' });
});

// Use routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:8001`);
});