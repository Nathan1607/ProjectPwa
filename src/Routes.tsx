import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './pages/Home';
import Camera from './pages/Camera';
import Localisation from './pages/Localisation';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" element={<App />} /> 
            <Route path="/camera" element={<Camera />} />
            <Route path="/localisation" element={<Localisation />} />
        </BrowserRouter>
    );
};

export default Routes;