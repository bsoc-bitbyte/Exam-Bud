const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'Token required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (!decodedToken.email?.endsWith('@iiitdmj.ac.in')) {
      return res.status(403).json({ 
        error: 'Domain not allowed',
        code: 'INVALID_DOMAIN'
      });
    }

    if (!decodedToken.email_verified) {
      return res.status(403).json({ 
        error: 'Email not verified',
        code: 'EMAIL_NOT_VERIFIED'
      });
    }

    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email.split('@')[0],
      picture: decodedToken.picture,
      emailVerified: decodedToken.email_verified,
      role: 'USER'
    };

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
});

router.get('/me', require('../middleware/dummyAuth.js'), (req, res) => {
  res.json({ success: true, user: req.user });
});

router.post('/verify-domain', (req, res) => {
  const { email } = req.body;
  const isValidDomain = email?.endsWith('@iiitdmj.ac.in');
  res.json({ success: true, isValidDomain });
});

router.post('/logout', require('../middleware/dummyAuth.js'), (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

module.exports = router;