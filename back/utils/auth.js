const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function auth(req, res, next) {

    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const bearer = bearerHeader.split(' ');
    if (!bearer) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const bearerToken = bearer[1];
    if (!bearerToken) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(bearerToken, jwtSecret, (err, decoded) => {
          if (err) {
            res.status(401).json({ message: 'Invalid token' });
          } else {
            req.decoded = decoded;
            next()
          }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = auth;