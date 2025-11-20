// middlewares/auth.middleware.js
const authBearer = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ 
            message: 'Token tidak ditemukan' 
        });
    }
    
    // Format: Bearer 12345TOKENRAHASIA
    const token = authHeader.split(' ')[1];
    
    if (token !== '12345TOKENRAHASIA') {
        return res.status(403).json({ 
            message: 'Token tidak valid' 
        });
    }
    
    next();
};

module.exports = { authBearer };