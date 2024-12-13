const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;  // Attach admin ID to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }
};

module.exports = verifyAdminToken;
