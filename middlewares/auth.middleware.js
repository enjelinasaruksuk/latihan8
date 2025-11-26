const jwt = require('jsonwebtoken');

const authBearer = (req, res, next) => {
    // Ambil header Authorization
    const authHeader = req.headers['authorization'];
    
    // Cek apakah header Authorization ada
    if (!authHeader) {
        return res.status(401).json({ 
            message: 'Token tidak ditemukan. Silakan login terlebih dahulu.' 
        });
    }
    
    // Format: "Bearer TOKEN"
    // Split untuk ambil token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            message: 'Format token tidak valid' 
        });
    }
    
    // Verify JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ 
                message: 'Token tidak valid atau sudah kadaluarsa' 
            });
        }
        
        // Simpan data user dari token ke request
        req.user = decoded;
        
        // Lanjutkan ke controller
        next();
    });
};

module.exports = { authBearer };