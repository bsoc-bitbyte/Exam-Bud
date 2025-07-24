import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.email.endsWith('@iiitdmj.ac.in')) {
          const idToken = await firebaseUser.getIdToken();
          
          try {
            const response = await fetch(`${API_BASE}/api/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken })
            });

            if (response.ok) {
              const data = await response.json();
              const userData = data.user || {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                picture: firebaseUser.photoURL,
                emailVerified: firebaseUser.emailVerified,
                role: 'USER'
              };
              
              setUser(userData);
              setToken(idToken);
              localStorage.setItem('authToken', idToken);
            } else {
              await signOut(auth);
              setUser(null);
              setToken(null);
              localStorage.removeItem('authToken');
            }
          } catch (error) {
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
              picture: firebaseUser.photoURL,
              emailVerified: firebaseUser.emailVerified,
              role: 'USER'
            };
            setUser(userData);
            setToken(idToken);
            localStorage.setItem('authToken', idToken);
          }
        } else {
          await signOut(auth);
          alert('Only IIITDMJ emails are allowed');
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [API_BASE]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};