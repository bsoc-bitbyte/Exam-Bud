import { Routes, Route, useLocation, matchRoutes } from 'react-router-dom';
import { Suspense, lazy } from "react";
import Loading from './utils/Global-Loading/Loading';
import useRouteProgress from './hooks/useRouteProgress.js';
import { AuthProvider } from './context/AuthContext';
import './styles/nprogress-custom.css';

const LandingPage = lazy(() => import('./pages/landingPage/LandingPage'));
const Home = lazy(() => import('./pages/Home'));
const Branch = lazy(() => import('./pages/Branch'));
const Semester = lazy(() => import('./pages/Semester'));
const Subject = lazy(() => import('./pages/Subject'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/404/NotFound'));
const LoginPage = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const routes = [
    { path: '/' },
    { path: '/home' },
    { path: '/branch/:branchId' },
    { path: '/branch/:branchId/semester/:semesterId' },
    { path: '/branch/:branchId/semester/:semesterId/subject/:subjectId' },
    { path: '/admin' },
    { path: '/login' },
    { path: '/signup' }
];

export default function App() {
    const location = useLocation();
    const matched = matchRoutes(routes, location.pathname);
    const is404 = !matched;
  
    useRouteProgress();

    return (
        <AuthProvider>
            {!is404 && <Header />}
            <main className="main-content">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {/* All Routes are now public */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUp />} />
                        
                        {/* Previously protected routes - now public */}
                        <Route path="/home" element={<Home />} />
                        <Route path="/Home" element={<Home />} />
                        <Route path="/branch/:branchId" element={<Branch />} />
                        <Route path="/branch/:branchId/semester/:semesterId" element={<Semester />} />
                        <Route path="/branch/:branchId/semester/:semesterId/subject/:subjectId" element={<Subject />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        
                        <Route path="*" element={<NotFound />}/>
                    </Routes>
                </Suspense>
            </main>
            {!is404 && <Footer />}
        </AuthProvider>
    );
}
