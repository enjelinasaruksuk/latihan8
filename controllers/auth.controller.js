const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login user dan generate JWT token
exports.login = (req, res) => {
    const { email, password } = req.body;
    
    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email dan password harus diisi' 
        });
    }
    
    // Cari user berdasarkan email
    User.findByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'Email tidak ditemukan' 
            });
        }
        
        const user = results[0];
        const isPasswordValid = password === user.password;
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: 'Password salah' 
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                name: user.name 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        
        // Return token
        res.json({
            message: 'Login berhasil',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
};

// Register user baru (opsional)
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validasi input
    if (!name || !email || !password) {
        return res.status(400).json({ 
            message: 'Nama, email, dan password harus diisi' 
        });
    }
    
    // Cek apakah email sudah terdaftar
    User.findByEmail(email, async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ 
                message: 'Email sudah terdaftar' 
            });
        }
        
        // Create user
        const newUser = {
            name: name,
            email: email,
            password: password  // Atau gunakan hashedPassword jika di-hash
        };
        
        User.create(newUser, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            res.status(201).json({
                message: 'Registrasi berhasil',
                user: {
                    id: result.insertId,
                    name: name,
                    email: email
                }
            });
        });
    });
};