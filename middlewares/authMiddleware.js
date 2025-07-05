const jwt = require('jsonwebtoken');

// authMiddleware definition
const authMiddleware = (req, res, next) => {
    // get request header
    const authHeader = req.headers.authorization;
    
    // check if authHeader is empty and if starts with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ result: false, message: 'Sessione scaduta. Verrai reindirizzato alla pagina di login' });
    }
    
    // get the token from authHeader 
    const token = authHeader.split(' ')[1];

    // check if generated token is the same of SECRET_JWT
    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ result: false, message: 'Token non valido o scaduto' });
    }
}

module.exports = authMiddleware;
