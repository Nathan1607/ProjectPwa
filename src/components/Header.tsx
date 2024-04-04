import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Header.css';

const Header: React.FC = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
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
                </ul>
            </nav>
        </div>
    );
};

export default Header;
