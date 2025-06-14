import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="notFoundContainer">
            <div className="notFoundText">
                <p className="fourNotFour">404</p>
                <p className="pageNotFound">PAGE NOT FOUND</p>
                <p className="description">The page you are looking for doesn't exist.</p>
                <button className="backToHomeBtn" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
            <img
                className="notFoundImg"
                src="/NotFound.svg"
                alt="Not Found Image"
            />
        </div>
    );
}