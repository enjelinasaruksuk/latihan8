const Product = require('../models/products.model');

// GET all products
exports.getAllProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET product by ID
exports.getProductById = (req, res) => {
    const { id } = req.params;
    Product.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
        res.json(results[0]);
    });
};

// POST create product
exports.createProduct = (req, res) => {
    const data = req.body;
    
    // Validasi
    if (!data || !data.nama || !data.harga) {
        return res.status(400).json({ 
            error: 'Nama dan harga harus diisi'
        });
    }
    
    Product.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...data });
    });
};

// PUT update product
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    Product.update(id, data, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
        res.json({ message: 'Produk berhasil diupdate' });
    });
};

// DELETE product
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    Product.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Produk tidak ditemukan' });
        res.json({ message: 'Produk berhasil dihapus' });
    });
};