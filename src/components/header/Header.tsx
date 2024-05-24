import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/Header.css';
import BatteryStatus from '../header/BatteryView';

const Header: React.FC = () => {

    const [online, setOnline] = useState(navigator.onLine);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleOnlineStatus = () => {
            setOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);

    return (
        <div>
            <div className='PreHeader'>
                <div className='battery-class'>
                    <BatteryStatus />
                </div>
                <div className='online-class'>
                    {online ? (
                        <span>Online</span>
                        ) : (
                            <span>Offline</span>
                    )}
                </div>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
            </div>
            <nav className={isMenuOpen ? 'active' : ''}>
                <ul>
                    <li>
                        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/camera">Camera Local</NavLink>
                    </li>
                    <li>
                        <NavLink to="/localisation">Localisation</NavLink>
                    </li>
                    <li>
                        <NavLink to="/galleriephoto">Gallerie Photo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/call">Call</NavLink>
                    </li>
                    <li>
                        <NavLink to="/webotp">WebOTP</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
