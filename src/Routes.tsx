import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Camera from './pages/Camera';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" element={<App />} /> 
            <Route path="/camera" element={<Camera />} />
        </BrowserRouter>
    );
};

export default Routes;