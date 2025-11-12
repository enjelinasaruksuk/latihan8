const User = require('../models/user.model');

// GET all users
exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET user by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json(results[0]);
    });
};

// POST user baru
exports.createUser = (req, res) => {
    console.log('Request body:', req.body); // TAMBAHKAN INI UNTUK DEBUG
    
    const data = req.body;
    
    // Validasi
    if (!data || !data.name || !data.email) {
        return res.status(400).json({ 
            error: 'Name dan email harus diisi',
            received: req.body 
        });
    }
    
    User.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...data });
    });
};

// PUT update user
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    User.update(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json({ message: 'User berhasil diupdate' });
    });
};

// DELETE user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
        res.json({ message: 'User berhasil dihapus' });
    });
};