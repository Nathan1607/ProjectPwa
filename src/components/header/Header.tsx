import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../style/Header.css';
import BatteryStatus from '../header/BatteryView';

const Header: React.FC = () => {

    const [online, setOnline] = useState(navigator.onLine);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
            <div className="menu-icon" onClick={toggleMenu}>
            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <nav className={isMenuOpen ? 'active' : ''}>
                <ul>
                    <li>
                        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/camera">Camera</NavLink>
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
                    <li className='battery-class'>
                        <BatteryStatus />
                    </li>
                    <li className='online-class'>
                        {online ? (
                            <span>Online</span>
                        ) : (
                            <span>Offline</span>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
