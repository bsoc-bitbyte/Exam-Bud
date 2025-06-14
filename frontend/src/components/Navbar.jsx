import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="mb-4">
            <Link to="/" className="mr-4">Home</Link>
            <Link to="/admin">Admin</Link>
        </nav>
    );
}