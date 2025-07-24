import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
              setUser(firebaseUser);
              setToken(idToken);
              localStorage.setItem('authToken', idToken);
            } else {
              await signOut(auth);
              setUser(null);
              setToken(null);
              localStorage.removeItem('authToken');
            }
          } catch (error) {
            console.error('Auth error:', error);
            await signOut(auth);
            setUser(null);
            setToken(null);
            localStorage.removeItem('authToken');
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