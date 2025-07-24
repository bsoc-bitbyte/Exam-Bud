const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    if (!decodedToken.email || !decodedToken.email.endsWith('@iiitdmj.ac.in')) {
      return res.status(403).json({ error: 'Access restricted to iiitdmj.ac.in domain' });
    }

    if (!decodedToken.email_verified) {
      return res.status(403).json({ error: 'Email verification required' });
    }

    req.user = {
      id: decodedToken.uid,
      role: 'USER',
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email.split('@')[0],
      picture: decodedToken.picture,
      emailVerified: decodedToken.email_verified
    };

    next();
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};