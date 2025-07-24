import {Link, NavLink} from 'react-router-dom';
import logo from '../../assets/landingPage/logo.svg';
import ExamBud from '../../assets/landingPage/ExamBud.svg';
import dropdown from '../../assets/landingPage/dropdown.svg';
import navNotes from '../../assets/landingPage/navNotes.svg';
import navLab from '../../assets/landingPage/lab.svg';
import PYQ from '../../assets/landingPage/pyq.svg';
import dropdownArrow from '../../assets/landingPage/dropdownArrow.svg';
import hamburger from '../../assets/landingPage/hamburger.svg';
import './Header.css';
import {useState} from "react";
import { useAuth } from '../../context/AuthContext';

export default function Header() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        setHamburgerOpen(false);
    };

    return (
        <header className="header">
            <div className="navbar--mobile">
                <div className="hamburger" onClick={() => setHamburgerOpen(true)}>
                    <img src={hamburger} alt="hamburger" className="hamburger__icon"/>
                </div>
                <div className="logo">
                    <img src={logo} alt="logo" className="navbar__logo" />
                    <img src={ExamBud} alt="logo-text" className="navbar__logo__text" />
                </div>

                {hamburgerOpen && (
                    <div className="backdrop" onClick={() => setHamburgerOpen(false)}></div>
                )}

                <div className={`side-drawer ${hamburgerOpen ? 'open' : ''}`}>
                    <div className="side-drawer__header">
                        <button className="close-btn" onClick={() => setHamburgerOpen(false)}>×</button>
                    </div>
                    <nav className="side-drawer__nav">
                        <NavLink to="/Home" onClick={() => setHamburgerOpen(false)}>Home</NavLink>
                        <div
                            className="drawer-dropdown"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Resources
                            <img src={dropdown} alt="dropdown icon" className={`nav__dropdown__icon${isDropdownOpen ? '--rotated' : ''}`} />
                        </div>
                        {isDropdownOpen && (
                            <div className="drawer-dropdown__menu">
                                <NavLink to="/notes" className="drawer-dropdown__items" onClick={() => setHamburgerOpen(false)}>
                                    <span>Notes</span>
                                    <img src={navNotes} alt="notes" />
                                </NavLink>
                                <NavLink to="/lab-manuals" className="drawer-dropdown__items" onClick={() => setHamburgerOpen(false)}>
                                    <span>Lab Materials</span>
                                    <img src={navLab} alt="lab" />
                                </NavLink>
                                <NavLink to="/pyqs" className="drawer-dropdown__items" onClick={() => setHamburgerOpen(false)}>
                                    <span>PYQs</span>
                                    <img src={PYQ} alt="pyq" />
                                </NavLink>
                            </div>
                        )}
                        <NavLink to="/discussion" onClick={() => setHamburgerOpen(false)}>Discussions</NavLink>
                    </nav>
                </div>

                {isAuthenticated ? (
                    <div className="user-menu">
                        <img src={user?.picture || '/default-avatar.png'} alt="Profile" className="user-avatar" />
                        <span className="user-name">{user?.name}</span>
                        <button onClick={handleLogout} className="btn__logout">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="btn__login">Login</Link>
                )}
            </div>

            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt="logo" className="navbar__logo"/>
                    <img src={ExamBud} alt="logo-text" className="navbar__logo__text"/>
                </div>
                <nav className="nav">
                    <ul className="nav__items">
                        <li><NavLink to="/Home" className="nav__link">Home</NavLink></li>
                        <li>
                            <div className="nav__dropdown" onClick={()=>setIsDropdownOpen(!isDropdownOpen)}>
                                Resources
                                <img src={dropdown} alt="dropdown" className={`nav__dropdown__icon${isDropdownOpen && '--rotated'}`}/>
                                <div>
                                    {isDropdownOpen && (
                                        <div className="nav__dropdown__box">
                                            <img src={dropdownArrow} alt="dropdown-arrow" className="nav__dropdown__arrow"/>
                                            <div className="dropdown__menu">
                                                <NavLink to="/notes" className="dropdown__menu__item">
                                                    <span>Notes</span>
                                                    <img src={navNotes} alt="notes" />
                                                </NavLink>
                                                <NavLink to="/lab-manuals" className="dropdown__menu__item">
                                                    <span>Lab Materials</span>
                                                    <img src={navLab} alt="lab" />
                                                </NavLink>
                                                <NavLink to="/pyqs" className="dropdown__menu__item">
                                                    <span>PYQs</span>
                                                    <img src={PYQ} alt="pyq" />
                                                </NavLink>
                                            </div>
                                        </div>
                                        )}
                                </div>
                            </div>
                        </li>
                        <li><NavLink to='/discussion' className="nav__link">Discussions</NavLink></li>
                    </ul>
                </nav>
                
                {isAuthenticated ? (
                    <div className="user-menu">
                        <img src={user?.picture || '/default-avatar.png'} alt="Profile" className="user-avatar" />
                        <span className="user-name">{user?.name}</span>
                        <button onClick={logout} className="btn__logout">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="btn__login">Login</Link>
                )}
            </div>
        </header>
    )
}