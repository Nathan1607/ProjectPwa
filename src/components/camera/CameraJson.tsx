import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

interface PhotoData {
    dataUrl: string;
    date: string;
    position: {
        latitude: number;
        longitude: number;
    } | null;
}

export default function CameraJson() {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState<PhotoData[]>([]);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        getMediaStream(constraints);
        requestNotificationPermission();

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    let mediaStream: MediaStream | null = null;

    const constraints = { 
        audio: false, 
        video: { 
            width: { ideal: 640 }, 
            height: { ideal: 480 },
            facingMode: "user"
        } 
    };

    async function getMediaStream(constraints: MediaStreamConstraints) {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            const video = document.getElementById('cam') as HTMLVideoElement;
            if (video) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            }
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    function requestNotificationPermission() {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                }
            });
        }
    }

    async function takePhoto() {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const video = document.getElementById('cam') as HTMLVideoElement;
        const context = canvas.getContext('2d');
        const height = video.videoHeight;
        const width = video.videoWidth;

        if (width && height && context) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/png', 0.7);
            const date = new Date().toISOString();

            let position = null;
            try {
                const pos = await getPosition();
                position = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                };
            } catch (error) {
                console.error('Error getting position', error);
            }

            const photoData: PhotoData = { dataUrl, date, position };

            if (navigator.onLine) {
                await uploadPhoto(photoData);
                setPhotos(prevPhotos => [...prevPhotos, photoData]);
                sendNotification('Vous avez pris une photo');
                setIsPhotoTaken(true);
            } else {
                sendNotification('Photo prise en mode hors ligne, elle sera synchronisée lorsque vous serez en ligne.');
                setIsPhotoTaken(false);
            }
        } else {
            console.error('No video width and height');
        }
    }

    async function uploadPhoto(photoData: PhotoData) {
        try {
            const response = await fetch('http://localhost:3000/photos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(photoData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Failed to upload photo:', error);
            throw error;
        }
    }

    function handleOnline() {
        setIsOnline(true);
    }

    function handleOffline() {
        setIsOnline(false);
    }

    function sendNotification(message: string) {
        if ('Notification' in window) {
            Notification.requestPermission().then((result) => {
                if (result === 'granted') {
                    if ('vibrate' in navigator) {
                        navigator.vibrate(1000);
                    }
                    new Notification('Notification', {
                        body: message,
                    });
                } else {
                    throw new Error('Permission refusée');
                }
            });
        } else {
            throw new Error("L'API Notification n'est pas disponible dans ce navigateur.");
        }
    }

    function getPosition(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    return (
        <div className="container-dev">
            <div className="BtnTake">
                <button id="snapBtn" onClick={takePhoto}>Photo</button>
                <button className="btn-Gallerie" onClick={() => navigate('/galleriephoto')}>Gallerie</button>
            </div>
            <div className="container">
                <div className="container-video">
                    <video id="cam" muted>Not available</video>
                    {isPhotoTaken && isOnline && <img className="photoTaken" src={photos[photos.length - 1].dataUrl} alt="Captured" />}
                </div>
                <canvas id="canvas"></canvas>
            </div>
        </div>
    );
}
