import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/Home.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Camera from './pages/Camera.tsx';
import Localisation from './pages/Localisation.tsx';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered successfully:', registration);
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
  {
    path: "/localisation",
    element: <Localisation />,
  }

]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
