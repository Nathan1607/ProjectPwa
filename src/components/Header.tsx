import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">App</Link>
                    </li>
                    <li>
                        <Link to="/camera">Camera</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
